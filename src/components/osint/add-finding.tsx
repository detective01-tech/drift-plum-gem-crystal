import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCaseFile } from "@/lib/osint/casefile";

export function AddFindingButton({
  tool,
  query,
  summary,
  detail,
}: {
  tool: string;
  query: string;
  summary: string;
  detail: string;
}) {
  const addFinding = useCaseFile((s) => s.addFinding);
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => {
        addFinding({ tool, query, summary, detail });
        toast("Saved to case file");
      }}
    >
      Add to case file
    </Button>
  );
}
