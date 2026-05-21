"use client";

import { Lock, Star } from "lucide-react";
import { levels } from "@/data/levels";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useGameProgressStore } from "@/stores/useGameProgressStore";

export function LevelSelector() {
  const currentLevelId = useGameProgressStore((state) => state.currentLevelId);
  const progress = useGameProgressStore((state) => state.levels);
  const setCurrentLevel = useGameProgressStore((state) => state.setCurrentLevel);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <h2 className="text-sm font-black">Level Map</h2>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-12rem)] space-y-2 overflow-auto pr-2">
        {levels.map((level) => {
          const status = progress[level.id]?.status ?? "locked";
          const locked = status === "locked";
          return (
            <Button
              key={level.id}
              type="button"
              variant="secondary"
              className={cn(
                "h-auto w-full justify-start p-3 text-left",
                currentLevelId === level.id &&
                  "border-moss-300 bg-moss-100 text-moss-950 hover:bg-moss-100 dark:border-moss-700 dark:bg-moss-900 dark:text-moss-50 dark:hover:bg-moss-900",
                locked && "opacity-60"
              )}
              disabled={locked}
              onClick={() => setCurrentLevel(level.id)}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-100 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {locked ? <Lock className="h-3.5 w-3.5" aria-hidden /> : level.order}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm">{level.title}</span>
                <span className="block truncate text-xs opacity-75">{level.chapter}</span>
              </span>
              {status === "completed" && (
                <span className="flex items-center gap-0.5 text-xs">
                  {Array.from({ length: progress[level.id]?.stars ?? 0 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </span>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
