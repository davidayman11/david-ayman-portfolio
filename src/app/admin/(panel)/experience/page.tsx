import { deleteExperience, moveExperience } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.section.findUnique({ where: { key: "experience" } }),
  ]);

  return (
    <>
      <PageHeader
        title="Experience"
        description="Roles on the timeline. Up and down change the order."
        action={{ href: "/admin/experience/new", label: "Add experience" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="experience"
        returnTo="/admin/experience"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
      />
      <RecordList
        searchPlaceholder="Search experience"
        empty="No experience yet."
        reorder
        moveAction={moveExperience}
        deleteAction={deleteExperience}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/experience/${item.id}`,
          title: item.position,
          meta: `${item.company} · ${item.dates}`,
          search: `${item.company} ${item.technologies.join(" ")}`,
          badge: item.current ? "Current" : undefined,
        }))}
      />
    </>
  );
}
