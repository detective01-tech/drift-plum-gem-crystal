import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { ARTICLES } from "@/lib/osint/academy";
import { Quiz } from "@/components/osint/quiz";

export const Route = createFileRoute("/academy")({ component: Academy });

function Academy() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.18em] text-accent uppercase">Academy</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Method, law, and how to write it up</h1>
        <p className="mt-4 text-muted">
          Short briefings you can cite in a final-year report. They are teaching notes, not legal advice.
        </p>
        <ul className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link
                to="/academy/$slug"
                params={{ slug: a.slug }}
                className="flex flex-col gap-1 px-5 py-4 hover:bg-card-2 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span>
                  <span className="block text-[11px] tracking-[0.14em] text-faint uppercase">{a.kicker}</span>
                  <span className="mt-1 block font-medium">{a.title}</span>
                </span>
                <span className="font-mono text-xs tabular-nums text-muted">{a.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <h2 className="font-display text-3xl tracking-tight">Ethics quiz</h2>
          <p className="mt-2 text-sm text-muted">Five questions. Save the score to the case file for your appendix.</p>
          <Quiz />
        </div>
      </div>
    </AppShell>
  );
}
