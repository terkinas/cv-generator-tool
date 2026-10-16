import { hasText } from "@/lib/cv-helpers";
import type { EducationEntry, LanguageEntry, SkillEntry } from "@/types/cv";
import { LanguageLevelDots } from "./LanguageLevelDots";
import { PreviewSection } from "./PreviewSection";

interface CvSidebarProps {
  education: EducationEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
}

/** Left column of the CV: Education, Skills and Languages. */
export function CvSidebar({ education, skills, languages }: CvSidebarProps) {
  const visibleEducation = education.filter((item) =>
    hasText(item.institution, item.subtitle, item.date),
  );
  const visibleSkills = skills.filter((item) => hasText(item.name));
  const visibleLanguages = languages.filter((item) => hasText(item.name));

  return (
    <aside className="order-2 space-y-7 border-t border-slate-200 bg-slate-50 p-6 @md:order-1 @md:border-r @md:border-t-0">
      {visibleEducation.length > 0 ? (
        <PreviewSection title="Education">
          <ul className="space-y-3.5">
            {visibleEducation.map((item) => (
              <li key={item.id}>
                {hasText(item.institution) ? (
                  <p className="font-semibold leading-snug text-slate-900">
                    {item.institution.trim()}
                  </p>
                ) : null}
                {hasText(item.subtitle) ? (
                  <p className="text-slate-600">{item.subtitle.trim()}</p>
                ) : null}
                {hasText(item.date) ? (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.date.trim()}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </PreviewSection>
      ) : null}

      {visibleSkills.length > 0 ? (
        <PreviewSection title="Skills">
          <ul className="flex flex-wrap gap-1.5">
            {visibleSkills.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700"
              >
                {item.name.trim()}
              </li>
            ))}
          </ul>
        </PreviewSection>
      ) : null}

      {visibleLanguages.length > 0 ? (
        <PreviewSection title="Languages">
          <ul className="space-y-2.5">
            {visibleLanguages.map((item) => (
              <li key={item.id}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-slate-900">
                    {item.name.trim()}
                  </span>
                  <LanguageLevelDots level={item.level} />
                </div>
                <p className="text-xs text-slate-500">{item.level}</p>
              </li>
            ))}
          </ul>
        </PreviewSection>
      ) : null}
    </aside>
  );
}
