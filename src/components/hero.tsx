import Image from "next/image";
import { heroFacts, profile } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-24 pb-8 sm:px-8 sm:pt-28">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
          {profile.title}
          <span className="px-2 text-line-strong" aria-hidden>
            /
          </span>
          {profile.focus}
        </p>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="max-w-[12ch] font-serif text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.88] tracking-[-0.045em]">
              David Ayman
              <span className="block italic text-ink-soft">Mahrous</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              I build Flutter products for work that happens on a phone: booking
              an activity, placing a food order, tracking warehouse stock,
              recording attendance, and running a hospital day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

          <figure className="lg:col-span-5">
            <div className="overflow-hidden border border-line bg-paper-deep">
              <Image
                src="/david-ayman.jpg"
                alt="David Ayman Mahrous"
                width={1800}
                height={1710}
                priority
                className="aspect-[4/5] w-full object-cover object-[center_18%]"
              />
            </div>
          </figure>
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
