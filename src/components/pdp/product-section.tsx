import type { ReactNode } from "react";

type ProductSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ProductSection({
  title,
  description,
  children,
}: ProductSectionProps) {
  return (
    <section className="rounded-2xl border border-foreground/10 bg-background p-5 sm:p-6">
      <header className="space-y-1">
        <h2 className="text-sm font-semibold tracking-tight sm:text-base">
          {title}
        </h2>
        {description ? (
          <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
            {description}
          </p>
        ) : null}
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}
