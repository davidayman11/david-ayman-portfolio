import { education } from "@/lib/content";
import { Section } from "@/components/section";

export function Education() {
  return (
    <Section
      id="education"
      index="06"
      eyebrow="Education"
      title="Degree, diploma, and the Flutter training underneath."
    >
      <ol className="border-t border-line">
        {education.map((item) => (
          <li
            key={item.title}
            className="rise grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8"
          >
            <p className="font-mono text-xs tracking-wide text-mute md:col-span-4">
              <time>{item.period}</time>
            </p>
            <div className="md:col-span-8">
              <h3 className="font-serif text-2xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {item.place}
                <span className="px-2 text-line-strong" aria-hidden>
                  /
                </span>
                {item.location}
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
