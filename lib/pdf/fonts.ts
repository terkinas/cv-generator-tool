import { Font } from "@react-pdf/renderer";

export const PDF_FONT_FAMILY = "Geist";

/** Words longer than this (URLs, pasted garbage) are allowed to wrap mid-word. */
const MAX_UNBROKEN_WORD = 28;
const FORCED_CHUNK = 16;

let registered = false;

/**
 * Registers the embedded font and the line-breaking rules. Safe to call many
 * times. The standard PDF fonts (Helvetica & co.) cannot encode ą č ę ė į š ų ū ž,
 * so a real TrueType font must be embedded; Geist has full Latin Extended
 * coverage and matches the app UI. The files live in /public/fonts and are only
 * fetched when a PDF is generated.
 */
export function registerPdfFonts(fontsBase = "/fonts"): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      { src: `${fontsBase}/Geist-Regular.ttf`, fontWeight: 400 },
      { src: `${fontsBase}/Geist-Medium.ttf`, fontWeight: 500 },
      { src: `${fontsBase}/Geist-SemiBold.ttf`, fontWeight: 600 },
    ],
  });

  // The built-in hyphenation uses English patterns, which would split
  // Lithuanian (and most English) words in wrong places. Keep words whole and
  // only force-split absurdly long unbroken strings so they cannot overflow.
  Font.registerHyphenationCallback((word) => {
    const chars = Array.from(word);
    if (chars.length <= MAX_UNBROKEN_WORD) return [word];

    const chunks: string[] = [];
    for (let i = 0; i < chars.length; i += FORCED_CHUNK) {
      chunks.push(chars.slice(i, i + FORCED_CHUNK).join(""));
    }
    return chunks;
  });
}
