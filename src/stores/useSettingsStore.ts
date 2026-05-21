"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SettingsState {
  theme: "light" | "dark" | "system";
  editorFontSize: number;
  reducedMotion: boolean;
  setTheme: (theme: SettingsState["theme"]) => void;
  setEditorFontSize: (size: number) => void;
  setReducedMotion: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      editorFontSize: 14,
      reducedMotion: false,
      setTheme: (theme) => set({ theme }),
      setEditorFontSize: (editorFontSize) => set({ editorFontSize }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion })
    }),
    {
      name: "zustand-quest-settings",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
