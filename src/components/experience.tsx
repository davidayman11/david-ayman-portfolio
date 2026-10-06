import { experience } from "@/lib/content";
import { Section } from "@/components/section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Product work, and a season in procurement."
      intro="Mobile engineering at Pay Band Solutions is the current role. The Majid Al Futtaim internship was sourcing work with the procurement team."
    >
      <ol className="border-t border-line">
        {experience.map((item) => (
          <li
            key={item.company}
            className="rise grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-4">
              <p className="flex items-center font-mono text-xs tracking-wide text-mute">
                {item.current ? (
                  <span
                    className="mr-2 inline-block size-1.5 rounded-full bg-signal"
                    aria-hidden
                  />
                ) : null}
                <time>{item.period}</time>
              </p>
              {item.location ? (
                <p className="mt-2 text-sm text-mute">{item.location}</p>
              ) : null}
            </div>

            <div className="md:col-span-8">
              <h3 className="font-serif text-3xl tracking-[-0.03em]">
                {item.role}
              </h3>
              <p className="mt-1 text-ink-soft">{item.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                {item.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {item.technologies.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                  {item.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
