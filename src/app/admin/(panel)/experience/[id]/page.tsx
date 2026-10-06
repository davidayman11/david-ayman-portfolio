import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditExperiencePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();

  return (
    <>
      <PageHeader title="Edit experience" />
      <SavedNote saved={saved} />
      <Link href="/admin/experience" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ExperienceEditor experience={experience} />
    </>
  );
}
