"use client";

import { useCallback, useState } from "react";
import {
  loadThemeId,
  saveThemeId,
  type CvThemeId,
} from "@/lib/cv-themes";

/**
 * Selected CV colour theme, backed by localStorage. Like usePersistedCv, call
 * it only from a component rendered on the client after hydration.
 */
export function usePersistedTheme() {
  const [themeId, setThemeIdState] = useState<CvThemeId>(loadThemeId);

  const setThemeId = useCallback((id: CvThemeId) => {
    setThemeIdState(id);
    saveThemeId(id);
  }, []);

  return [themeId, setThemeId] as const;
}
