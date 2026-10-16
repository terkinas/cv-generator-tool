import type { CSSProperties } from "react";
import type { CvData } from "@/types/cv";
import { getTheme, type CvThemeId } from "@/lib/cv-themes";
import { CvHeader } from "./CvHeader";
import { CvMain } from "./CvMain";
import { CvSidebar } from "./CvSidebar";

/**
 * The CV "paper". It is a container-query container, so the two-column
 * layout depends on the width of the paper itself (not the viewport) and
 * collapses to a single column only when the paper is very narrow.
 */
export function CvPreview({
  cv,
  themeId,
}: {
  cv: CvData;
  themeId: CvThemeId;
}) {
  const style = { "--cv-accent": getTheme(themeId).accent } as CSSProperties;

  return (
    <div className="@container">
      <article
        aria-label="CV preview"
        style={style}
        className="cv-paper overflow-hidden rounded-xl bg-white text-[13px] text-slate-800 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200"
      >
        <div className="h-1.5 bg-(--cv-accent)" />
        <CvHeader personal={cv.personal} />
        <div className="grid @md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <CvSidebar
            education={cv.education}
            skills={cv.skills}
            languages={cv.languages}
          />
          <CvMain about={cv.about} experience={cv.experience} />
        </div>
      </article>
    </div>
  );
}
