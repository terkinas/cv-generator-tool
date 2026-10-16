"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemePicker } from "@/components/ThemePicker";
import { ResetCvButton } from "@/components/ResetCvButton";
import { CvEditor } from "@/components/editor/CvEditor";
import { CvPreview } from "@/components/preview/CvPreview";
import { DocumentIcon, XIcon } from "@/components/ui/icons";
import { useIsClient } from "@/hooks/useIsClient";
import { usePersistedTheme } from "@/hooks/usePersistedTheme";
import { usePersistedCv } from "@/hooks/usePersistedCv";

function AppHeader({ actions }: { actions?: ReactNode }) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[88rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <DocumentIcon />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            CV Generator
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <p className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live preview
          </p>
          {actions}
        </div>
      </div>
    </div>
  );
}

/**
 * Shown for the server render and the hydration render. localStorage is not
 * available on the server, so the saved CV cannot be rendered there; showing
 * a neutral placeholder (instead of the sample CV) avoids flashing someone
 * else's data before the user's own CV appears.
 */
function CvBuilderSkeleton() {
  return (
    <>
      <AppHeader />
      <main
        aria-busy="true"
        className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid animate-pulse gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <div className="space-y-6">
            <div className="h-16 rounded-xl bg-slate-200/70" />
            <div className="h-64 rounded-xl bg-slate-200/70" />
            <div className="h-48 rounded-xl bg-slate-200/70" />
          </div>
          <div className="h-[48rem] rounded-xl bg-slate-200/70" />
        </div>
        <span className="sr-only">Loading your CV…</span>
      </main>
    </>
  );
}

/** Only ever rendered on the client, after hydration (see CvBuilder). */
function CvWorkspace() {
  const { cv, setCv, reset, saveFailed } = usePersistedCv();
  const [themeId, setThemeId] = usePersistedTheme();
  const [pdfError, setPdfError] = useState<string | null>(null);

  return (
    <>
      <AppHeader
        actions={
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ResetCvButton
              onReset={() => {
                reset();
                setPdfError(null);
              }}
            />
            <DownloadPdfButton cv={cv} themeId={themeId} onError={setPdfError} />
          </div>
        }
      />

      <main className="mx-auto w-full max-w-[88rem] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {saveFailed ? (
          <p
            role="status"
            className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200"
          >
            Your browser blocked saving, so changes will be lost when you close
            or refresh this page. You can still download your CV as a PDF.
          </p>
        ) : null}
        {pdfError ? (
          <div
            role="alert"
            className="mb-6 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200"
          >
            <p>{pdfError}</p>
            <button
              type="button"
              onClick={() => setPdfError(null)}
              aria-label="Dismiss"
              className="shrink-0 rounded text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
            >
              <XIcon />
            </button>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
          <CvEditor cv={cv} onChange={setCv} />

          <section
            aria-labelledby="preview-heading"
            className="lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:p-1"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2
                id="preview-heading"
                className="text-sm font-semibold text-slate-900"
              >
                Preview
              </h2>
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-500">Colour</span>
                <ThemePicker value={themeId} onChange={setThemeId} />
              </div>
            </div>
            <CvPreview cv={cv} themeId={themeId} />
          </section>
        </div>
      </main>
    </>
  );
}

export function CvBuilder() {
  const isClient = useIsClient();
  return isClient ? <CvWorkspace /> : <CvBuilderSkeleton />;
}
