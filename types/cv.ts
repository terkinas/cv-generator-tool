export const LANGUAGE_LEVELS = [
  "Basic",
  "Intermediate",
  "Advanced",
  "Fluent",
  "Native",
] as const;

export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  email: string;
  portfolio: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  subtitle: string;
  date: string;
}

export interface SkillEntry {
  id: string;
  name: string;
}

export interface LanguageEntry {
  id: string;
  name: string;
  level: LanguageLevel;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CvData {
  personal: PersonalInfo;
  about: string;
  education: EducationEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
  experience: ExperienceEntry[];
}
