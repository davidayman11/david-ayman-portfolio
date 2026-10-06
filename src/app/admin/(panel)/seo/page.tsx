import { saveSeo } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";
import { mediaPath } from "@/lib/media";

export default async function SeoPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, seo] = await Promise.all([
    searchParams,
    prisma.seo.findUnique({ where: { id: "default" } }),
  ]);
  if (!seo) return <p className="text-sm text-mute">Seed the database before editing SEO.</p>;

  return (
    <>
      <PageHeader title="SEO" description="The title and description used when the site is shared or indexed." />
      <SavedNote saved={saved} />
      <ResourceForm
        action={saveSeo}
        preview={seo.ogImageId ? { src: mediaPath(seo.ogImageId) ?? "", alt: "Open Graph image" } : null}
        values={{ metaTitle: seo.metaTitle, metaDescription: seo.metaDescription }}
        fields={[
          { name: "metaTitle", label: "Meta title", required: true },
          { name: "metaDescription", label: "Meta description", type: "textarea", rows: 4, required: true },
          {
            name: "image",
            label: "Open Graph image",
            type: "file",
            accept: "image/jpeg,image/png,image/webp",
            hint: "Optional. A generated card is used until you upload one.",
          },
        ]}
      />
    </>
  );
}
