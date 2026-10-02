import { useMemo, useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ToolFrame } from "@/components/osint/tool-frame";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { buildDorks, duckUrl, googleUrl } from "@/lib/osint/dorks";

const tool = TOOL_BY_ID.dorks!;

export function DorksTool() {
  const [subject, setSubject] = useState("");
  const dorks = useMemo(() => buildDorks(subject), [subject]);

  return (
    <ToolFrame tool={tool} onSample={() => setSubject("Ada Lovelace")}>
      <div className="space-y-2">
        <Label htmlFor="subject">Your name, brand, or handle</Label>
        <Input
          id="subject"
          value={subject}
          placeholder="your name"
          autoComplete="off"
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <ul className="mt-8 space-y-3">
        {dorks.map((d) => (
          <li key={d.title} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">{d.title}</p>
            <p className="mt-2 font-mono text-sm break-all">{d.query}</p>
            <p className="mt-2 text-sm text-muted">{d.why}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a className="text-accent underline-offset-4 hover:underline" href={duckUrl(d.query)} target="_blank" rel="noreferrer">
                DuckDuckGo
              </a>
              <a className="text-accent underline-offset-4 hover:underline" href={googleUrl(d.query)} target="_blank" rel="noreferrer">
                Google
              </a>
            </div>
          </li>
        ))}
      </ul>
      {dorks.length > 0 ? (
        <div className="mt-4">
          <AddFindingButton
            tool="dorks"
            query={subject}
            summary={`Built ${dorks.length} self-audit queries for “${subject}”`}
            detail={dorks.map((d) => `${d.title}: ${d.query}`).join("\n")}
          />
        </div>
      ) : null}
    </ToolFrame>
  );
}
