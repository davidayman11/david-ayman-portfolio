import { skillGroups, skillNote } from "@/lib/content";
import { Section } from "@/components/section";

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Stack"
      title="What I use, grouped the way the work uses it."
      intro="Languages from the degree and the diploma. Mobile, data, and backend tools from the products and the training that produced them."
    >
      <div className="rise grid border-t border-l border-line sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-r border-b border-line p-6 sm:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
              {group.label}
            </h3>
            <p className="mt-4 font-serif text-[1.65rem] leading-[1.25] tracking-[-0.03em]">
              {group.items.join("  /  ")}
            </p>
          </div>
        ))}
      </div>
      <p className="rise mt-6 max-w-3xl text-sm leading-relaxed text-mute">
        {skillNote}
      </p>
    </Section>
  );
}
