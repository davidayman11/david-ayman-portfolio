import Link from "next/link";
import { notFound } from "next/navigation";
import { ApproachEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditApproachPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const item = await prisma.approachItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit note" />
      <SavedNote saved={saved} />
      <Link href="/admin/approach" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ApproachEditor item={item} />
    </>
  );
}
