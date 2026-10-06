import { saveHero } from "@/actions/singletons";
import { ResourceForm } from "@/components/admin/resource-form";
import { PageHeader, SavedNote } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, hero] = await Promise.all([
    searchParams,
    prisma.hero.findUnique({ where: { id: "default" } }),
  ]);
  if (!hero) return <p className="text-sm text-mute">Seed the database before editing the hero.</p>;

  return (
    <>
      <PageHeader
        title="Hero"
        description="The first screen: name, introduction, buttons, and facts. The portrait is edited on Profile."
      />
      <SavedNote saved={saved} />
      <ResourceForm
        action={saveHero}
        values={{
          headingLine1: hero.headingLine1,
          headingLine2: hero.headingLine2,
          subheading: hero.subheading,
          primaryCtaLabel: hero.primaryCtaLabel,
          primaryCtaHref: hero.primaryCtaHref,
          secondaryCtaLabel: hero.secondaryCtaLabel,
          secondaryCtaHref: hero.secondaryCtaHref,
          fact1Label: hero.fact1Label,
          fact1Value: hero.fact1Value,
          fact1Detail: hero.fact1Detail,
          fact2Label: hero.fact2Label,
          fact2Value: hero.fact2Value,
          fact2Detail: hero.fact2Detail,
          fact3Label: hero.fact3Label,
          fact3Value: hero.fact3Value,
          fact3Detail: hero.fact3Detail,
        }}
        fields={[
          { name: "headingLine1", label: "Heading", required: true },
          { name: "headingLine2", label: "Heading, second line" },
          { name: "subheading", label: "Subheading", type: "textarea", rows: 4, required: true },
          { name: "primaryCtaLabel", label: "Primary button label", required: true },
          { name: "primaryCtaHref", label: "Primary button link", required: true, hint: "Example: #work" },
          { name: "secondaryCtaLabel", label: "Secondary button label", required: true },
          { name: "secondaryCtaHref", label: "Secondary button link", required: true },
          { name: "fact1Label", label: "Fact 1 label" },
          { name: "fact1Value", label: "Fact 1 value" },
          { name: "fact1Detail", label: "Fact 1 detail" },
          { name: "fact2Label", label: "Fact 2 label" },
          { name: "fact2Value", label: "Fact 2 value" },
          { name: "fact2Detail", label: "Fact 2 detail" },
          { name: "fact3Label", label: "Fact 3 label" },
          { name: "fact3Value", label: "Fact 3 value" },
          { name: "fact3Detail", label: "Fact 3 detail" },
        ]}
      />
    </>
  );
}
