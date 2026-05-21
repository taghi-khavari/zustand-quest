import type { Level } from "@/types/game";

export function getVisibleHints(level: Level, count: number) {
  return level.hints.slice(0, count);
}
