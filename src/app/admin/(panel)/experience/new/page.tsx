import Link from "next/link";
import { ExperienceEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewExperiencePage() {
  return (
    <>
      <PageHeader title="New experience" />
      <Link href="/admin/experience" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ExperienceEditor experience={null} />
    </>
  );
}
