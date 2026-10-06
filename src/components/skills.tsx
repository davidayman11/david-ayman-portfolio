import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

export function Skills({
  section,
  groups,
}: {
  section: Portfolio["skillsSection"];
  groups: Portfolio["skillGroups"];
}) {
  return (
    <Section id="skills" index="05" eyebrow={section.eyebrow} title={section.title} intro={section.intro}>
      {groups.length === 0 ? (
        <p className="border-t border-line py-8 text-sm text-mute">No skills yet.</p>
      ) : (
        <div className="rise grid border-t border-l border-line sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label} className="border-r border-b border-line p-6 sm:p-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{group.label}</h3>
              <p className="mt-4 font-serif text-[1.65rem] leading-[1.25] tracking-[-0.03em]">
                {group.items.map((item) => item.name).join("  /  ")}
              </p>
            </div>
          ))}
        </div>
      )}
      {section.note ? <p className="rise mt-6 max-w-3xl text-sm leading-relaxed text-mute">{section.note}</p> : null}
    </Section>
  );
}
