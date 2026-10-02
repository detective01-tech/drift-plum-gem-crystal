import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CYCLE, TOOLS } from "@/lib/osint/catalog";
import { useCaseFile } from "@/lib/osint/casefile";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const accepted = useCaseFile((s) => s.ethicsAcceptedAt);
  const findings = useCaseFile((s) => s.findings.length);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] tracking-[0.2em] text-accent uppercase">Final-year teaching laboratory</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.12] tracking-tight sm:text-6xl">
          See what the open web already knows — then write it up properly.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
          OpenLens is an educational OSINT workbench. It queries public DNS, public profiles, HTTP headers, and files
          you already have so you can audit your own digital footprint and map visible misconfiguration to OWASP —
          without exploiting it. It will not crack passwords, scan ports, or hunt people who did not consent.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/lab/$tool" params={{ tool: "exposure" }}>
              Start with HTTP surface
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/academy">Read the academy</Link>
          </Button>
        </div>
        <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-border py-6">
          <Stat n="12" l="modules" />
          <Stat n="4" l="range cases" />
          <Stat n={String(findings)} l="case findings" />
        </dl>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight">Intelligence cycle</h2>
            {accepted ? <Badge variant="ok">Charter accepted</Badge> : null}
          </div>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CYCLE.map((c) => (
              <li key={c.step} className="rounded-xl border border-border bg-card p-4">
                <p className="font-mono text-[11px] tabular-nums text-accent">{c.step}</p>
                <p className="mt-2 font-medium">{c.title}</p>
                <p className="mt-1 text-sm text-muted">{c.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl tracking-tight">Directory</h2>
          <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.id}>
                  <Link
                    to="/lab/$tool"
                    params={{ tool: t.id }}
                    className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-card-2 sm:px-5"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-[11px] tracking-[0.14em] text-faint uppercase">{t.group}</span>
                      </span>
                      <span className="mt-1 block text-sm text-muted">{t.blurb}</span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-faint" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl">How to demo this in a viva</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Load the sample subject on Username, Domain, IP, and GitHub — they are public documentation accounts.</li>
            <li>Run HTTP surface on example.com and walk one Training range case (Harbor Clinic is the default viva script).</li>
            <li>Drop a photo you took into Image forensics and show whether GPS was stored.</li>
            <li>Build search dorks for your own name; open one query in a new tab.</li>
            <li>Save findings to the case file and print / export the report.</li>
            <li>Take the ten-question ethics and exposure quiz in the Academy.</li>
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/report">Open case file</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/academy/$slug" params={{ slug: "cite" }}>
                Citation notes
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.14em] text-faint uppercase">{l}</dt>
      <dd className="mt-1 font-display text-3xl tabular-nums">{n}</dd>
    </div>
  );
}
