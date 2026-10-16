import type { PersonalInfo } from "@/types/cv";

const MAX_PART_LENGTH = 60;

/** Makes one name part safe for a file name while keeping its letters (ą, č, ž...). */
function toFilenamePart(value: string): string {
  return (
    value
      .normalize("NFC")
      // Characters that are illegal in file names on Windows/macOS/Linux.
      .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      // Leading/trailing dots and dashes make awkward or hidden file names.
      .replace(/^[.-]+|[.-]+$/g, "")
      .slice(0, MAX_PART_LENGTH)
  );
}

/**
 * Builds the download name: "FirstName-LastName-CV.pdf".
 * Missing name parts are skipped, falling back to just "CV.pdf".
 */
export function getCvFilename(
  personal: Pick<PersonalInfo, "firstName" | "lastName">,
): string {
  const parts = [personal.firstName, personal.lastName]
    .map(toFilenamePart)
    .filter(Boolean);

  return `${[...parts, "CV"].join("-")}.pdf`;
}
