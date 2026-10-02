import { useState, type ReactNode } from "react";
import { LensMark } from "@/components/brand/lens-mark";
import { Button } from "@/components/ui/button";
import { useCaseFile } from "@/lib/osint/casefile";
import { cn } from "@/lib/utils";

const PLEDGES = [
  "I will only investigate accounts I own, the built-in sample subject, or systems I am authorised to assess.",
  "I will not dox, stalk, harass, or build a dossier on a person who did not consent.",
  "I understand this laboratory queries public sources only and never bypasses authentication or cracks passwords.",
  "I accept that misuse may violate local law, including PECA 2016 in Pakistan and equivalent computer-misuse statutes elsewhere.",
];

export function EthicsGate({ children }: { children: ReactNode }) {
  const ethicsAcceptedAt = useCaseFile((s) => s.ethicsAcceptedAt);
  const acceptEthics = useCaseFile((s) => s.acceptEthics);
  const [checked, setChecked] = useState<boolean[]>(() => PLEDGES.map(() => false));

  if (ethicsAcceptedAt) return <>{children}</>;

  const all = checked.every(Boolean);

  return (
    <div className="min-h-dvh bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-xl">
        <LensMark className="size-10" />
        <p className="mt-8 text-[11px] tracking-[0.2em] text-accent uppercase">Charter · required</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-[2.75rem]">
          OpenLens is a teaching laboratory, not a weapon.
        </h1>
        <p className="mt-4 text-muted">
          This is an educational OSINT workbench for a final-year project: public DNS, public profiles, and files you
          already have. Accept the charter to continue. You can re-read it anytime under Ethics.
        </p>
        <ul className="mt-8 space-y-3">
          {PLEDGES.map((text, i) => (
            <li key={i}>
              <label className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-accent"
                  checked={checked[i]}
                  onChange={(e) => {
                    const next = [...checked];
                    next[i] = e.target.checked;
                    setChecked(next);
                  }}
                />
                <span className="text-sm leading-relaxed">{text}</span>
              </label>
            </li>
          ))}
        </ul>
        <Button className="mt-8 w-full sm:w-auto" disabled={!all} onClick={acceptEthics}>
          I accept — enter the lab
        </Button>
        <p className={cn("mt-4 text-xs text-faint", all ? "opacity-0" : "opacity-100")}>
          Tick every pledge. This is the same standard an examiner will hold you to.
        </p>
      </div>
    </div>
  );
}
