"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { levels } from "@/data/levels";
import type { GameProgressState, LevelProgress } from "@/types/game";

function createInitialLevels(): Record<string, LevelProgress> {
  return Object.fromEntries(
    levels.map((level, index) => [
      level.id,
      {
        levelId: level.id,
        status: index === 0 ? "available" : "locked",
        stars: 0,
        attempts: 0,
        usedHints: 0
      }
    ])
  );
}

const initialLevels = createInitialLevels();

function summarize(levelProgress: Record<string, LevelProgress>) {
  const completed = Object.values(levelProgress).filter((level) => level.status === "completed");
  return {
    completedCount: completed.length,
    totalStars: completed.reduce((sum, level) => sum + level.stars, 0)
  };
}

export const createInitialProgressState = () => ({
  currentLevelId: levels[0].id,
  levels: createInitialLevels(),
  totalStars: 0,
  completedCount: 0,
  streak: 0
});

export const useGameProgressStore = create<GameProgressState>()(
  persist(
    (set, get) => ({
      ...createInitialProgressState(),
      setCurrentLevel: (levelId) => {
        const progress = get().levels[levelId];
        if (!progress || progress.status === "locked") return;
        set({ currentLevelId: levelId });
      },
      recordAttempt: (levelId) =>
        set((state) => {
          const current = state.levels[levelId] ?? initialLevels[levelId];
          return {
            levels: {
              ...state.levels,
              [levelId]: { ...current, attempts: current.attempts + 1 }
            }
          };
        }),
      recordHint: (levelId) =>
        set((state) => {
          const current = state.levels[levelId] ?? initialLevels[levelId];
          return {
            levels: {
              ...state.levels,
              [levelId]: { ...current, usedHints: current.usedHints + 1 }
            }
          };
        }),
      completeLevel: (levelId, result) =>
        set((state) => {
          const level = levels.find((candidate) => candidate.id === levelId);
          const nextLevel = levels.find((candidate) => candidate.order === (level?.order ?? 0) + 1);
          const current = state.levels[levelId] ?? initialLevels[levelId];
          const existingStars = current.stars ?? 0;
          const merged: Record<string, LevelProgress> = {
            ...state.levels,
            [levelId]: {
              ...current,
              status: "completed",
              stars: Math.max(existingStars, result.stars),
              completedAt: current.completedAt ?? new Date().toISOString(),
              bestTimeMs: current.bestTimeMs ? Math.min(current.bestTimeMs, result.timeMs) : result.timeMs,
              usedHints: Math.max(current.usedHints, result.usedHints)
            }
          };

          if (nextLevel) {
            const nextProgress = merged[nextLevel.id] ?? initialLevels[nextLevel.id];
            if (nextProgress.status === "locked") {
              merged[nextLevel.id] = { ...nextProgress, status: "available" };
            }
          }

          const summary = summarize(merged);
          return {
            levels: merged,
            currentLevelId: levelId,
            completedCount: summary.completedCount,
            totalStars: summary.totalStars,
            streak: state.streak + (current.status === "completed" ? 0 : 1)
          };
        }),
      resetProgress: () => set(createInitialProgressState())
    }),
    {
      name: "zustand-quest-progress",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      merge: (persisted, current) => {
        const incoming = persisted as Partial<GameProgressState> | undefined;
        const mergedLevels = {
          ...current.levels,
          ...(incoming?.levels ?? {})
        };
        const summary = summarize(mergedLevels);
        return {
          ...current,
          ...incoming,
          levels: mergedLevels,
          completedCount: summary.completedCount,
          totalStars: summary.totalStars
        };
      }
    }
  )
);

export const useCurrentLevelId = () => useGameProgressStore((state) => state.currentLevelId);
export const useLevelProgress = (levelId: string) => useGameProgressStore((state) => state.levels[levelId]);
export const useCompletedCount = () => useGameProgressStore((state) => state.completedCount);
export const useTotalStars = () => useGameProgressStore((state) => state.totalStars);
export const useStreak = () => useGameProgressStore((state) => state.streak);
