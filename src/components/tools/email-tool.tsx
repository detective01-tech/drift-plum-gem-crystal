import { useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { lookupEmail } from "@/lib/osint/functions";
import { md5 } from "@/lib/osint/md5";
import { DISPOSABLE_DOMAINS, isEmail } from "@/lib/osint/validate";

const tool = TOOL_BY_ID.email!;
type EmailResult = Awaited<ReturnType<typeof lookupEmail>>;

export function EmailTool() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [disposable, setDisposable] = useState(false);

  async function run(target: string) {
    const e = target.trim().toLowerCase();
    if (!isEmail(e)) {
      setError("That does not look like an email address.");
      return;
    }
    setBusy(true);
    setError(null);
    const domain = e.split("@")[1] ?? "";
    setDisposable(DISPOSABLE_DOMAINS.has(domain));
    try {
      setResult(await lookupEmail({ data: { email: e, hash: md5(e) } }));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolFrame tool={tool} onSample={() => { setEmail(tool.sample); void run(tool.sample); }}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(email);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            placeholder="you@example.com"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Checking…" : "Inspect"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {result ? (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {disposable ? <Badge variant="warn">Disposable domain</Badge> : <Badge variant="ok">Not on the lab’s throwaway list</Badge>}
            {result.gravatar.present ? <Badge variant="accent">Gravatar portrait exists</Badge> : <Badge>No Gravatar</Badge>}
          </div>
          <ResultTable
            rows={[
              { label: "Address", value: result.email },
              { label: "Domain", value: result.domain },
              {
                label: "MX",
                value: result.mx.length ? result.mx.map((m) => m.data).join(" · ") : result.mxError || "None",
              },
            ]}
          />
          {result.gravatar.present ? (
            <img
              src={result.gravatar.url}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10"
            />
          ) : null}
          <AddFindingButton
            tool="email"
            query={result.email}
            summary={`${result.email} · MX ${result.mx[0]?.data ?? "none"} · gravatar ${result.gravatar.present ? "yes" : "no"}`}
            detail={JSON.stringify({ ...result, disposable }, null, 2)}
          />
          <p className="text-xs text-faint">
            Breach search is deliberately omitted. Check your own address on Have I Been Pwned in a private browser
            session if you need that.
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}
