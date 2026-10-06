import { projects, type Project } from "@/lib/content";
import { Section } from "@/components/section";

function ProjectArticle({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  if (!project.featured) {
    return (
      <article className="rise grid gap-5 border-t border-line py-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.16em] text-mute">
            {number}
            <span className="px-2" aria-hidden>
              —
            </span>
            {project.period}
          </p>
          <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-mute">
            {project.kind}
            <span className="px-2 text-line-strong" aria-hidden>
              /
            </span>
            {project.role}
          </p>
        </div>
        <div className="lg:col-span-8">
          <p className="leading-relaxed text-ink">{project.summary}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            {project.problem} {project.contribution}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            {project.functionality.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article className="rise border-t border-line py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
            {number}
            <span className="px-2" aria-hidden>
              —
            </span>
            {project.period}
          </p>
          <h3 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-[2.75rem]">
            {project.name}
          </h3>
          <p className="mt-3 text-sm text-mute">{project.kind}</p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                Role
              </dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            {project.links?.map((link) => (
              <div key={link.href}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                  Link
                </dt>
                <dd className="mt-1">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {link.label}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <p className="text-lg leading-relaxed text-ink">{project.summary}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                Problem
              </h4>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                Contribution
              </h4>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {project.contribution}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
              What it does
            </h4>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.functionality.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section
      id="work"
      index="03"
      eyebrow="Selected work"
      title="Products with a job to do."
      intro="Current product work, a graduation project in healthcare, community tools for a scout group, and the first Flutter apps."
      layout="stack"
    >
      <div>
        {featured.map((project, index) => (
          <ProjectArticle key={project.name} project={project} index={index} />
        ))}
      </div>

      <div className="mt-16 md:mt-24">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
          Further work
        </h3>
        <div className="mt-2">
          {more.map((project, index) => (
            <ProjectArticle
              key={project.name}
              project={project}
              index={featured.length + index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
