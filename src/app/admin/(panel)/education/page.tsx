import { deleteEducation, moveEducation } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EducationPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.section.findUnique({ where: { key: "education" } }),
  ]);

  return (
    <>
      <PageHeader
        title="Education"
        action={{ href: "/admin/education/new", label: "Add education" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="education"
        returnTo="/admin/education"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
      />
      <RecordList
        searchPlaceholder="Search education"
        empty="No education yet."
        reorder
        moveAction={moveEducation}
        deleteAction={deleteEducation}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/education/${item.id}`,
          title: item.degree,
          meta: `${item.institution} · ${item.dates}`,
          search: item.description,
        }))}
      />
    </>
  );
}
