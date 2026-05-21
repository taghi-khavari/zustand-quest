import { Telescope } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function DevtoolsTimelinePlayground({ isSolved }: PlaygroundProps) {
  const actions = isSolved ? ["cart/addItem", "cart/removeItem", "settings/setTheme"] : ["anonymous", "setState", "unknown"];
  return (
    <div className="min-h-[24rem] rounded-lg bg-slate-950 p-5 text-slate-100">
      <div className="mb-5 flex items-center gap-3">
        <Telescope className="h-6 w-6 text-river-300" aria-hidden />
        <div>
          <p className="text-sm font-black">Devtools telescope</p>
          <p className="text-xs text-slate-400">{isSolved ? "Named actions are readable" : "Timeline is vague"}</p>
        </div>
      </div>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={action} className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-800 text-xs font-black">{index + 1}</span>
            <span className={cn("flex-1 rounded-lg border p-3 font-mono text-sm", isSolved ? "border-moss-800 bg-moss-950 text-moss-100" : "border-rose-800 bg-rose-950 text-rose-100")}>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
