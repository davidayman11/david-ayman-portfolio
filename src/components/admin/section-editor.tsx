import { saveSection } from "@/actions/singletons";
import { ResourceForm, type FieldConfig } from "@/components/admin/resource-form";

export function SectionEditor({
  sectionKey,
  returnTo,
  eyebrow,
  title,
  intro,
  extra = "",
  noteLabel,
}: {
  sectionKey: string;
  returnTo: string;
  eyebrow: string;
  title: string;
  intro: string;
  extra?: string;
  noteLabel?: string;
}) {
  const fields: FieldConfig[] = [
    { name: "eyebrow", label: "Eyebrow", required: true },
    { name: "title", label: "Title", required: true },
    { name: "intro", label: "Intro", type: "textarea", rows: 3 },
  ];
  if (noteLabel) {
    fields.push({ name: "extra", label: noteLabel, type: "textarea", rows: 4 });
  }

  return (
    <details className="mb-8 border border-line p-4">
      <summary className="cursor-pointer text-sm">Section heading</summary>
      <div className="mt-5">
        <ResourceForm
          action={saveSection}
          hidden={{ sectionKey, returnTo }}
          values={{ eyebrow, title, intro, extra }}
          fields={fields}
        />
      </div>
    </details>
  );
}
