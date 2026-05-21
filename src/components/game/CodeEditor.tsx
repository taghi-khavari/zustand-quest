"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  onShowSolution,
  canShowSolution
}: {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  onShowSolution: () => void;
  canShowSolution: boolean;
}) {
  const fontSize = useSettingsStore((state) => state.editorFontSize);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        onRun();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onRun]);

  const handleFormat = async () => {
    setIsFormatting(true);
    setFormatError(null);
    try {
      onChange(await formatCodeSnippet(code));
    } catch (error) {
      setFormatError(error instanceof Error ? error.message : "Could not format this snippet.");
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-black">Code</h2>
          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={handleFormat} disabled={isFormatting}>
              <AlignLeft className="h-4 w-4" aria-hidden />
              {isFormatting ? "Formatting" : "Format"}
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onShowSolution} disabled={!canShowSolution}>
              <Wand2 className="h-4 w-4" aria-hidden />
              Solution
            </Button>
            <Button type="button" size="sm" onClick={onRun}>
              <Play className="h-4 w-4" aria-hidden />
              Run
            </Button>
          </div>
        </div>
        {formatError && <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">{formatError}</p>}
      </CardHeader>
      <CardContent className="h-[clamp(20rem,50vh,30rem)] p-0">
        <RichCodeEditor code={code} fontSize={fontSize} onChange={onChange} />
      </CardContent>
    </Card>
  );
}
