"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { levels } from "@/data/levels";
import { formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/game/ProgressBar";
import { useGameProgressStore } from "@/stores/useGameProgressStore";

export default function ProgressPage() {
  const progress = useGameProgressStore((state) => state.levels);
  const completed = levels.filter((level) => progress[level.id]?.status === "completed");
  const weakTopics = Array.from(
    new Set(
      levels
        .filter((level) => (progress[level.id]?.stars ?? 0) > 0 && (progress[level.id]?.stars ?? 0) < 3)
        .flatMap((level) => level.conceptTags)
    )
  ).slice(0, 8);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">Progress</p>
          <h1 className="text-4xl font-black">Academy Report</h1>
        </div>
        <div className="w-full max-w-sm">
          <ProgressBar />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-black">Completed Levels</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {completed.length === 0 && <p className="text-sm text-slate-500">No completed levels yet. The first store is waiting.</p>}
            {completed.map((level) => {
              const levelProgress = progress[level.id];
              return (
                <div key={level.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <div>
                    <p className="font-bold">{level.order}. {level.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatDuration(levelProgress?.bestTimeMs)} best time</p>
                  </div>
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: levelProgress?.stars ?? 0 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-black">Weak Topics</h2>
            </CardHeader>
            <CardContent>
              {weakTopics.length === 0 ? (
                <p className="text-sm text-slate-500">Solve a few levels to get retry recommendations.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {weakTopics.map((tag) => (
                    <span key={tag} className="rounded-md bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-black">Retry Plan</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {levels
                .filter((level) => progress[level.id]?.status !== "completed")
                .slice(0, 3)
                .map((level) => (
                  <p key={level.id} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
                    Next up: <strong>{level.title}</strong>
                  </p>
                ))}
              <Link href="/play">
                <Button className="w-full">Practice now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
