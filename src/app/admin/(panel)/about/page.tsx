import { saveAbout } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

function highlightText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const record = item as { label?: unknown; value?: unknown };
      if (typeof record.label !== "string" || typeof record.value !== "string") return [];
      return [`${record.label} | ${record.value}`];
    })
    .join("\n");
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, section, about] = await Promise.all([
    searchParams,
    prisma.section.findUnique({ where: { key: "about" } }),
    prisma.about.findUnique({ where: { id: "default" } }),
  ]);

  return (
    <>
      <PageHeader title="About" description="The profile heading and the short highlight row." />
      <SavedNote saved={saved} />
      <ResourceForm
        action={saveAbout}
        values={{
          eyebrow: section?.eyebrow ?? "",
          title: section?.title ?? "",
          intro: section?.intro ?? "",
          highlights: highlightText(about?.highlights),
        }}
        fields={[
          { name: "eyebrow", label: "Eyebrow", required: true },
          { name: "title", label: "Title", required: true },
          { name: "intro", label: "Intro", type: "textarea", rows: 3 },
          {
            name: "highlights",
            label: "Highlights",
            type: "textarea",
            rows: 6,
            hint: "One per line: Label | Value",
          },
        ]}
      />
    </>
  );
}
