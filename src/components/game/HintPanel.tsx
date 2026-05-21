"use client";

import { Lightbulb } from "lucide-react";
import type { Level } from "@/types/game";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function HintPanel({ level, visibleCount, onReveal }: { level: Level; visibleCount: number; onReveal: () => void }) {
  const hints = level.hints.slice(0, visibleCount);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-black">Hints</h2>
          <Button type="button" variant="secondary" size="sm" onClick={onReveal} disabled={visibleCount >= level.hints.length}>
            <Lightbulb className="h-4 w-4" aria-hidden />
            Reveal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hints.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Hints lower the score a bit, but learning wins.</p>
        ) : (
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {hints.map((hint, index) => (
              <li key={hint} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                {index + 1}. {hint}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
