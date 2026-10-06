import type { Portfolio } from "@/lib/portfolio";

export function Hero({
  profile,
  hero,
}: {
  profile: Portfolio["profile"];
  hero: Portfolio["hero"];
}) {
  return (
    <section id="top" className="relative px-5 pt-24 pb-8 sm:px-8 sm:pt-28">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          {profile.jobTitle}
          {profile.focus ? (
            <>
              <span className="px-2 text-line-strong" aria-hidden>
                /
              </span>
              {profile.focus}
            </>
          ) : null}
        </p>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="max-w-[12ch] font-serif text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.88] tracking-[-0.045em]">
              {hero.headingLine1}
              {hero.headingLine2 ? (
                <span className="block italic text-ink-soft">{hero.headingLine2}</span>
              ) : null}
            </h1>
            {hero.subheading ? (
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {hero.subheading}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hero.primaryCtaLabel ? (
                <a
                  href={hero.primaryCtaHref}
                  className="inline-flex min-h-12 items-center border border-ink bg-ink px-5 text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
                >
                  {hero.primaryCtaLabel}
                </a>
              ) : null}
              {hero.secondaryCtaLabel ? (
                <a
                  href={hero.secondaryCtaHref}
                  className="inline-flex min-h-12 items-center border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink"
                >
                  {hero.secondaryCtaLabel}
                </a>
              ) : null}
            </div>
          </div>

          <figure className="lg:col-span-5">
            <div className="overflow-hidden border border-line bg-paper-deep">
              {hero.imageUrl ? (
                <img
                  src={hero.imageUrl}
                  alt={profile.name}
                  width={1800}
                  height={1710}
                  fetchPriority="high"
                  style={{ objectPosition: `center ${hero.portraitPosition ?? 18}%` }}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                  Portrait
                </div>
              )}
            </div>
          </figure>
        </div>

        {hero.facts.length > 0 ? (
          <dl className="mt-12 grid border-t border-line sm:grid-cols-3">
            {hero.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-serif text-2xl tracking-[-0.03em]">{fact.value}</dd>
                {fact.detail ? <dd className="mt-1 text-sm text-mute">{fact.detail}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
