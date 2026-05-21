import { HardDrive, RefreshCw } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function PersistCavePlayground({ isSolved, level }: PlaygroundProps) {
  return (
    <div className="min-h-[24rem] rounded-lg bg-bark-50 p-5 dark:bg-bark-950">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-black">Persist cave</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">{isSolved ? "Refresh keeps selected values" : "Refresh loses the draft"}</p>
        </div>
        <RefreshCw className={cn("h-5 w-5", isSolved && "animate-spin text-moss-600")} aria-hidden />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          ["theme", "kept"],
          ["cartDraft", level.id === "partial-persistence" ? "forgotten" : "kept"],
          ["modalOpen", "forgotten"],
          ["storage key", isSolved ? "named" : "missing"]
        ].map(([label, status]) => (
          <div key={label} className="rounded-lg border border-bark-200 bg-white p-4 dark:border-bark-800 dark:bg-slate-950">
            <HardDrive className={cn("mb-3 h-5 w-5", status === "kept" || status === "named" ? "text-moss-600" : "text-slate-400")} aria-hidden />
            <p className="font-bold">{label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{isSolved ? status : "not configured"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
