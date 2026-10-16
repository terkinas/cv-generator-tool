"use client";

import { useCallback, useState } from "react";

export type ColorMode = "light" | "dark";

/** Keep in sync with the inline script in app/layout.tsx. */
export const COLOR_MODE_STORAGE_KEY = "cv-generator:color-mode:v1";

/**
 * Page light/dark mode. The `dark` class on <html> is set before first paint
 * by a small inline script (saved choice, otherwise the OS preference), so
 * this hook just reads it. Client-only, like usePersistedCv.
 */
export function useColorMode() {
  const [mode, setMode] = useState<ColorMode>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const toggle = useCallback(() => {
    const next: ColorMode = mode === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    setMode(next);
    try {
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
    } catch {
      // Ignored: the mode still applies for this session.
    }
  }, [mode]);

  return [mode, toggle] as const;
}
