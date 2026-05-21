import { Check, FlaskConical, X } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function TestingLabPlayground({ isSolved }: PlaygroundProps) {
  return (
    <div className="min-h-[24rem] rounded-lg bg-slate-50 p-5 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <FlaskConical className="h-7 w-7 text-river-600" aria-hidden />
        <div>
          <p className="text-sm font-black">Testing lab</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{isSolved ? "Store action behavior is asserted" : "Test coverage incomplete"}</p>
        </div>
      </div>
      <div className="space-y-3">
        {["reset state", "act around update", "assert getState"].map((step) => (
          <div key={step} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <span className="font-semibold">{step}</span>
            <span className={cn("grid h-7 w-7 place-items-center rounded-full", isSolved ? "bg-moss-100 text-moss-700 dark:bg-moss-950 dark:text-moss-200" : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200")}>
              {isSolved ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
