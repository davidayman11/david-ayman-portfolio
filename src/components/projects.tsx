import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

function AppIcon({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="size-28 shrink-0 overflow-hidden border border-line bg-paper-deep sm:size-32">
      {src ? (
        <img src={src} alt={`${name} app icon`} className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center px-2 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-mute">
          App icon
        </div>
      )}
    </div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
      <path d="M16.37 12.72c.02 2.18 1.91 2.9 1.93 2.91-.02.05-.3 1.03-.99 2.04-.6.87-1.22 1.74-2.2 1.76-.96.02-1.27-.57-2.37-.57s-1.45.55-2.36.59c-.94.04-1.66-.94-2.26-1.81-1.23-1.78-2.17-5.03-.91-7.23.63-1.09 1.75-1.78 2.97-1.8.93-.02 1.8.62 2.37.62.57 0 1.64-.77 2.76-.66.47.02 1.79.19 2.64 1.43-.07.04-1.57.92-1.58 2.72zM14.7 6.7c.5-.6.84-1.44.75-2.28-.72.03-1.6.48-2.12 1.08-.46.54-.87 1.4-.76 2.22.81.06 1.64-.41 2.13-1.02z" />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
      <path d="M17.6 9.48 19.44 6.3c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ProjectLinks({
  project,
}: {
  project: Pick<Portfolio["projects"][number], "appleUrl" | "androidUrl" | "projectUrl" | "githubUrl">;
}) {
  if (!project.appleUrl && !project.androidUrl && !project.projectUrl && !project.githubUrl) return null;

  const iconClass =
    "inline-flex size-12 items-center justify-center border border-line text-ink transition-colors hover:border-ink";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {project.appleUrl ? (
        <a href={project.appleUrl} target="_blank" rel="noopener noreferrer" aria-label="App Store" className={iconClass}>
          <AppleMark />
        </a>
      ) : null}
      {project.androidUrl ? (
        <a
          href={project.androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
          className={iconClass}
        >
          <AndroidMark />
        </a>
      ) : null}
      {project.projectUrl ? (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center border border-line px-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
        >
          Project
        </a>
      ) : null}
      {project.githubUrl ? (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClass}>
          <GitHubMark />
        </a>
      ) : null}
    </div>
  );
}

function ProjectArticle({
  project,
  index,
}: {
  project: Portfolio["projects"][number];
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  if (!project.featured) {
    return (
      <article className="rise grid gap-5 border-t border-line py-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.16em] text-mute">
            {number}
            <span className="px-2" aria-hidden>
              —
            </span>
            {project.period}
          </p>
          <div className="mt-4 flex items-start gap-4">
            <AppIcon src={project.imageUrl} name={project.name} />
            <div className="min-w-0">
              <h3 className="font-serif text-3xl tracking-[-0.03em]">{project.name}</h3>
              <p className="mt-2 text-sm text-mute">
                {project.kind}
                <span className="px-2 text-line-strong" aria-hidden>
                  /
                </span>
                {project.role}
              </p>
            </div>
          </div>
          <ProjectLinks project={project} />
        </div>
        <div className="lg:col-span-7">
          <p className="leading-relaxed text-ink">{project.summary}</p>
          {project.problem || project.contribution ? (
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              {project.problem} {project.contribution}
            </p>
          ) : null}
          {project.functionality.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
              {project.functionality.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {project.technologies.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="rise border-t border-line py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
            {number}
            <span className="px-2" aria-hidden>
              —
            </span>
            {project.period}
          </p>
          <div className="mt-4 flex items-start gap-4">
            <AppIcon src={project.imageUrl} name={project.name} />
            <div className="min-w-0">
              <h3 className="font-serif text-4xl tracking-[-0.03em] md:text-[2.75rem]">{project.name}</h3>
              <p className="mt-3 text-sm text-mute">{project.kind}</p>
            </div>
          </div>
          <ProjectLinks project={project} />

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
          </dl>

          {project.technologies.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink">{project.summary}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {project.problem ? (
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Problem</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{project.problem}</p>
              </div>
            ) : null}
            {project.contribution ? (
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Contribution</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{project.contribution}</p>
              </div>
            ) : null}
          </div>
          {project.functionality.length > 0 ? (
            <div className="mt-8">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">What it does</h4>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.functionality.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Projects({
  section,
  projects,
}: {
  section: Portfolio["workSection"];
  projects: Portfolio["projects"];
}) {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section id="work" index="03" eyebrow={section.eyebrow} title={section.title} intro={section.intro} layout="stack">
      {projects.length === 0 ? (
        <p className="border-t border-line py-8 text-sm text-mute">No projects yet.</p>
      ) : (
        <>
          <div>
            {featured.map((project, index) => (
              <ProjectArticle key={project.id} project={project} index={index} />
            ))}
          </div>
          {more.length > 0 ? (
            <div className="mt-16 md:mt-24">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Further work</h3>
              <div className="mt-2">
                {more.map((project, index) => (
                  <ProjectArticle key={project.id} project={project} index={featured.length + index} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </Section>
  );
}
