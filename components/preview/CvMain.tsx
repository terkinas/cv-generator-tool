import { hasText } from "@/lib/cv-helpers";
import type { ExperienceEntry } from "@/types/cv";
import { PreviewSection } from "./PreviewSection";

interface CvMainProps {
  about: string;
  experience: ExperienceEntry[];
}

/** Right column of the CV: About me and Work experience. */
export function CvMain({ about, experience }: CvMainProps) {
  const visibleExperience = experience.filter((item) =>
    hasText(item.title, item.subtitle, item.date, item.description),
  );

  return (
    <div className="order-1 space-y-7 p-6 @md:order-2 @lg:px-8">
      {hasText(about) ? (
        <PreviewSection title="About me">
          <p className="whitespace-pre-line leading-relaxed text-slate-600">
            {about.trim()}
          </p>
        </PreviewSection>
      ) : null}

      {visibleExperience.length > 0 ? (
        <PreviewSection title="Work experience">
          <ul className="space-y-5">
            {visibleExperience.map((item) => (
              <li key={item.id} className="border-l-2 border-slate-200 pl-4">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
                  {hasText(item.title) ? (
                    <h4 className="font-semibold text-slate-900">
                      {item.title.trim()}
                    </h4>
                  ) : null}
                  {hasText(item.date) ? (
                    <span className="ml-auto shrink-0 text-xs text-slate-500">
                      {item.date.trim()}
                    </span>
                  ) : null}
                </div>
                {hasText(item.subtitle) ? (
                  <p className="text-slate-600">{item.subtitle.trim()}</p>
                ) : null}
                {hasText(item.description) ? (
                  <p className="mt-1.5 whitespace-pre-line leading-relaxed text-slate-600">
                    {item.description.trim()}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </PreviewSection>
      ) : null}
    </div>
  );
}
