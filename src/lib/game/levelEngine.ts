import { levels } from "@/data/levels";
import type { Level } from "@/types/game";

export function getLevelById(levelId: string): Level {
  return levels.find((level) => level.id === levelId) ?? levels[0];
}

export function getNextLevel(levelId: string) {
  const level = getLevelById(levelId);
  return levels.find((candidate) => candidate.order === level.order + 1);
}

export function getChapters() {
  return Array.from(new Set(levels.map((level) => level.chapter)));
}
