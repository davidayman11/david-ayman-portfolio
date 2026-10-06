import Link from "next/link";
import { EducationEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewEducationPage() {
  return (
    <>
      <PageHeader title="New education" />
      <Link href="/admin/education" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <EducationEditor item={null} />
    </>
  );
}
