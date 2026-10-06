import { deleteProject, moveProject } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";
import { mediaPath } from "@/lib/media";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] }),
    prisma.section.findUnique({ where: { key: "work" } }),
  ]);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Add a photo or app icon later, and paste App Store or Google Play links when you have them. Icons appear on the site only after a link is saved."
        action={{ href: "/admin/projects/new", label: "Add project" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="work"
        returnTo="/admin/projects"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
      />
      <RecordList
        searchPlaceholder="Search projects"
        empty="No projects yet."
        filters={["All", "Featured", "Other"]}
        reorder
        moveAction={moveProject}
        deleteAction={deleteProject}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/projects/${item.id}`,
          title: item.name,
          meta: `${item.kind} · ${item.period}`,
          search: `${item.role} ${item.technologies.join(" ")} ${item.summary}`,
          badge: item.featured ? "Featured" : undefined,
          filter: item.featured ? "Featured" : "Other",
          thumb: mediaPath(item.imageId),
        }))}
      />
    </>
  );
}
