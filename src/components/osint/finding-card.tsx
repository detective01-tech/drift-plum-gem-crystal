import { Badge } from "@/components/ui/badge";
import type { SurfaceFinding } from "@/lib/osint/surface";
import { cn } from "@/lib/utils";

const SEVERITY: Record<
  SurfaceFinding["severity"],
  { label: string; variant: "ok" | "warn" | "danger" | "default"; ring: string }
> = {
  ok: { label: "Sound", variant: "ok", ring: "border-ok/30" },
  info: { label: "Note", variant: "default", ring: "border-border" },
  low: { label: "Low", variant: "warn", ring: "border-warn/35" },
  medium: { label: "Medium", variant: "danger", ring: "border-danger/35" },
};

export function FindingCard({ finding }: { finding: SurfaceFinding }) {
  const sev = SEVERITY[finding.severity];
  return (
    <article className={cn("rounded-xl border bg-card p-4 sm:p-5", sev.ring)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={sev.variant}>{sev.label}</Badge>
        <span className="font-mono text-[11px] text-faint">{finding.owasp}</span>
        <span className="font-mono text-[11px] text-faint">{finding.cwe}</span>
      </div>
      <h3 className="mt-3 font-medium leading-snug">{finding.title}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-[11px] tracking-[0.14em] text-faint uppercase">Observation</dt>
          <dd className="mt-0.5 font-mono text-xs leading-relaxed break-all text-muted">{finding.observation}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.14em] text-faint uppercase">Why it matters</dt>
          <dd className="mt-0.5 text-muted">{finding.why}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.14em] text-faint uppercase">Fix</dt>
          <dd className="mt-0.5 text-foreground/90">{finding.fix}</dd>
        </div>
        {finding.stop !== "N/A" ? (
          <div className="rounded-md border border-danger/25 bg-danger/5 px-3 py-2">
            <dt className="text-[11px] tracking-[0.14em] text-danger uppercase">Stop line</dt>
            <dd className="mt-0.5 text-sm text-foreground/90">{finding.stop}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function ScoreBoard({
  score,
  findings,
}: {
  score: number;
  findings: SurfaceFinding[];
}) {
  const medium = findings.filter((f) => f.severity === "medium").length;
  const low = findings.filter((f) => f.severity === "low").length;
  const info = findings.filter((f) => f.severity === "info").length;
  const ok = findings.filter((f) => f.severity === "ok").length;
  const tone = score >= 80 ? "text-ok" : score >= 55 ? "text-warn" : "text-danger";
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-border bg-card p-5">
      <div>
        <p className="text-[11px] tracking-[0.16em] text-faint uppercase">Hardening score</p>
        <p className={cn("mt-1 font-display text-5xl tabular-nums", tone)}>{score}</p>
        <p className="mt-1 max-w-sm text-xs text-muted">
          Educational index from public headers and well-known files. Not a pentest grade, not a CVE count.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs tabular-nums text-muted">
        <li>
          <span className="text-danger">{medium}</span> medium
        </li>
        <li>
          <span className="text-warn">{low}</span> low
        </li>
        <li>
          <span className="text-faint">{info}</span> notes
        </li>
        <li>
          <span className="text-ok">{ok}</span> sound
        </li>
      </ul>
    </div>
  );
}
