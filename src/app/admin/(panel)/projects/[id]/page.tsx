import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <PageHeader title="Edit project" />
      <SavedNote saved={saved} />
      <Link href="/admin/projects" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ProjectEditor project={project} />
    </>
  );
}
