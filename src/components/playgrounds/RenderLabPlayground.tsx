import { Activity, Gauge } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function RenderLabPlayground({ isSolved, level }: PlaygroundProps) {
  const counters = isSolved ? [2, 1, 1] : [14, 12, 10];
  return (
    <div className="min-h-[24rem] rounded-lg bg-slate-950 p-5 text-slate-100">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-black">Render lab</p>
          <p className="text-xs text-slate-400">{isSolved ? "Selectors isolate updates" : "Full-store subscription noise"}</p>
        </div>
        <Gauge className={cn("h-6 w-6", isSolved ? "text-moss-300" : "text-rose-300")} aria-hidden />
      </div>
      <div className="grid gap-3">
        {["BearCounter", "ThemeBadge", "ExpensiveChart"].map((label, index) => (
          <div key={label} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">{label}</span>
              <span className={cn("rounded-md px-2 py-1 text-xs font-black", isSolved ? "bg-moss-400 text-moss-950" : "bg-rose-400 text-rose-950")}>
                {counters[index]} renders
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className={cn("h-full rounded-full transition-all", isSolved ? "w-1/4 bg-moss-400" : "w-11/12 bg-rose-400")} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
        <Activity className="h-4 w-4" aria-hidden />
        {level.id === "multiple-picks" ? "useShallow keeps object selectors stable." : "Specific selectors keep components focused."}
      </div>
    </div>
  );
}
