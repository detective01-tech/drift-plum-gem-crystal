import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AddFindingButton } from "@/components/osint/add-finding";
import { AttackPath } from "@/components/osint/attack-path";
import { FindingCard } from "@/components/osint/finding-card";
import { ToolFrame } from "@/components/osint/tool-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TOOL_BY_ID } from "@/lib/osint/catalog";
import { SCENARIOS, type RangeScenario } from "@/lib/osint/range";
import { cn } from "@/lib/utils";

const tool = TOOL_BY_ID.range!;

export function RangeTool() {
  const [id, setId] = useState<string>(SCENARIOS[0]?.id ?? "harbor-clinic");
  const scenario = useMemo(() => SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]!, [id]);

  return (
    <ToolFrame tool={tool}>
      <p className="mb-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted">
        Four marked scripts. Hostnames end in .example and are not real. Walk the path in a viva: observation,
        inference, the stop line, then the fix.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SCENARIOS.map((s) => {
          const active = s.id === scenario.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setId(s.id)}
                className={cn(
                  "h-full w-full rounded-xl border p-4 text-left transition-colors duration-150",
                  active ? "border-accent/50 bg-card-2" : "border-border bg-card hover:bg-card-2/60",
                )}
              >
                <p className="text-[11px] tracking-[0.16em] text-accent uppercase">{s.kicker}</p>
                <p className="mt-2 font-medium leading-snug">{s.title}</p>
                <p className="mt-2 text-sm text-muted">{s.blurb}</p>
                <p className="mt-3 font-mono text-[11px] tabular-nums text-faint">{s.minutes} min</p>
              </button>
            </li>
          );
        })}
      </ul>
      <ScenarioBody scenario={scenario} />
    </ToolFrame>
  );
}

function ScenarioBody({ scenario }: { scenario: RangeScenario }) {
  return (
    <div className="mt-10 space-y-8">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{scenario.kicker}</Badge>
          <Badge>Fictional range</Badge>
        </div>
        <h2 className="mt-4 font-display text-3xl tracking-tight">{scenario.title}</h2>
        <p className="mt-2 text-sm text-muted">{scenario.org}</p>
      </header>

      <section>
        <h3 className="mb-2 text-xs tracking-[0.16em] text-faint uppercase">Public evidence (simulated)</h3>
        <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {scenario.evidence.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="text-xs tracking-[0.12em] text-faint uppercase">{row.label}</dt>
              <dd className="font-mono text-sm break-all sm:col-span-2">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs tracking-[0.16em] text-faint uppercase">Mapped observations</h3>
        {scenario.findings.map((f) => (
          <FindingCard key={f.id} finding={f} />
        ))}
      </section>

      <section>
        <h3 className="mb-3 text-xs tracking-[0.16em] text-faint uppercase">Attack path</h3>
        <AttackPath steps={scenario.path} />
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-xs tracking-[0.16em] text-faint uppercase">Viva prompt</h3>
        <p className="mt-2 text-sm leading-relaxed">{scenario.viva}</p>
        <p className="mt-3 text-sm text-muted">
          Pair with{" "}
          <Link to="/academy/$slug" params={{ slug: "attack-paths" }} className="underline-offset-4 hover:underline">
            attack-path method
          </Link>
          .
        </p>
      </section>

      <AddFindingButton
        tool="range"
        query={scenario.id}
        summary={`${scenario.title} · ${scenario.findings.length} mapped observations`}
        detail={JSON.stringify(
          {
            scenario: scenario.id,
            evidence: scenario.evidence,
            findings: scenario.findings.map((f) => ({
              title: f.title,
              severity: f.severity,
              owasp: f.owasp,
              cwe: f.cwe,
            })),
            path: scenario.path,
          },
          null,
          2,
        )}
      />
    </div>
  );
}
