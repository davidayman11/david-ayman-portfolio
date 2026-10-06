import Link from "next/link";
import { ProjectEditor } from "@/components/admin/editors";
import { PageHeader } from "@/components/admin/shell";

export default function NewProjectPage() {
  return (
    <>
      <PageHeader title="New project" />
      <Link href="/admin/projects" className="mb-6 inline-block text-sm underline underline-offset-4">
        Back
      </Link>
      <ProjectEditor project={null} />
    </>
  );
}
