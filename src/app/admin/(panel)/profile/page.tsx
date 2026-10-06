import { saveProfile } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { PortraitForm, ResumeForm } from "@/components/admin/uploads";
import { prisma } from "@/lib/db";
import { mediaPath } from "@/lib/media";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, profile, hero] = await Promise.all([
    searchParams,
    prisma.profile.findUnique({ where: { id: "default" } }),
    prisma.hero.findUnique({ where: { id: "default" }, select: { portraitPosition: true, imageId: true } }),
  ]);

  if (!profile) {
    return <p className="text-sm text-mute">Seed the database before editing the profile.</p>;
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Change the homepage photo, upload a new CV, then edit the written profile."
      />
      <SavedNote saved={saved} />
      <div className="mb-10 grid gap-4">
        <PortraitForm
          src={mediaPath(profile.imageId ?? hero?.imageId)}
          position={hero?.portraitPosition ?? 18}
        />
        <ResumeForm resumeUrl={mediaPath(profile.resumeId)} />
      </div>
      <ResourceForm
        action={saveProfile}
        values={{
          name: profile.name,
          shortName: profile.shortName,
          jobTitle: profile.jobTitle,
          focus: profile.focus,
          shortBio: profile.shortBio,
          longBio: profile.longBio,
          location: profile.location,
        }}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "shortName", label: "Short name", required: true },
          { name: "jobTitle", label: "Job title", required: true },
          { name: "focus", label: "Focus", required: true },
          { name: "location", label: "Location", required: true },
          {
            name: "shortBio",
            label: "Short bio",
            type: "textarea",
            rows: 4,
            required: true,
            hint: "Shown under your name on the homepage.",
          },
          {
            name: "longBio",
            label: "Long bio",
            type: "textarea",
            rows: 12,
            required: true,
            hint: "Profile section. Separate paragraphs with a blank line.",
          },
        ]}
      />
    </>
  );
}
