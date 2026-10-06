import Link from "next/link";
import { PageHeader } from "@/components/admin/shell";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const [projects, experiences, skills, settings, latest] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.skill.count(),
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, name: true, updatedAt: true },
    }),
  ]);

  const updated = settings
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(
        settings.lastContentUpdate,
      )
    : "Not yet";

  const cards = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Experience", value: experiences, href: "/admin/experience" },
    { label: "Skills", value: skills, href: "/admin/skills" },
  ];

  return (
    <>
      <PageHeader title="Overview" description="Changes here publish to the portfolio immediately." />
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-paper p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{card.label}</p>
            <p className="mt-3 font-serif text-5xl tracking-[-0.04em]">{card.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-mute">Last updated {updated}</p>
      <h2 className="mt-10 font-serif text-2xl tracking-[-0.03em]">Recently edited projects</h2>
      {latest.length === 0 ? (
        <p className="mt-4 text-sm text-mute">No projects yet.</p>
      ) : (
        <ul className="mt-4 border-t border-line">
          {latest.map((project) => (
            <li key={project.id} className="border-b border-line py-3">
              <Link href={`/admin/projects/${project.id}`} className="text-sm">
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
