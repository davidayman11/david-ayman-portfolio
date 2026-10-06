import { deleteSkill, moveSkill } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.section.findUnique({ where: { key: "skills" } }),
  ]);
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  return (
    <>
      <PageHeader
        title="Skills"
        description="Grouped by category. Up and down reorder skills inside the same category."
        action={{ href: "/admin/skills/new", label: "Add skill" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="skills"
        returnTo="/admin/skills"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
        extra={section?.extra ?? ""}
        noteLabel="Note"
      />
      <RecordList
        searchPlaceholder="Search skills"
        empty="No skills yet."
        filters={categories}
        reorder
        moveAction={moveSkill}
        deleteAction={deleteSkill}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/skills/${item.id}`,
          title: item.name,
          meta: item.category,
          search: `${item.category} ${item.icon}`,
          filter: item.category,
        }))}
      />
    </>
  );
}
