import { useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ToolFrame } from "@/components/osint/tool-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { checkUsernameBatch, type UsernameHit } from "@/lib/osint/functions";
import { PLATFORMS, USERNAME_RE } from "@/lib/osint/platforms";
import { cn } from "@/lib/utils";

const tool = TOOL_BY_ID.username!;

export function UsernameTool() {
  const [username, setUsername] = useState("");
  const [hits, setHits] = useState<UsernameHit[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  async function run(target: string) {
    const u = target.trim();
    if (!USERNAME_RE.test(u)) {
      setError("Letters, numbers, dot, underscore, hyphen — max 39 characters.");
      return;
    }
    setBusy(true);
    setError(null);
    setHits([]);
    setProgress(0);
    const all: UsernameHit[] = [];
    try {
      for (let i = 0; i < PLATFORMS.length; i += 8) {
        const ids = PLATFORMS.slice(i, i + 8).map((p) => p.id);
        const res = await checkUsernameBatch({ data: { username: u, ids } });
        all.push(...res.results);
        setHits([...all]);
        setProgress(Math.min(100, Math.round((all.length / PLATFORMS.length) * 100)));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
      setProgress(100);
    }
  }

  const claimed = hits.filter((h) => h.status === "claimed").length;
  const available = hits.filter((h) => h.status === "available").length;

  return (
    <ToolFrame tool={tool} onSample={() => { setUsername(tool.sample); void run(tool.sample); }}>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void run(username);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="username">Handle</Label>
          <Input
            id="username"
            value={username}
            autoComplete="off"
            placeholder="octocat"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Probing…" : "Run recon"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {busy ? (
        <p className="mt-3 font-mono text-xs tabular-nums text-muted">{progress}% of public profile URLs</p>
      ) : null}

      {hits.length > 0 ? (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="ok">{claimed} claimed</Badge>
            <Badge>{available} not found</Badge>
            <Badge variant="warn">{hits.length - claimed - available} unknown</Badge>
            <AddFindingButton
              tool="username"
              query={username}
              summary={`${claimed} public profile hits for “${username}” across ${hits.length} sites`}
              detail={hits
                .filter((h) => h.status === "claimed")
                .map((h) => `${h.name}: ${h.url}`)
                .join("\n")}
            />
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {hits.map((h) => (
              <li key={h.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm">{h.name}</p>
                  <p className="font-mono text-xs text-faint">{h.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-xs tracking-wide uppercase",
                      h.status === "claimed" && "text-ok",
                      h.status === "available" && "text-muted",
                      h.status === "unknown" && "text-warn",
                    )}
                  >
                    {h.status}
                  </span>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Open
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-faint">
            A 200 is a public page, not a confirmed identity. Unknown usually means the host blocked the lab’s
            datacentre IP — open the URL yourself to verify.
          </p>
        </div>
      ) : null}
    </ToolFrame>
  );
}
