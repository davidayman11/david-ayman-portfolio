import Link from "next/link";
import { notFound } from "next/navigation";
import { EducationEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditEducationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const item = await prisma.education.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit education" />
      <SavedNote saved={saved} />
      <Link href="/admin/education" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <EducationEditor item={item} />
    </>
  );
}
