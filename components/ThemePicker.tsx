"use client";

import { CV_THEMES, type CvThemeId } from "@/lib/cv-themes";

interface ThemePickerProps {
  value: CvThemeId;
  onChange: (id: CvThemeId) => void;
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="CV colour theme"
      className="flex items-center gap-1.5"
    >
      {CV_THEMES.map((theme) => {
        const selected = theme.id === value;
        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={theme.label}
            title={theme.label}
            onClick={() => onChange(theme.id)}
            style={{ backgroundColor: theme.accent }}
            className={`h-5 w-5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 ${
              selected
                ? "ring-2 ring-slate-900 ring-offset-2 ring-offset-surface"
                : "hover:scale-110"
            }`}
          />
        );
      })}
    </div>
  );
}
