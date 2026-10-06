import Link from "next/link";
import { notFound } from "next/navigation";
import { SkillEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditSkillPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  return (
    <>
      <PageHeader title="Edit skill" />
      <SavedNote saved={saved} />
      <Link href="/admin/skills" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <SkillEditor skill={skill} />
    </>
  );
}
