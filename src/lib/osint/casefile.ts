import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Finding = {
  id: string;
  tool: string;
  query: string;
  summary: string;
  at: string;
  detail: string;
};

type CaseState = {
  ethicsAcceptedAt: string | null;
  title: string;
  analyst: string;
  notes: string;
  findings: Finding[];
  acceptEthics: () => void;
  setMeta: (patch: Partial<Pick<CaseState, "title" | "analyst" | "notes">>) => void;
  addFinding: (f: Omit<Finding, "id" | "at">) => void;
  removeFinding: (id: string) => void;
  clearFindings: () => void;
};

export const useCaseFile = create<CaseState>()(
  persist(
    (set) => ({
      ethicsAcceptedAt: null,
      title: "Self-audit case file",
      analyst: "",
      notes: "",
      findings: [],
      acceptEthics: () => set({ ethicsAcceptedAt: new Date().toISOString() }),
      setMeta: (patch) => set(patch),
      addFinding: (f) =>
        set((s) => ({
          findings: [
            {
              ...f,
              id: crypto.randomUUID(),
              at: new Date().toISOString(),
            },
            ...s.findings,
          ].slice(0, 80),
        })),
      removeFinding: (id) => set((s) => ({ findings: s.findings.filter((x) => x.id !== id) })),
      clearFindings: () => set({ findings: [] }),
    }),
    { name: "openlens-case-v1" },
  ),
);
