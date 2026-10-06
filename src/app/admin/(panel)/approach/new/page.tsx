import Link from "next/link";
import { ApproachEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewApproachPage() {
  return (
    <>
      <PageHeader title="New note" />
      <Link href="/admin/approach" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ApproachEditor item={null} />
    </>
  );
}
