import { useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ResultTable, ToolFrame } from "@/components/osint/tool-frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { lookupGithub } from "@/lib/osint/functions";

const tool = TOOL_BY_ID.github!;
type Gh = Awaited<ReturnType<typeof lookupGithub>>;

export function GithubTool() {
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Gh | null>(null);

  async function run(target: string) {
    setBusy(true);
    setError(null);
    try {
      setResult(await lookupGithub({ data: { username: target } }));
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  const profile = result && result.found ? result.profile : null;

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
          <Label htmlFor="gh">GitHub username</Label>
          <Input id="gh" value={username} placeholder="octocat" autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Fetching…" : "Load public profile"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      {result && !result.found ? <p className="mt-4 text-sm text-muted">No public GitHub user with that login.</p> : null}
      {profile ? (
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt=""
                width={64}
                height={64}
                className="size-16 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10"
              />
            ) : null}
            <div>
              <p className="font-display text-2xl">{profile.name || profile.login}</p>
              <a href={profile.htmlUrl} className="text-sm text-accent hover:underline" target="_blank" rel="noreferrer">
                {profile.htmlUrl}
              </a>
            </div>
          </div>
          <ResultTable
            rows={[
              { label: "Bio", value: profile.bio },
              { label: "Company", value: profile.company },
              { label: "Blog", value: profile.blog },
              { label: "Location", value: profile.location },
              { label: "Public email", value: profile.email },
              { label: "X / Twitter", value: profile.twitter },
              { label: "Repos", value: String(profile.publicRepos) },
              { label: "Followers", value: String(profile.followers) },
              { label: "Joined", value: profile.createdAt?.slice(0, 10) },
              { label: "Hireable", value: profile.hireable == null ? "unspecified" : profile.hireable ? "yes" : "no" },
            ]}
          />
          {result?.found && result.repos.length > 0 ? (
            <ul className="space-y-2">
              {result.repos.map((r) => (
                <li key={r.name} className="rounded-lg border border-border bg-card px-4 py-3">
                  <a href={r.html_url} className="text-sm hover:underline" target="_blank" rel="noreferrer">
                    {r.name}
                  </a>
                  <p className="mt-1 text-xs text-muted">{r.description || "No description"}</p>
                  <p className="mt-1 font-mono text-[11px] text-faint">
                    {r.language || "—"} · {r.stargazers_count} stars
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
          <AddFindingButton
            tool="github"
            query={profile.login}
            summary={`GitHub ${profile.login} · ${profile.publicRepos} public repos · ${profile.followers} followers`}
            detail={JSON.stringify(profile, null, 2)}
          />
        </div>
      ) : null}
    </ToolFrame>
  );
}
