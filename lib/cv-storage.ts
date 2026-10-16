import {
  LANGUAGE_LEVELS,
  type CvData,
  type LanguageLevel,
  type PersonalInfo,
} from "@/types/cv";
import { createEmptyCv } from "@/lib/cv-helpers";

/** Bump the version suffix whenever the stored shape changes incompatibly. */
export const CV_STORAGE_KEY = "cv-generator:cv:v1";

const STORAGE_VERSION = 1;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function isLanguageLevel(value: unknown): value is LanguageLevel {
  return LANGUAGE_LEVELS.some((level) => level === value);
}

/**
 * Maps an unknown value to a list of well-formed entries. Anything that is
 * not an object is dropped, and every entry is guaranteed a unique string id
 * (React uses it as a key).
 */
function parseList<T extends { id: string }>(
  value: unknown,
  prefix: string,
  parseEntry: (item: UnknownRecord) => Omit<T, "id">,
): T[] {
  if (!Array.isArray(value)) return [];

  const usedIds = new Set<string>();
  const result: T[] = [];

  value.forEach((item, index) => {
    if (!isRecord(item)) return;

    let id = asString(item.id).trim() || `${prefix}-restored-${index}`;
    while (usedIds.has(id)) id = `${id}-${index}`;
    usedIds.add(id);

    result.push({ id, ...parseEntry(item) } as T);
  });

  return result;
}

/**
 * Validates untrusted JSON (localStorage can hold anything: old versions,
 * hand-edited values, truncated writes) and returns a well-formed CvData, or
 * null when the payload is unusable.
 */
export function parseStoredCv(raw: string): CvData | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(parsed) || parsed.version !== STORAGE_VERSION) return null;
  const data = parsed.data;
  if (!isRecord(data)) return null;

  const empty = createEmptyCv();
  const personalSource = isRecord(data.personal) ? data.personal : {};
  const personal = { ...empty.personal };
  for (const key of Object.keys(personal) as (keyof PersonalInfo)[]) {
    personal[key] = asString(personalSource[key]);
  }

  return {
    personal,
    about: asString(data.about),
    education: parseList(data.education, "edu", (item) => ({
      institution: asString(item.institution),
      subtitle: asString(item.subtitle),
      date: asString(item.date),
    })),
    skills: parseList(data.skills, "skill", (item) => ({
      name: asString(item.name),
    })),
    languages: parseList(data.languages, "lang", (item) => ({
      name: asString(item.name),
      level: isLanguageLevel(item.level) ? item.level : "Intermediate",
    })),
    experience: parseList(data.experience, "exp", (item) => ({
      title: asString(item.title),
      subtitle: asString(item.subtitle),
      date: asString(item.date),
      description: asString(item.description),
    })),
  };
}

/** Reads the saved CV. Returns null if nothing usable is stored. Browser only. */
export function loadCv(): CvData | null {
  try {
    const raw = window.localStorage.getItem(CV_STORAGE_KEY);
    return raw ? parseStoredCv(raw) : null;
  } catch {
    // Storage can throw (disabled cookies, sandboxed iframe, privacy mode).
    return null;
  }
}

/** Saves the CV. Returns false when the browser refused (quota, privacy mode). */
export function saveCv(cv: CvData): boolean {
  try {
    window.localStorage.setItem(
      CV_STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, data: cv }),
    );
    return true;
  } catch {
    return false;
  }
}
