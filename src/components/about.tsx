import { about } from "@/lib/content";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="Profile"
      title="Mobile products, built as software."
    >
      <div className="rise space-y-5 text-[17px] leading-relaxed text-ink-soft">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="rise mt-10 grid grid-cols-2 border-t border-line sm:grid-cols-4">
        {about.notes.map((note) => (
          <div key={note.label} className="border-b border-line py-4 pr-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
              {note.label}
            </dt>
            <dd className="mt-2 text-sm leading-snug text-ink">{note.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
