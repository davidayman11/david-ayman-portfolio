import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

export function Certifications({
  section,
  items,
}: {
  section: Portfolio["certificationSection"];
  items: Portfolio["certifications"];
}) {
  if (items.length === 0) return null;

  return (
    <Section
      id="certifications"
      index="07"
      eyebrow={section.eyebrow || "Certifications"}
      title={section.title || "Certifications"}
      intro={section.intro}
    >
      <ol className="border-t border-line">
        {items.map((item) => (
          <li key={item.id} className="rise grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8">
            <p className="font-mono text-xs tracking-wide text-mute md:col-span-4">
              <time>{item.date}</time>
            </p>
            <div className="md:col-span-8">
              <h3 className="font-serif text-2xl tracking-[-0.03em]">{item.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.issuer}</p>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm underline decoration-line-strong underline-offset-4"
                >
                  View certificate
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
