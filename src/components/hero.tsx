import { heroFacts, profile } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative min-h-svh px-5 pt-24 pb-8 sm:px-8 sm:pt-28">
      <div className="mx-auto flex min-h-[calc(100svh-7.5rem)] w-full max-w-[72rem] flex-col">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          {profile.title}
          <span className="px-2 text-line-strong" aria-hidden>
            /
          </span>
          {profile.focus}
        </p>

        <h1 className="mt-6 max-w-[16ch] font-serif text-[clamp(3.4rem,8.4vw,7.4rem)] leading-[0.88] tracking-[-0.045em]">
          David Ayman
          <span className="block italic text-ink-soft">Mahrous</span>
        </h1>

        <div className="mt-10 grid flex-1 content-end gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl lg:col-span-7">
            I build Flutter products for work that happens on a phone: booking
            an activity, placing a food order, tracking warehouse stock,
            recording attendance, and running a hospital day.
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href="#work"
              className="inline-flex min-h-12 items-center border border-ink bg-ink px-5 text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink"
            >
              Contact me
            </a>
          </div>
        </div>

        <dl className="mt-12 grid border-t border-line sm:grid-cols-3">
          {heroFacts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                {fact.label}
              </dt>
              <dd className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                {fact.value}
              </dd>
              <dd className="mt-1 text-sm text-mute">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
