import { pdf } from "@react-pdf/renderer";
import type { CvData } from "@/types/cv";
import { getTheme, type CvThemeId } from "@/lib/cv-themes";
import { CvPdfDocument } from "./cv-document";
import { registerPdfFonts } from "./fonts";

/**
 * Renders the CV to a real A4 PDF (vector, selectable text, embedded fonts).
 *
 * This module is the only place that imports @react-pdf/renderer for the
 * page, and it is loaded with a dynamic import() when the user clicks
 * "Download PDF", so the library stays out of the initial bundle.
 */
export async function generateCvPdf(
  cv: CvData,
  themeId: CvThemeId,
): Promise<Blob> {
  registerPdfFonts();
  const { accent } = getTheme(themeId);
  return pdf(<CvPdfDocument cv={cv} accent={accent} />).toBlob();
}
