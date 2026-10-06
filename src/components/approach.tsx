import { approach } from "@/lib/content";
import { Section } from "@/components/section";

export function Approach() {
  return (
    <Section
      id="approach"
      index="04"
      eyebrow="Engineering"
      title="How the work is put together."
      intro="Four habits that show up across the apps."
      className="bg-paper-deep/60"
    >
      <ol className="grid gap-px bg-line sm:grid-cols-2">
        {approach.map((item) => (
          <li key={item.index} className="rise bg-paper p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
              {item.index}
            </p>
            <h3 className="mt-4 font-serif text-[1.7rem] leading-tight tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
