import Link from "next/link";
import { CertificationEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewCertificationPage() {
  return (
    <>
      <PageHeader title="New certification" />
      <Link href="/admin/certifications" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <CertificationEditor item={null} />
    </>
  );
}
