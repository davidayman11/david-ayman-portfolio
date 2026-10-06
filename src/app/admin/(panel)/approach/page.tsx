import { deleteApproach, moveApproach } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function ApproachPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.approachItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.section.findUnique({ where: { key: "approach" } }),
  ]);

  return (
    <>
      <PageHeader
        title="Approach"
        action={{ href: "/admin/approach/new", label: "Add note" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="approach"
        returnTo="/admin/approach"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
      />
      <RecordList
        searchPlaceholder="Search notes"
        empty="No engineering notes yet."
        reorder
        moveAction={moveApproach}
        deleteAction={deleteApproach}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/approach/${item.id}`,
          title: item.title,
          meta: item.body.slice(0, 90),
          search: item.body,
        }))}
      />
    </>
  );
}
