import { CheckCircle2, CircleAlert } from "lucide-react";
import type { Level, ValidationResult } from "@/types/game";
import { Alert } from "@/components/ui/Alert";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function ResultPanel({ level, result }: { level: Level; result?: ValidationResult }) {
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-sm font-black">Result</h2>
        </CardHeader>
        <CardContent>
          <Alert tone="info">Run the code to check the mission. Cmd/Ctrl + Enter works too.</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-black">Result</h2>
          <span className="text-xs font-bold text-slate-500">{result.score}% match</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert tone={result.isCorrect ? "success" : "danger"}>
          {result.isCorrect ? level.successMessage : level.failureMessages[0]}
        </Alert>
        <div className="space-y-2">
          {level.validation.checks.map((check) => {
            const passed = result.passedChecks.includes(check.id);
            const failed = result.failedChecks.find((item) => item.id === check.id);
            return (
              <div key={check.id} className="flex gap-2 rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-800">
                {passed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss-600" aria-hidden />
                ) : (
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden />
                )}
                <div>
                  <p className="font-semibold">{check.description}</p>
                  {!passed && <p className="text-xs text-slate-500 dark:text-slate-400">{failed?.message}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
