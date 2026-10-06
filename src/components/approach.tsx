import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

export function Approach({
  section,
  items,
}: {
  section: Portfolio["approachSection"];
  items: Portfolio["approach"];
}) {
  if (items.length === 0 && !section.title) return null;

  return (
    <Section
      id="approach"
      index="04"
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      className="bg-paper-deep/60"
    >
      {items.length === 0 ? (
        <p className="text-sm text-mute">No engineering notes yet.</p>
      ) : (
        <ol className="grid gap-px bg-line sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.id} className="rise bg-paper p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-[1.7rem] leading-tight tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
