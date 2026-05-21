"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-md px-2 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss-500",
            active === tab.id
              ? "bg-moss-100 text-moss-950 shadow-sm dark:bg-moss-900 dark:text-moss-50"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
