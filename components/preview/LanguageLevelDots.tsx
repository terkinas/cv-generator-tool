import { LANGUAGE_LEVELS, type LanguageLevel } from "@/types/cv";

export function LanguageLevelDots({ level }: { level: LanguageLevel }) {
  const filled = LANGUAGE_LEVELS.indexOf(level) + 1;

  return (
    <span role="img" aria-label={`${level} proficiency`} className="flex gap-1">
      {LANGUAGE_LEVELS.map((option, index) => (
        <span
          key={option}
          className={`h-1.5 w-1.5 rounded-full ${
            index < filled ? "bg-(--cv-accent)" : "bg-slate-200"
          }`}
        />
      ))}
    </span>
  );
}
