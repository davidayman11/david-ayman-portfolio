import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  layout?: "split" | "stack";
  className?: string;
};

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  layout = "split",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 border-t border-line py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8">
        <div className="rise mb-8 flex items-center gap-3 md:mb-12">
          <span className="font-mono text-[11px] tracking-[0.2em] text-mute">
            {index}
          </span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            {eyebrow}
          </span>
        </div>

        {layout === "split" ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="rise lg:col-span-4">
              <h2
                id={`${id}-title`}
                className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
              >
                {title}
              </h2>
              {intro ? (
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                  {intro}
                </p>
              ) : null}
            </div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        ) : (
          <div>
            <div className="rise max-w-3xl">
              <h2
                id={`${id}-title`}
                className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
              >
                {title}
              </h2>
              {intro ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                  {intro}
                </p>
              ) : null}
            </div>
            <div className="mt-12 md:mt-16">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
