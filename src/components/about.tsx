import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

export function About({
  about,
  paragraphs,
}: {
  about: Portfolio["about"];
  paragraphs: string[];
}) {
  return (
    <Section id="about" index="01" eyebrow={about.eyebrow} title={about.title} intro={about.intro}>
      {paragraphs.length === 0 ? (
        <p className="text-sm text-mute">The profile has not been written yet.</p>
      ) : (
        <div className="rise space-y-5 text-[17px] leading-relaxed text-ink-soft">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {about.highlights.length > 0 ? (
        <dl className="rise mt-10 grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {about.highlights.map((note) => (
            <div key={note.label} className="border-b border-line py-4 pr-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{note.label}</dt>
              <dd className="mt-2 text-sm leading-snug text-ink">{note.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}
