import type { PathStep } from "@/lib/osint/range";
import { cn } from "@/lib/utils";

const KIND: Record<PathStep["kind"], { label: string; className: string }> = {
  observe: { label: "Observe", className: "border-border text-muted" },
  infer: { label: "Infer", className: "border-warn/40 text-warn" },
  stop: { label: "Stop", className: "border-danger/45 bg-danger/5 text-danger" },
  defend: { label: "Defend", className: "border-ok/40 text-ok" },
};

export function AttackPath({ steps }: { steps: PathStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const k = KIND[step.kind];
        return (
          <li key={step.n} className={cn("rounded-xl border bg-card p-4", k.className)}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] tabular-nums text-accent">{step.n}</span>
              <span className="text-[11px] tracking-[0.16em] uppercase">{k.label}</span>
            </div>
            <p className="mt-2 font-medium text-foreground">{step.title}</p>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
            {i < steps.length - 1 ? (
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">↓</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
