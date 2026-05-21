"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore, type SettingsState } from "@/stores/useSettingsStore";

const themes: { value: SettingsState["theme"]; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "system", label: "System theme", icon: Monitor }
];

export function ThemeToggle() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const index = themes.findIndex((item) => item.value === theme);
  const next = themes[(index + 1) % themes.length];
  const Icon = themes[index]?.icon ?? Monitor;

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={() => setTheme(next.value)}
      aria-label={`Switch to ${next.label}`}
      title={`Current: ${themes[index]?.label ?? "System theme"}`}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </Button>
  );
}
