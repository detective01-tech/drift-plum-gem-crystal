import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AddFindingButton } from "@/components/osint/add-finding";
import { FindingCard, ScoreBoard } from "@/components/osint/finding-card";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { inspectSurface } from "@/lib/osint/functions";
import { isHttpUrl } from "@/lib/osint/validate";

const tool = TOOL_BY_ID.exposure!;

type SurfaceResult = Awaited<ReturnType<typeof inspectSurface>>;

export function ExposureTool() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SurfaceResult | null>(null);

  async function run(target: string) {
    if (!isHttpUrl(target)) {
      setError("Only public http(s) URLs you are allowed to look at.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setResult(await inspectSurface({ data: { url: target } }));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Surface check failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolFrame
      tool={tool}
      onSample={() => {
        setUrl(tool.sample);
        void run(tool.sample);
      }}
    >
      <p className="mb-5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted">
        One public GET plus robots.txt and security.txt. No ports, no directory brute force, no payloads. Use a
        hostname you own — or the sample.
      </p>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(url);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="surface-url">Public URL</Label>
          <Input
            id="surface-url"
            value={url}
            placeholder="https://example.com"
            autoComplete="off"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Reading headers…" : "Check surface"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

      {result ? (
        <div className="mt-8 space-y-6">
          <ScoreBoard score={result.score} findings={result.findings} />
          <ResultTable
            rows={[
              { label: "Requested", value: result.url },
              { label: "Final URL", value: result.finalUrl },
              { label: "HTTPS", value: result.https ? "yes" : "no" },
              { label: "HTTP status", value: String(result.status) },
              { label: "Hops", value: result.hops.join(" → ") },
            ]}
          />
          {Object.keys(result.headers).length > 0 ? (
            <section>
              <h2 className="mb-2 text-xs tracking-[0.16em] text-faint uppercase">Captured response headers</h2>
              <ul className="space-y-1 rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed">
                {Object.entries(result.headers).map(([k, v]) => (
                  <li key={k} className="break-all">
                    <span className="text-accent">{k}</span>: {v}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <p className="text-sm text-muted">No security-relevant headers on the final response.</p>
          )}
          <section className="space-y-3">
            <h2 className="text-xs tracking-[0.16em] text-faint uppercase">Findings</h2>
            {result.findings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </section>
          <AddFindingButton
            tool="exposure"
            query={result.finalUrl}
            summary={`HTTP surface score ${result.score}/100 · ${result.findings.filter((f) => f.severity === "medium" || f.severity === "low").length} issues on ${new URL(result.finalUrl).hostname}`}
            detail={JSON.stringify(
              {
                score: result.score,
                headers: result.headers,
                findings: result.findings.map((f) => ({
                  id: f.id,
                  severity: f.severity,
                  title: f.title,
                  owasp: f.owasp,
                  cwe: f.cwe,
                })),
              },
              null,
              2,
            )}
          />
          <p className="text-sm text-muted">
            Read{" "}
            <Link to="/academy/$slug" params={{ slug: "visible-vulns" }} className="underline-offset-4 hover:underline">
              visible vulnerabilities
            </Link>{" "}
            and{" "}
            <Link to="/academy/$slug" params={{ slug: "owasp-a05" }} className="underline-offset-4 hover:underline">
              OWASP A05
            </Link>{" "}
            before the viva.
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}
