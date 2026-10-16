import type { ReactNode } from "react";

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
}

export function PreviewSection({ title, children }: PreviewSectionProps) {
  return (
    <section>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--cv-accent)">
        {title}
      </h3>
      {children}
    </section>
  );
}
