import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ARTICLE_BY_SLUG } from "@/lib/osint/academy";

export const Route = createFileRoute("/academy/$slug")({ component: ArticlePage });

function ArticlePage() {
  const { slug } = Route.useParams();
  const article = ARTICLE_BY_SLUG[slug];
  if (!article) throw notFound();
  return (
    <AppShell>
      <article className="mx-auto max-w-2xl">
        <Link to="/academy" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="size-4" />
          Academy
        </Link>
        <p className="mt-8 text-[11px] tracking-[0.18em] text-accent uppercase">
          {article.kicker} · {article.minutes} min
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{article.title}</h1>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-foreground/90">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </AppShell>
  );
}
