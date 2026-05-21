export type LevelStatus = "locked" | "available" | "completed";

export interface LevelProgress {
  levelId: string;
  status: LevelStatus;
  stars: number;
  attempts: number;
  completedAt?: string;
  bestTimeMs?: number;
  usedHints: number;
}

export interface GameProgressState {
  currentLevelId: string;
  levels: Record<string, LevelProgress>;
  totalStars: number;
  completedCount: number;
  streak: number;
  setCurrentLevel: (levelId: string) => void;
  completeLevel: (
    levelId: string,
    result: { stars: number; timeMs: number; usedHints: number }
  ) => void;
  recordAttempt: (levelId: string) => void;
  recordHint: (levelId: string) => void;
  resetProgress: () => void;
}

export type LevelDifficulty = "beginner" | "intermediate" | "advanced";

export type PlaygroundType =
  | "counter"
  | "cart"
  | "renderLab"
  | "async"
  | "persist"
  | "slices"
  | "devtools"
  | "immer"
  | "ssr"
  | "testing";

export interface ValidationCheck {
  id: string;
  description: string;
  message?: string;
  required?: boolean;
  rule?:
    | "zustand-create-import"
    | "bear-state-type"
    | "bear-create-generic"
    | "bear-functional-increment"
    | "bear-reset-action";
  pattern?: string;
  requiredIncludes?: string[];
  forbiddenIncludes?: string[];
  points: number;
}

export interface Level {
  id: string;
  order: number;
  title: string;
  chapter: string;
  difficulty: LevelDifficulty;
  estimatedMinutes: number;
  conceptTags: string[];
  learningObjectives: string[];
  story: string;
  mission: string;
  explanation: string;
  starterCode: string;
  solutionCode: string;
  validation: {
    type: "includes" | "regex" | "multiCheck" | "custom";
    checks: ValidationCheck[];
  };
  hints: string[];
  playgroundType: PlaygroundType;
  successMessage: string;
  failureMessages: string[];
  whyItMatters: string;
}

export interface ValidationResult {
  isCorrect: boolean;
  score: number;
  passedChecks: string[];
  failedChecks: {
    id: string;
    description: string;
    message: string;
  }[];
  normalizedCode: string;
}

export interface PlaygroundProps {
  level: Level;
  validationResult?: ValidationResult;
  isSolved: boolean;
  userCode: string;
}
