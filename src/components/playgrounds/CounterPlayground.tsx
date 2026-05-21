"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CounterPlayground({ isSolved }: PlaygroundProps) {
  const [count, setCount] = useState(1);
  const visibleCount = isSolved ? count : 1;

  return (
    <div className="grid min-h-[24rem] content-between rounded-lg bg-gradient-to-br from-moss-50 via-river-50 to-bark-50 p-5 dark:from-moss-950 dark:via-slate-900 dark:to-bark-950">
      <div>
        <p className="mb-2 text-sm font-black text-slate-700 dark:text-slate-200">Forest dashboard</p>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {Array.from({ length: Math.max(visibleCount, 1) }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "grid aspect-square place-items-center rounded-lg border text-lg font-black shadow-sm transition",
                isSolved
                  ? "animate-pop border-bark-300 bg-bark-100 text-bark-800 dark:border-bark-700 dark:bg-bark-900 dark:text-bark-100"
                  : "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"
              )}
            >
              B
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-white/80 bg-white/75 p-3 dark:border-slate-800 dark:bg-slate-950/70">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {isSolved ? `${visibleCount} bears in store` : "Action lever disconnected"}
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="icon" disabled={!isSolved} onClick={() => setCount(0)} aria-label="Remove all bears">
            <Minus className="h-4 w-4" aria-hidden />
          </Button>
          <Button type="button" size="icon" disabled={!isSolved} onClick={() => setCount((value) => value + 1)} aria-label="Increase bear count">
            <Plus className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
