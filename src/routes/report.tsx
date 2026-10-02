import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCaseFile } from "@/lib/osint/casefile";

export const Route = createFileRoute("/report")({ component: ReportPage });

function ReportPage() {
  const title = useCaseFile((s) => s.title);
  const analyst = useCaseFile((s) => s.analyst);
  const notes = useCaseFile((s) => s.notes);
  const findings = useCaseFile((s) => s.findings);
  const ethics = useCaseFile((s) => s.ethicsAcceptedAt);
  const setMeta = useCaseFile((s) => s.setMeta);
  const removeFinding = useCaseFile((s) => s.removeFinding);
  const clearFindings = useCaseFile((s) => s.clearFindings);

  function download() {
    const payload = {
      instrument: "OpenLens Educational OSINT Laboratory",
      title,
      analyst,
      ethicsAcceptedAt: ethics,
      notes,
      findings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "openlens-case-file.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.18em] text-accent uppercase">Dissemination</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Case file</h1>
        <p className="mt-4 text-muted print:hidden">
          Findings live in this browser only. Export JSON for your FYP appendix, or print this page.
        </p>

        <div className="mt-8 grid gap-4 print:hidden sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Case title</Label>
            <Input id="title" value={title} onChange={(e) => setMeta({ title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analyst">Analyst</Label>
            <Input
              id="analyst"
              value={analyst}
              placeholder="Your name / roll number"
              onChange={(e) => setMeta({ analyst: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2 print:hidden">
          <Label htmlFor="notes">Direction / notes</Label>
          <Textarea
            id="notes"
            value={notes}
            placeholder="Lawful question, scope, and what you will not collect."
            onChange={(e) => setMeta({ notes: e.target.value })}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3 print:hidden">
          <Button type="button" onClick={() => window.print()}>
            Print / PDF
          </Button>
          <Button type="button" variant="secondary" onClick={download}>
            Export JSON
          </Button>
          <Button type="button" variant="ghost" onClick={clearFindings}>
            Clear findings
          </Button>
        </div>

        <article className="mt-10 space-y-6">
          <header className="border-b border-border pb-4">
            <p className="text-xs tracking-[0.16em] text-faint uppercase">OpenLens laboratory report</p>
            <h2 className="mt-2 font-display text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-muted">
              Analyst {analyst || "—"} · Charter {ethics ? new Date(ethics).toLocaleString() : "not recorded"} ·{" "}
              {findings.length} finding{findings.length === 1 ? "" : "s"}
            </p>
          </header>
          {notes ? (
            <section>
              <h3 className="text-xs tracking-[0.14em] text-faint uppercase">Direction</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm">{notes}</p>
            </section>
          ) : null}
          <section className="space-y-4">
            <h3 className="text-xs tracking-[0.14em] text-faint uppercase">Collection log</h3>
            {findings.length === 0 ? (
              <p className="text-sm text-muted">No findings yet. Run a module and choose “Add to case file”.</p>
            ) : (
              findings.map((f) => (
                <div key={f.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-accent uppercase">{f.tool}</p>
                      <p className="mt-1 font-medium">{f.summary}</p>
                      <p className="mt-1 font-mono text-xs text-faint">
                        {f.query} · {new Date(f.at).toISOString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-muted hover:text-danger print:hidden"
                      onClick={() => removeFinding(f.id)}
                    >
                      Remove
                    </button>
                  </div>
                  {f.detail ? (
                    <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap font-mono text-[11px] text-muted">
                      {f.detail}
                    </pre>
                  ) : null}
                </div>
              ))
            )}
          </section>
          <section className="text-xs leading-relaxed text-faint">
            <p>
              Limitations: HTTP 200 is not identity. IP geolocation is probabilistic. Many platforms block datacentre
              IPs. No breach corpora. No authentication bypass. This instrument is for education.
            </p>
            <p className="mt-2">
              Suggested citation: OpenLens (2026). Educational OSINT Laboratory. Web application.
            </p>
          </section>
        </article>
      </div>
    </AppShell>
  );
}
