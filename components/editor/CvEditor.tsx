import type { CvData } from "@/types/cv";
import { AboutSection } from "./AboutSection";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { LanguagesSection } from "./LanguagesSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SkillsSection } from "./SkillsSection";

interface CvEditorProps {
  cv: CvData;
  onChange: (cv: CvData) => void;
}

export function CvEditor({ cv, onChange }: CvEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Build your CV
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the sections below &mdash; the preview updates as you type.
        </p>
      </div>

      <PersonalInfoSection
        value={cv.personal}
        onChange={(personal) => onChange({ ...cv, personal })}
      />
      <AboutSection
        value={cv.about}
        onChange={(about) => onChange({ ...cv, about })}
      />
      <ExperienceSection
        items={cv.experience}
        onChange={(experience) => onChange({ ...cv, experience })}
      />
      <EducationSection
        items={cv.education}
        onChange={(education) => onChange({ ...cv, education })}
      />
      <SkillsSection
        items={cv.skills}
        onChange={(skills) => onChange({ ...cv, skills })}
      />
      <LanguagesSection
        items={cv.languages}
        onChange={(languages) => onChange({ ...cv, languages })}
      />
    </div>
  );
}
