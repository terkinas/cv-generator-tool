"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createEmptyCv } from "@/lib/cv-helpers";
import { loadCv, saveCv } from "@/lib/cv-storage";
import { sampleCv } from "@/lib/sample-cv";
import type { CvData } from "@/types/cv";

const SAVE_DELAY_MS = 400;

/**
 * CV state backed by localStorage.
 *
 * IMPORTANT: call this only from a component that is rendered on the client
 * after hydration (see CvBuilder). Its initial state reads localStorage, which
 * does not exist on the server, so rendering it during SSR would produce HTML
 * that differs from the client's first render (a hydration mismatch).
 *
 * - First visit (nothing saved): starts from the sample CV.
 * - Edits are saved after a short pause, and flushed immediately when the tab
 *   is hidden/closed or the component unmounts, so the last keystrokes survive.
 * - `reset()` blanks the CV and saves the blank state, so a reload does not
 *   bring the sample data back.
 */
export function usePersistedCv() {
  const [cv, setCvState] = useState<CvData>(() => loadCv() ?? sampleCv);
  const [saveFailed, setSaveFailed] = useState(false);

  const pending = useRef<CvData | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const flush = useCallback(() => {
    window.clearTimeout(timer.current);
    const data = pending.current;
    if (!data) return;
    pending.current = null;
    setSaveFailed(!saveCv(data));
  }, []);

  const setCv = useCallback(
    (next: CvData) => {
      setCvState(next);
      pending.current = next;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(flush, SAVE_DELAY_MS);
    },
    [flush],
  );

  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    pending.current = null;
    const blank = createEmptyCv();
    setCvState(blank);
    setSaveFailed(!saveCv(blank));
  }, []);

  useEffect(() => {
    const flushWhenHidden = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flushWhenHidden);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flushWhenHidden);
      flush();
    };
  }, [flush]);

  return { cv, setCv, reset, saveFailed };
}
