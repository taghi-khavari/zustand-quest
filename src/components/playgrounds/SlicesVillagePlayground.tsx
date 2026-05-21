import { Boxes, Database, Layers3 } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function SlicesVillagePlayground({ isSolved, level }: PlaygroundProps) {
  const cards = level.id === "client-vs-server-state" ? ["Zustand", "Server Cache", "Decision"] : ["Cart Slice", "User Slice", "UI Slice"];
  return (
    <div className="min-h-[24rem] rounded-lg bg-moss-50 p-5 dark:bg-moss-950">
      <p className="mb-6 text-sm font-black">{level.id === "client-vs-server-state" ? "State boundary bins" : "Slices village"}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={card}
            className={cn(
              "rounded-lg border p-4 text-center transition",
              isSolved ? "animate-pop border-moss-300 bg-white dark:border-moss-800 dark:bg-slate-950" : "border-slate-300 bg-white/60 text-slate-500 dark:border-slate-700 dark:bg-slate-900/60"
            )}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {index === 0 ? <Boxes className="mx-auto mb-3 h-7 w-7" aria-hidden /> : index === 1 ? <Database className="mx-auto mb-3 h-7 w-7" aria-hidden /> : <Layers3 className="mx-auto mb-3 h-7 w-7" aria-hidden />}
            <p className="font-black">{card}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{isSolved ? "connected" : "waiting"}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-7 h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={cn("h-full rounded-full transition-all", isSolved ? "w-full bg-moss-500" : "w-1/4 bg-slate-400")} />
      </div>
    </div>
  );
}
