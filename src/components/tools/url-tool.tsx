import { useMemo, useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { inspectUrl } from "@/lib/osint/functions";
import { isHttpUrl } from "@/lib/osint/validate";

const tool = TOOL_BY_ID.url!;

export function UrlTool() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chain, setChain] = useState<{ url: string; status: number; location: string | null }[] | null>(null);

  const parsed = useMemo(() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  }, [url]);

  async function run(target: string) {
    if (!isHttpUrl(target)) {
      setError("Only public http(s) URLs.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await inspectUrl({ data: { url: target } });
      setChain(res.chain);
    } catch (err) {
      setChain(null);
      setError(err instanceof Error ? err.message : "Inspect failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolFrame tool={tool} onSample={() => { setUrl(tool.sample); void run(tool.sample); }}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(url);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input id="url" value={url} placeholder="https://example.com" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Following…" : "Inspect"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

      {parsed ? (
        <div className="mt-8">
          <ResultTable
            rows={[
              { label: "Protocol", value: parsed.protocol.replace(":", "") },
              { label: "Host", value: parsed.hostname },
              { label: "Port", value: parsed.port || "default" },
              { label: "Path", value: parsed.pathname },
              { label: "Query", value: parsed.search || "—" },
              { label: "Fragment", value: parsed.hash || "—" },
            ]}
          />
        </div>
      ) : null}

      {chain ? (
        <div className="mt-6 space-y-3">
          <h2 className="text-xs tracking-[0.16em] text-faint uppercase">Redirect chain (max 5, public hosts)</h2>
          <ol className="space-y-2">
            {chain.map((hop, i) => (
              <li key={i} className="rounded-lg border border-border bg-card px-4 py-3">
                <p className="font-mono text-xs break-all">{hop.url}</p>
                <p className="mt-1 text-xs text-muted">HTTP {hop.status || "blocked"}</p>
              </li>
            ))}
          </ol>
          <AddFindingButton
            tool="url"
            query={url}
            summary={`URL inspect · ${chain.length} hop(s) ending at ${chain[chain.length - 1]?.url}`}
            detail={JSON.stringify(chain, null, 2)}
          />
        </div>
      ) : null}
    </ToolFrame>
  );
}
