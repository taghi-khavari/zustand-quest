import { CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function AsyncFishMarketPlayground({ isSolved, level }: PlaygroundProps) {
  const rollback = level.id === "optimistic-update";
  return (
    <div className="min-h-[24rem] rounded-lg bg-river-50 p-5 dark:bg-river-950">
      <div className="mb-6">
        <p className="text-sm font-black">Async fish market</p>
        <p className="text-xs text-slate-600 dark:text-slate-300">{isSolved ? "Status transitions are represented in state" : "The market cannot report status yet"}</p>
      </div>
      <div className="grid gap-3">
        {["loading", "success", rollback ? "rollback" : "error"].map((step, index) => (
          <div
            key={step}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 capitalize transition",
              isSolved ? "border-moss-200 bg-white dark:border-moss-800 dark:bg-slate-950" : "border-slate-200 bg-white/55 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60"
            )}
          >
            {step === "loading" ? (
              <Loader2 className={cn("h-5 w-5", isSolved && "animate-spin text-river-600")} aria-hidden />
            ) : step === "rollback" ? (
              <RotateCcw className="h-5 w-5 text-amber-600" aria-hidden />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-moss-600" aria-hidden />
            )}
            <span className="font-bold">{index + 1}. {step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
