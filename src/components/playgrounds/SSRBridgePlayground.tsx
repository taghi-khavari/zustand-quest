import { ShieldCheck, TriangleAlert, Workflow } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { cn } from "@/lib/utils";

export function SSRBridgePlayground({ isSolved }: PlaygroundProps) {
  return (
    <div className="min-h-[24rem] rounded-lg bg-river-50 p-5 dark:bg-river-950">
      <p className="mb-6 text-sm font-black">SSR bridge</p>
      <div className="grid place-items-center rounded-lg border border-river-200 bg-white p-8 dark:border-river-800 dark:bg-slate-950">
        <Workflow className={cn("mb-5 h-16 w-16", isSolved ? "text-moss-600" : "text-rose-600")} aria-hidden />
        <div className={cn("flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold", isSolved ? "bg-moss-50 text-moss-900 dark:bg-moss-950 dark:text-moss-100" : "bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100")}>
          {isSolved ? <ShieldCheck className="h-5 w-5" aria-hidden /> : <TriangleAlert className="h-5 w-5" aria-hidden />}
          {isSolved ? "Client mounted before persisted state renders" : "Hydration mismatch warning"}
        </div>
      </div>
    </div>
  );
}
