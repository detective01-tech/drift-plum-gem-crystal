import { cn } from "@/lib/utils";

export function LensMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-foreground", className)} aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
    </svg>
  );
}
