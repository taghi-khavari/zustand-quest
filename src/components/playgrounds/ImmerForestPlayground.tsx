import { GitBranch, Trees } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function ImmerForestPlayground({ isSolved }: PlaygroundProps) {
  return (
    <div className="min-h-[24rem] rounded-lg bg-moss-50 p-5 dark:bg-moss-950">
      <div className="mb-5 flex items-center gap-3">
        <Trees className="h-7 w-7 text-moss-700 dark:text-moss-300" aria-hidden />
        <div>
          <p className="text-sm font-black">Immer forest</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">{isSolved ? "Draft mutation becomes immutable state" : "Nested spread path is tangled"}</p>
        </div>
      </div>
      <div className="rounded-lg border border-moss-200 bg-white p-5 dark:border-moss-800 dark:bg-slate-950">
        <GitBranch className="mx-auto mb-4 h-10 w-10 text-bark-600" aria-hidden />
        <div className="mx-auto max-w-xs space-y-2 font-mono text-xs">
          {["forest", "tree", "nest", "items"].map((node, index) => (
            <div key={node} className={cn("rounded-md border p-2", isSolved && index === 3 ? "border-moss-300 bg-moss-50 text-moss-800 dark:border-moss-800 dark:bg-moss-950 dark:text-moss-100" : "border-slate-200 dark:border-slate-800")}>
              {"  ".repeat(index)}{node}: {isSolved && node === "items" ? "[]" : "{...}"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
