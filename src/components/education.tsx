import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

export function Education({
  section,
  items,
}: {
  section: Portfolio["educationSection"];
  items: Portfolio["education"];
}) {
  return (
    <Section id="education" index="06" eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      {items.length === 0 ? (
        <p className="border-t border-line py-8 text-sm text-mute">No education yet.</p>
      ) : (
        <ol className="border-t border-line">
          {items.map((item) => (
            <li key={item.id} className="rise grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-xs tracking-wide text-mute md:col-span-4">
                <time>{item.dates}</time>
              </p>
              <div className="md:col-span-8">
                <h3 className="font-serif text-2xl tracking-[-0.03em]">{item.degree}</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {item.institution}
                  {item.location ? (
                    <>
                      <span className="px-2 text-line-strong" aria-hidden>
                        /
                      </span>
                      {item.location}
                    </>
                  ) : null}
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
