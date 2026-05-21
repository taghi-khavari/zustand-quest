"use client";

import { useEffect } from "react";
import { AppHeader } from "./AppHeader";
import { useSettingsStore } from "@/stores/useSettingsStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", theme === "dark" || (theme === "system" && systemDark));
  }, [theme]);

  return (
    <div className="min-h-screen text-slate-950 antialiased dark:text-slate-50">
      <AppHeader />
      {children}
    </div>
  );
}
