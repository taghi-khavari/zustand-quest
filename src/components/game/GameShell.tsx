"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { levels } from "@/data/levels";
import { getLevelById, getNextLevel } from "@/lib/game/levelEngine";
import { calculateStars } from "@/lib/game/scoring";
import { validateCode } from "@/lib/validators/validators";
import type { ValidationResult } from "@/types/game";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { CodeEditor } from "./CodeEditor";
import { HintPanel } from "./HintPanel";
import { LessonPanel } from "./LessonPanel";
import { LevelCompleteDialog } from "./LevelCompleteDialog";
import { LevelSelector } from "./LevelSelector";
import { Playground } from "./Playground";
import { ProgressBar } from "./ProgressBar";
import { ResultPanel } from "./ResultPanel";
import { useGameProgressStore, useStreak } from "@/stores/useGameProgressStore";

export function GameShell() {
  const currentLevelId = useGameProgressStore((state) => state.currentLevelId);
  const setCurrentLevel = useGameProgressStore((state) => state.setCurrentLevel);
  const recordAttempt = useGameProgressStore((state) => state.recordAttempt);
  const recordHint = useGameProgressStore((state) => state.recordHint);
  const completeLevel = useGameProgressStore((state) => state.completeLevel);
  const resetProgress = useGameProgressStore((state) => state.resetProgress);
  const progress = useGameProgressStore((state) => state.levels[currentLevelId]);
  const streak = useStreak();
  const level = useMemo(() => getLevelById(currentLevelId), [currentLevelId]);
  const nextLevel = getNextLevel(level.id);

  const [code, setCode] = useState(level.starterCode);
  const [result, setResult] = useState<ValidationResult | undefined>();
  const [visibleHints, setVisibleHints] = useState(0);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [solutionShown, setSolutionShown] = useState(false);
  const [dialogStars, setDialogStars] = useState(0);
  const [mobileTab, setMobileTab] = useState("mission");

  useEffect(() => {
    setCode(level.starterCode);
    setResult(undefined);
    setVisibleHints(0);
    setStartedAt(Date.now());
    setSolutionShown(false);
    setDialogStars(0);
  }, [level]);

  const isSolved = Boolean(result?.isCorrect || progress?.status === "completed");
  const attempts = progress?.attempts ?? 0;

  const runCode = useCallback(() => {
    recordAttempt(level.id);
    const validation = validateCode(level, code);
    setResult(validation);
    if (validation.isCorrect) {
      const timeMs = Date.now() - startedAt;
      const latestAttempts = (useGameProgressStore.getState().levels[level.id]?.attempts ?? 0);
      const stars = solutionShown
        ? 1
        : calculateStars({
            attempts: latestAttempts,
            usedHints: visibleHints,
            timeMs
          });
      completeLevel(level.id, { stars, timeMs, usedHints: visibleHints });
      setDialogStars(stars);
    }
  }, [code, completeLevel, level, recordAttempt, solutionShown, startedAt, visibleHints]);

  const revealHint = () => {
    if (visibleHints >= level.hints.length) return;
    setVisibleHints((count) => count + 1);
    recordHint(level.id);
  };

  const showSolution = () => {
    setCode(level.solutionCode);
    setSolutionShown(true);
  };

  const goNext = () => {
    setDialogStars(0);
    if (nextLevel) setCurrentLevel(nextLevel.id);
  };

  const desktop = (
    <div className="grid gap-4 xl:grid-cols-[17rem_minmax(0,1fr)_minmax(25rem,32rem)]">
      <div className="hidden xl:block">
        <LevelSelector />
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(24rem,1.18fr)] xl:grid-cols-1">
        <LessonPanel level={level} />
        <Playground level={level} userCode={code} validationResult={result} isSolved={isSolved} />
      </div>
      <div className="space-y-4">
        <CodeEditor
          code={code}
          onChange={setCode}
          onRun={runCode}
          onReset={() => {
            setCode(level.starterCode);
            setResult(undefined);
            setSolutionShown(false);
          }}
          onShowSolution={showSolution}
          canShowSolution={attempts >= 3}
        />
        <ResultPanel level={level} result={result} />
        <HintPanel level={level} visibleCount={visibleHints} onReveal={revealHint} />
      </div>
    </div>
  );

  const mobileContent = {
    mission: <LessonPanel level={level} />,
    playground: <Playground level={level} userCode={code} validationResult={result} isSolved={isSolved} />,
    code: (
      <CodeEditor
        code={code}
        onChange={setCode}
        onRun={runCode}
        onReset={() => setCode(level.starterCode)}
        onShowSolution={showSolution}
        canShowSolution={attempts >= 3}
      />
    ),
    result: (
      <div className="space-y-4">
        <ResultPanel level={level} result={result} />
        <HintPanel level={level} visibleCount={visibleHints} onReveal={revealHint} />
      </div>
    )
  } as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/75">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">
            Level {level.order} of {levels.length}
          </p>
          <h1 className="text-lg font-black">{level.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ProgressBar />
          <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-black text-amber-900 dark:bg-amber-950 dark:text-amber-100">
            Streak {streak}
          </span>
          <Button type="button" variant="secondary" size="sm" onClick={resetProgress}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset progress
          </Button>
        </div>
      </div>

      <div className="mb-4 xl:hidden">
        <LevelSelector />
      </div>

      <div className="lg:hidden">
        <Tabs
          tabs={[
            { id: "mission", label: "Mission" },
            { id: "playground", label: "Play" },
            { id: "code", label: "Code" },
            { id: "result", label: "Result" }
          ]}
          active={mobileTab}
          onChange={setMobileTab}
        />
        <div className="mt-4">{mobileContent[mobileTab as keyof typeof mobileContent]}</div>
      </div>

      <div className="hidden lg:block">{desktop}</div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white/75 p-3 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap gap-2">
          {level.conceptTags.map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <Button type="button" onClick={goNext} disabled={!nextLevel || progress?.status !== "completed"}>
          Next
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      <LevelCompleteDialog open={dialogStars > 0} stars={dialogStars} onClose={() => setDialogStars(0)} onNext={goNext} />
    </main>
  );
}
