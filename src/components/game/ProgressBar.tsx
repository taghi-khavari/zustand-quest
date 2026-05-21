"use client";

import { levels } from "@/data/levels";
import { Progress } from "@/components/ui/Progress";
import { useCompletedCount, useTotalStars } from "@/stores/useGameProgressStore";

export function ProgressBar() {
  const completed = useCompletedCount();
  const stars = useTotalStars();
  const value = (completed / levels.length) * 100;

  return (
    <div className="min-w-40">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
        <span>{completed}/{levels.length} levels</span>
        <span>{stars} stars</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
