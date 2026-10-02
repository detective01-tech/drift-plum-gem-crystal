import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { useCaseFile } from "@/lib/osint/casefile";

export const Route = createFileRoute("/ethics")({ component: EthicsPage });

const SECTIONS = [
  {
    h: "Purpose",
    p: "OpenLens exists so students can practise open-source collection, write a sourced report, and see how much of their own life is already public. It is not a surveillance product and it is not a hacking tool.",
  },
  {
    h: "Allowed",
    p: "Accounts you own. The built-in sample subject (octocat, example.com, 1.1.1.1, documentation emails). The fictional Training range. Systems you have written permission to assess. Public DNS, RDAP, certificate transparency, public HTTP headers, robots.txt, security.txt, and public profile URLs.",
  },
  {
    h: "Forbidden",
    p: "Doxxing, stalking, harassment. Password guessing or cracking. Port scans, directory brute force, and vulnerability exploitation. Scraping behind a login. Reverse-phone owner lookup. Purchasing or searching stolen breach dumps through this lab. Targeting classmates, relatives, or strangers “for the demo”. Sending spoofed mail to “prove” a missing DMARC record.",
  },
  {
    h: "Law",
    p: "Unauthorised access and several forms of cyber harassment are offences under Pakistan’s PECA 2016, the UK Computer Misuse Act, the US CFAA, and equivalent statutes. Public data is not a blank cheque — processing a dossier on an EU resident can also engage GDPR. This page is teaching material, not legal advice. Follow your university ethics board.",
  },
  {
    h: "Engineering limits",
    p: "Lookups are throttled. Private and loopback addresses are blocked so the URL inspector cannot be used as SSRF. Image metadata never leaves the browser. HTTP surface reads headers and two well-known files only. Nothing is stored on a server.",
  },
];

function EthicsPage() {
  const at = useCaseFile((s) => s.ethicsAcceptedAt);
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] tracking-[0.18em] text-accent uppercase">Charter</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Ethics charter</h1>
        <p className="mt-4 text-sm text-muted">
          Accepted {at ? new Date(at).toLocaleString() : "—"} in this browser.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl">{s.h}</h2>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-foreground/90">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
