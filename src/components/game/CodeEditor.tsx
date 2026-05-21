"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { AlignLeft, Play, RotateCcw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { formatCodeSnippet } from "@/lib/formatCode";

const RichCodeEditor = dynamic(
  () => import("./RichCodeEditor").then((mod) => mod.RichCodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center bg-slate-950 text-sm font-semibold text-slate-400">
        Loading editor...
      </div>
    )
  }
);

export function CodeEditor({
  code,
  onChange,
  onRun,
  onReset,
  onShowSolution
}: {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  onShowSolution: () => void;
}) {
  const fontSize = useSettingsStore((state) => state.editorFontSize);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);

  const handleFormat = useCallback(async () => {
    if (isFormatting) return;

    setIsFormatting(true);
    setFormatError(null);
    try {
      onChange(await formatCodeSnippet(code));
    } catch (error) {
      setFormatError(error instanceof Error ? error.message : "Could not format this snippet.");
    } finally {
      setIsFormatting(false);
    }
  }, [code, isFormatting, onChange]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        onRun();
      }

      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "." && !event.altKey) {
        event.preventDefault();
        void handleFormat();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleFormat, onRun]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-black">Code</h2>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleFormat}
              disabled={isFormatting}
              title="Format code (Cmd/Ctrl+Shift+.)"
            >
              <AlignLeft className="h-4 w-4" aria-hidden />
              {isFormatting ? "Formatting" : "Format"}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onShowSolution}
              title="Show the solution. Running it after this gives at most 1 star."
            >
              <Wand2 className="h-4 w-4" aria-hidden />
              Solution
            </Button>
            <Button type="button" size="sm" onClick={onRun} className="font-black">
              <Play className="h-4 w-4" aria-hidden />
              Run
            </Button>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>
            Run <kbd className="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-[0.7rem] dark:border-slate-700">Cmd/Ctrl Enter</kbd>
          </span>
          <span>
            Format <kbd className="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-[0.7rem] dark:border-slate-700">Cmd/Ctrl Shift .</kbd>
          </span>
        </div>
        {formatError && <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">{formatError}</p>}
      </CardHeader>
      <CardContent className="h-[clamp(20rem,50vh,30rem)] p-0">
        <RichCodeEditor code={code} fontSize={fontSize} onChange={onChange} />
      </CardContent>
    </Card>
  );
}
