import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { LensMark } from "@/components/brand/lens-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TOOLS } from "@/lib/osint/catalog";
import { useCaseFile } from "@/lib/osint/casefile";
import { cn } from "@/lib/utils";
import { EthicsGate } from "./ethics-gate";

type NavItem = {
  href: string;
  label: string;
  group?: string;
  match: (p: string) => boolean;
};

const NAV: NavItem[] = [
  { href: "/", label: "Overview", match: (p) => p === "/" },
  ...TOOLS.map((t) => ({
    href: `/lab/${t.id}`,
    label: t.name,
    group: t.group,
    match: (p: string) => p === `/lab/${t.id}`,
  })),
  { href: "/report", label: "Case file", match: (p: string) => p === "/report" },
  { href: "/academy", label: "Academy", match: (p: string) => p.startsWith("/academy") },
  { href: "/ethics", label: "Ethics charter", match: (p: string) => p === "/ethics" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groups: { key: string; label: string; items: NavItem[] }[] = [
    { key: "root", label: "", items: NAV.filter((n) => n.href === "/") },
    {
      key: "collection",
      label: "Collection",
      items: NAV.filter((n) => n.group === "collection"),
    },
    {
      key: "local",
      label: "Local analysis",
      items: NAV.filter((n) => n.group === "local"),
    },
    {
      key: "out",
      label: "Output",
      items: NAV.filter((n) => ["/report", "/academy", "/ethics"].includes(n.href)),
    },
  ];

  return (
    <nav className="flex flex-col gap-5">
      {groups.map((g) => (
        <div key={g.key}>
          {g.label ? (
            <p className="mb-2 px-2 text-[10px] font-medium tracking-[0.18em] text-faint uppercase">{g.label}</p>
          ) : null}
          <ul className="flex flex-col gap-0.5">
            {g.items.map((item) => {
              const active = item.match(pathname);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2 py-2 text-sm transition-colors duration-150",
                      active ? "bg-card-2 text-foreground" : "text-muted hover:bg-card-2/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <LensMark className="size-8" />
      <span className="leading-tight">
        <span className="block font-display text-lg tracking-tight">OpenLens</span>
        <span className="block text-[10px] tracking-[0.16em] text-faint uppercase">Educational OSINT lab</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const findings = useCaseFile((s) => s.findings.length);

  return (
    <EthicsGate>
      <div className="min-h-dvh bg-background text-foreground">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-background px-4 py-5 print:hidden lg:flex">
          <Brand />
          <div className="mt-8 flex-1 overflow-y-auto pr-1">
            <NavLinks />
          </div>
          <p className="pt-4 text-[11px] leading-relaxed text-faint">
            Public sources only. {findings} finding{findings === 1 ? "" : "s"} in the case file.
          </p>
        </aside>

        <div className="lg:pl-60">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm print:hidden lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <Button variant="outline" size="icon" aria-label="Open menu" onClick={() => setOpen(true)}>
                  <Menu className="size-4" />
                </Button>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <Brand />
                  </SheetHeader>
                  <NavLinks onNavigate={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
              <Brand />
            </div>
            <p className="hidden text-[11px] tracking-[0.14em] text-faint uppercase sm:block lg:ml-0">
              Educational use · public sources · no unauthorised access
            </p>
            <Link to="/report" className="text-xs text-muted transition-colors hover:text-foreground">
              Case file
              <span className="ml-2 font-mono tabular-nums text-accent">{findings}</span>
            </Link>
          </header>
          <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </div>
      </div>
    </EthicsGate>
  );
}
