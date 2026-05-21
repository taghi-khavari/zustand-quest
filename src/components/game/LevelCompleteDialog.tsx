"use client";

import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LevelCompleteDialog({
  open,
  stars,
  onClose,
  onNext
}: {
  open: boolean;
  stars: number;
  onClose: () => void;
  onNext: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">Level complete</p>
            <h2 className="text-2xl font-black">Nice work.</h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close completion dialog">
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <div className="mb-6 flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Star
              key={index}
              className={index < stars ? "h-8 w-8 fill-amber-400 text-amber-400" : "h-8 w-8 text-slate-300"}
              aria-hidden
            />
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Stay
          </Button>
          <Button type="button" onClick={onNext}>
            Next level
          </Button>
        </div>
      </div>
    </div>
  );
}
