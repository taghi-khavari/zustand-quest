"use client";

import { useEffect } from "react";
import { Play, RotateCcw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useSettingsStore } from "@/stores/useSettingsStore";

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

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-black">Code</h2>
          <div className="flex items-center gap-2">
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
      </CardHeader>
      <CardContent className="h-[32rem] p-0">
        <textarea
          aria-label="Zustand challenge code editor"
          value={code}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="code-scrollbar h-full w-full resize-none bg-slate-950 p-4 font-mono leading-6 text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-moss-500"
          style={{ fontSize }}
        />
      </CardContent>
    </Card>
  );
}
