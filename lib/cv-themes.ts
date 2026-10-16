/**
 * Accent colour themes for the CV. The accent is used for the top bar, the
 * job title, section headings and language-level dots, in both the on-screen
 * preview and the generated PDF. Hex values are Tailwind 600/700 tones, which
 * keep enough contrast for small text on white.
 */
export const CV_THEMES = [
  { id: "indigo", label: "Indigo", accent: "#4f46e5" },
  { id: "blue", label: "Blue", accent: "#2563eb" },
  { id: "teal", label: "Teal", accent: "#0f766e" },
  { id: "emerald", label: "Emerald", accent: "#059669" },
  { id: "orange", label: "Orange", accent: "#c2410c" },
  { id: "rose", label: "Rose", accent: "#e11d48" },
  { id: "slate", label: "Graphite", accent: "#334155" },
] as const;

export type CvThemeId = (typeof CV_THEMES)[number]["id"];
export type CvTheme = (typeof CV_THEMES)[number];

export const DEFAULT_THEME_ID: CvThemeId = "indigo";

export const THEME_STORAGE_KEY = "cv-generator:theme:v1";

export function getTheme(id: string | null | undefined): CvTheme {
  return CV_THEMES.find((theme) => theme.id === id) ?? CV_THEMES[0];
}

/** Reads the saved theme id. Browser only; falls back to the default. */
export function loadThemeId(): CvThemeId {
  try {
    return getTheme(window.localStorage.getItem(THEME_STORAGE_KEY)).id;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function saveThemeId(id: CvThemeId): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Ignored: the theme still works for this session.
  }
}
