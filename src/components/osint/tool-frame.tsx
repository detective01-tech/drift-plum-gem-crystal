import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ToolDef } from "@/lib/osint/catalog";

export function ToolFrame({
  tool,
  children,
  onSample,
}: {
  tool: ToolDef;
  children: ReactNode;
  onSample?: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] tracking-[0.18em] text-accent uppercase">{tool.group === "local" ? "Local analysis" : "Collection"}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">{tool.name}</h1>
      <p className="mt-4 max-w-2xl text-muted">{tool.lesson}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {tool.sample && onSample ? (
          <Button variant="secondary" size="sm" type="button" onClick={onSample}>
            Load sample · {tool.sampleHint}
          </Button>
        ) : null}
        <Badge>Public sources</Badge>
        <Link to="/academy/$slug" params={{ slug: "ethics-and-law" }} className="text-xs text-muted underline-offset-4 hover:text-foreground hover:underline">
          Ethics notes
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function ResultTable({
  rows,
}: {
  rows: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="text-xs tracking-[0.12em] text-faint uppercase">{row.label}</dt>
          <dd className="font-mono text-sm break-all sm:col-span-2">{row.value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
