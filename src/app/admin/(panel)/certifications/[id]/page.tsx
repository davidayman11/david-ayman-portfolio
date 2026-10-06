import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificationEditor } from "@/components/admin/editors";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function EditCertificationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const item = await prisma.certification.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit certification" />
      <SavedNote saved={saved} />
      <Link href="/admin/certifications" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <CertificationEditor item={item} />
    </>
  );
}
