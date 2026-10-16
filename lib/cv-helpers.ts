import type {
  CvData,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  SkillEntry,
} from "@/types/cv";

let idCounter = 0;

/**
 * Generates a unique id for a new list entry.
 * Call it from event handlers only - never while rendering.
 */
export function createId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function createEducation(): EducationEntry {
  return { id: createId("edu"), institution: "", subtitle: "", date: "" };
}

export function createSkill(name: string): SkillEntry {
  return { id: createId("skill"), name };
}

export function createLanguage(): LanguageEntry {
  return { id: createId("lang"), name: "", level: "Intermediate" };
}

export function createExperience(): ExperienceEntry {
  return {
    id: createId("exp"),
    title: "",
    subtitle: "",
    date: "",
    description: "",
  };
}

export function updateById<T extends { id: string }>(
  items: readonly T[],
  id: string,
  patch: Partial<Omit<T, "id">>,
): T[] {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

export function removeById<T extends { id: string }>(
  items: readonly T[],
  id: string,
): T[] {
  return items.filter((item) => item.id !== id);
}

/** True when at least one of the values contains non-whitespace text. */
export function hasText(...values: string[]): boolean {
  return values.some((value) => value.trim().length > 0);
}

/** A CV with every field blank - used by "Reset CV". */
export function createEmptyCv(): CvData {
  return {
    personal: {
      firstName: "",
      lastName: "",
      title: "",
      phone: "",
      email: "",
      portfolio: "",
      location: "",
    },
    about: "",
    education: [],
    skills: [],
    languages: [],
    experience: [],
  };
}

/** True when the CV has nothing worth exporting (no visible text at all). */
export function isCvEmpty(cv: CvData): boolean {
  const { personal } = cv;
  return !(
    hasText(...Object.values(personal), cv.about) ||
    cv.education.some((e) => hasText(e.institution, e.subtitle, e.date)) ||
    cv.skills.some((s) => hasText(s.name)) ||
    cv.languages.some((l) => hasText(l.name)) ||
    cv.experience.some((e) =>
      hasText(e.title, e.subtitle, e.date, e.description),
    )
  );
}

/** Returns a copy of `items` with `item` inserted at `index` (clamped). */
export function insertAt<T>(items: readonly T[], index: number, item: T): T[] {
  const at = Math.max(0, Math.min(index, items.length));
  return [...items.slice(0, at), item, ...items.slice(at)];
}

/** Returns a copy with the item at `from` moved to `to`. Out-of-range = no-op. */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0) return [...items];
  if (from >= items.length || to >= items.length) return [...items];
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
