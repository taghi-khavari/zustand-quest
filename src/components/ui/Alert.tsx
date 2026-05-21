import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: "neutral" | "success" | "danger" | "info" }) {
  const tones = {
    neutral: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
    success: "border-moss-200 bg-moss-50 text-moss-900 dark:border-moss-800 dark:bg-moss-950 dark:text-moss-100",
    danger: "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100",
    info: "border-river-200 bg-river-50 text-river-900 dark:border-river-800 dark:bg-river-950 dark:text-river-100"
  };

  return <div className={cn("rounded-lg border p-3 text-sm", tones[tone], className)} {...props} />;
}
