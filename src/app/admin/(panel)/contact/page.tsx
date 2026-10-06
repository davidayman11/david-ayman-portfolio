import { saveContact } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, profile, section] = await Promise.all([
    searchParams,
    prisma.profile.findUnique({ where: { id: "default" } }),
    prisma.section.findUnique({ where: { key: "contact" } }),
  ]);
  if (!profile) return <p className="text-sm text-mute">Seed the database before editing contact details.</p>;

  return (
    <>
      <PageHeader title="Contact" description="Email, phone, and the public profiles shown at the bottom of the site." />
      <SavedNote saved={saved} />
      <ResourceForm
        action={saveContact}
        values={{
          eyebrow: section?.eyebrow ?? "Contact",
          title: section?.title ?? "",
          intro: section?.intro ?? "",
          extra: section?.extra ?? "",
          email: profile.email,
          phoneDisplay: profile.phoneDisplay,
          phoneHref: profile.phoneHref,
          linkedinUrl: profile.linkedinUrl,
          linkedinLabel: profile.linkedinLabel,
          githubUrl: profile.githubUrl,
          githubLabel: profile.githubLabel,
          websiteUrl: profile.websiteUrl,
          websiteLabel: profile.websiteLabel,
        }}
        fields={[
          { name: "eyebrow", label: "Eyebrow", required: true },
          { name: "title", label: "Title", required: true },
          { name: "intro", label: "Intro", type: "textarea", rows: 4 },
          { name: "extra", label: "Button label", hint: "Example: Email David Ayman" },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phoneDisplay", label: "Phone", required: true },
          { name: "phoneHref", label: "Phone link", required: true, hint: "Example: tel:+201200779554" },
          { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
          { name: "linkedinLabel", label: "LinkedIn label" },
          { name: "githubUrl", label: "GitHub URL", type: "url" },
          { name: "githubLabel", label: "GitHub label" },
          { name: "websiteUrl", label: "Website URL", type: "url" },
          { name: "websiteLabel", label: "Website label" },
        ]}
      />
    </>
  );
}
