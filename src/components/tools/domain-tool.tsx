import { useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { lookupCertificates, lookupDomain } from "@/lib/osint/functions";

const tool = TOOL_BY_ID.domain!;

type DomainResult = Awaited<ReturnType<typeof lookupDomain>>;
type CertResult = Awaited<ReturnType<typeof lookupCertificates>>;

export function DomainTool() {
  const [domain, setDomain] = useState("");
  const [busy, setBusy] = useState(false);
  const [certBusy, setCertBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DomainResult | null>(null);
  const [certs, setCerts] = useState<CertResult | null>(null);

  async function run(target: string) {
    setBusy(true);
    setError(null);
    setCerts(null);
    try {
      setResult(await lookupDomain({ data: { domain: target } }));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  async function runCerts() {
    if (!result) return;
    setCertBusy(true);
    try {
      setCerts(await lookupCertificates({ data: { domain: result.domain } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Certificate lookup failed");
    } finally {
      setCertBusy(false);
    }
  }

  return (
    <ToolFrame tool={tool} onSample={() => { setDomain(tool.sample); void run(tool.sample); }}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(domain);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input
            id="domain"
            value={domain}
            placeholder="example.com"
            autoComplete="off"
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Querying…" : "Look up"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

      {result ? (
        <div className="mt-8 space-y-6">
          <ResultTable
            rows={[
              { label: "Registrar", value: result.rdap.registrar },
              { label: "Registered", value: result.rdap.registered?.slice(0, 10) },
              { label: "Expires", value: result.rdap.expires?.slice(0, 10) },
              { label: "Status", value: result.rdap.status.join(", ") },
              { label: "RDAP NS", value: result.rdap.nameservers.join(", ") },
            ]}
          />
          {result.dns.map((block) => (
            <section key={block.type}>
              <h2 className="mb-2 text-xs tracking-[0.16em] text-faint uppercase">{block.type} records</h2>
              {block.records.length === 0 ? (
                <p className="text-sm text-muted">{block.error || "None published"}</p>
              ) : (
                <ul className="space-y-1 rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed">
                  {block.records.map((r, i) => (
                    <li key={i} className="break-all">
                      {r.data}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={() => void runCerts()} disabled={certBusy}>
              {certBusy ? "Reading logs…" : "Certificate transparency"}
            </Button>
            <AddFindingButton
              tool="domain"
              query={result.domain}
              summary={`DNS + RDAP for ${result.domain}${result.rdap.registrar ? ` (${result.rdap.registrar})` : ""}`}
              detail={JSON.stringify({ rdap: result.rdap, dns: result.dns }, null, 2)}
            />
          </div>
          {certs ? (
            <section>
              <h2 className="mb-2 text-xs tracking-[0.16em] text-faint uppercase">
                Hostnames in public certificates ({certs.names.length})
              </h2>
              {certs.error ? <p className="text-sm text-danger">{certs.error}</p> : null}
              <ul className="columns-1 gap-4 rounded-lg border border-border bg-card p-4 font-mono text-xs sm:columns-2">
                {certs.names.map((n) => (
                  <li key={n} className="break-all">
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </ToolFrame>
  );
}
