import Link from "next/link";
import { SkillEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewSkillPage() {
  return (
    <>
      <PageHeader title="New skill" />
      <Link href="/admin/skills" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <SkillEditor skill={null} />
    </>
  );
}
