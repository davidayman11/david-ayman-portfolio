import { deleteCertification, moveCertification } from "@/actions/records";
import { RecordList } from "@/components/admin/record-list";
import { SectionEditor } from "@/components/admin/section-editor";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function CertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, items, section] = await Promise.all([
    searchParams,
    prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.section.findUnique({ where: { key: "certifications" } }),
  ]);

  return (
    <>
      <PageHeader
        title="Certifications"
        description="The public site shows this section after the first certification is added."
        action={{ href: "/admin/certifications/new", label: "Add certification" }}
      />
      <SavedNote saved={saved} />
      <SectionEditor
        sectionKey="certifications"
        returnTo="/admin/certifications"
        eyebrow={section?.eyebrow ?? ""}
        title={section?.title ?? ""}
        intro={section?.intro ?? ""}
      />
      <RecordList
        searchPlaceholder="Search certifications"
        empty="No certifications yet."
        reorder
        moveAction={moveCertification}
        deleteAction={deleteCertification}
        items={items.map((item) => ({
          id: item.id,
          href: `/admin/certifications/${item.id}`,
          title: item.name,
          meta: `${item.issuer} · ${item.date}`,
          search: item.link,
        }))}
      />
    </>
  );
}
