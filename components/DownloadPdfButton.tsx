"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DownloadIcon, SpinnerIcon } from "@/components/ui/icons";
import { getCvFilename } from "@/lib/cv-filename";
import { isCvEmpty } from "@/lib/cv-helpers";
import { downloadBlob } from "@/lib/download-blob";
import type { CvThemeId } from "@/lib/cv-themes";
import type { CvData } from "@/types/cv";

interface DownloadPdfButtonProps {
  cv: CvData;
  themeId: CvThemeId;
  /** Called with a message when generation fails, and with null on a new attempt. */
  onError: (message: string | null) => void;
}

/**
 * The PDF library (~1 MB) is loaded with a dynamic import() only when it is
 * needed, so it is not part of the initial page bundle. Hovering or focusing
 * the button starts loading it early so the click feels instant.
 */
const loadPdfGenerator = () => import("@/lib/pdf/generate");

export function DownloadPdfButton({ cv, themeId, onError }: DownloadPdfButtonProps) {
  const [busy, setBusy] = useState(false);
  const empty = isCvEmpty(cv);

  const preload = () => {
    loadPdfGenerator().catch(() => {
      // Ignored on purpose: a real failure is reported when the user clicks.
    });
  };

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    onError(null);

    try {
      const { generateCvPdf } = await loadPdfGenerator();
      const blob = await generateCvPdf(cv, themeId);
      downloadBlob(blob, getCvFilename(cv.personal));
    } catch (error) {
      console.error("PDF generation failed:", error);
      onError("Could not generate the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      onPointerEnter={preload}
      onFocus={preload}
      disabled={busy || empty}
      aria-busy={busy}
      title={empty ? "Add some content to your CV first" : undefined}
    >
      {busy ? <SpinnerIcon /> : <DownloadIcon />}
      {busy ? "Generating…" : "Download PDF"}
    </Button>
  );
}
