import { useMemo, useState } from "react";
import { AddFindingButton } from "@/components/osint/add-finding";
import { ToolFrame } from "@/components/osint/tool-frame";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { identifyHash } from "@/lib/osint/hash";

const tool = TOOL_BY_ID.hash!;

export function HashTool() {
  const [raw, setRaw] = useState(tool.sample);
  const guesses = useMemo(() => identifyHash(raw), [raw]);

  return (
    <ToolFrame tool={tool} onSample={() => setRaw(tool.sample)}>
      <div className="space-y-2">
        <Label htmlFor="hash">Digest</Label>
        <Textarea
          id="hash"
          value={raw}
          rows={4}
          className="font-mono"
          onChange={(e) => setRaw(e.target.value)}
        />
      </div>
      <p className="mt-2 text-xs text-faint">Length {raw.trim().length} · identification only, never cracking</p>
      <ul className="mt-6 space-y-3">
        {guesses.map((g) => (
          <li key={g.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-xl">{g.name}</p>
              <Badge variant={g.confidence === "high" ? "ok" : g.confidence === "medium" ? "accent" : "default"}>
                {g.confidence}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{g.notes}</p>
          </li>
        ))}
      </ul>
      {raw.trim() ? (
        <div className="mt-4">
          <AddFindingButton
            tool="hash"
            query={raw.trim().slice(0, 24) + (raw.trim().length > 24 ? "…" : "")}
            summary={`Hash ID: ${guesses.map((g) => g.name).join(", ")}`}
            detail={JSON.stringify(guesses, null, 2)}
          />
        </div>
      ) : null}
    </ToolFrame>
  );
}
