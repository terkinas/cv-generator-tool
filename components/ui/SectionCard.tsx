import { useId, type ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-sm sm:p-6"
    >
      <header className="mb-5">
        <h2 id={headingId} className="text-base font-semibold text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
