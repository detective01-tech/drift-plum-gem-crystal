import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QUIZ } from "@/lib/osint/academy";
import { useCaseFile } from "@/lib/osint/casefile";
import { cn } from "@/lib/utils";

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const addFinding = useCaseFile((s) => s.addFinding);

  const score = QUIZ.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0);

  return (
    <div className="mt-6 space-y-6">
      {QUIZ.map((q, i) => (
        <fieldset key={q.id} className="rounded-xl border border-border bg-card p-5">
          <legend className="font-medium">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="ml-2">{q.q}</span>
          </legend>
          <div className="mt-3 space-y-2">
            {q.options.map((opt, idx) => {
              const chosen = answers[q.id] === idx;
              const correct = submitted && idx === q.answer;
              const wrong = submitted && chosen && idx !== q.answer;
              return (
                <label
                  key={idx}
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-md border px-3 py-2 text-sm",
                    correct ? "border-ok/50 bg-ok/10" : wrong ? "border-danger/50 bg-danger/10" : "border-border",
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    className="mt-0.5 accent-accent"
                    checked={chosen}
                    onChange={() => {
                      setSubmitted(false);
                      setAnswers((s) => ({ ...s, [q.id]: idx }));
                    }}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
          {submitted ? <p className="mt-3 text-sm text-muted">{q.why}</p> : null}
        </fieldset>
      ))}
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => {
            if (Object.keys(answers).length < QUIZ.length) {
              toast("Answer every question first");
              return;
            }
            setSubmitted(true);
          }}
        >
          Score quiz
        </Button>
        {submitted ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              addFinding({
                tool: "academy",
                query: "ethics-quiz",
                summary: `Ethics quiz score ${score}/${QUIZ.length}`,
                detail: QUIZ.map((q) => `${q.id}: selected ${answers[q.id]} (correct ${q.answer})`).join("\n"),
              });
              toast("Score saved to case file");
            }}
          >
            Save {score}/{QUIZ.length} to case file
          </Button>
        ) : null}
      </div>
      {submitted ? (
        <p className="font-display text-2xl tabular-nums">
          {score} / {QUIZ.length}
        </p>
      ) : null}
    </div>
  );
}
