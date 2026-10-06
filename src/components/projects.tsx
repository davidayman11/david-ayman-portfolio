import type { Portfolio } from "@/lib/portfolio";
import { Section } from "@/components/section";

function AppIcon({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="size-16 shrink-0 overflow-hidden border border-line bg-paper-deep">
      {src ? (
        <img src={src} alt={`${name} app icon`} className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center px-1 text-center font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-mute">
          App icon
        </div>
      )}
    </div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M16.37 12.72c.02 2.18 1.91 2.9 1.93 2.91-.02.05-.3 1.03-.99 2.04-.6.87-1.22 1.74-2.2 1.76-.96.02-1.27-.57-2.37-.57s-1.45.55-2.36.59c-.94.04-1.66-.94-2.26-1.81-1.23-1.78-2.17-5.03-.91-7.23.63-1.09 1.75-1.78 2.97-1.8.93-.02 1.8.62 2.37.62.57 0 1.64-.77 2.76-.66.47.02 1.79.19 2.64 1.43-.07.04-1.57.92-1.58 2.72zM14.7 6.7c.5-.6.84-1.44.75-2.28-.72.03-1.6.48-2.12 1.08-.46.54-.87 1.4-.76 2.22.81.06 1.64-.41 2.13-1.02z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M4.5 3.8v16.4c0 .7.8 1.1 1.4.7l12.2-8.2c.5-.4.5-1.1 0-1.5L5.9 3.1c-.6-.4-1.4 0-1.4.7z" />
    </svg>
  );
}

function StoreLinks({ appleUrl, androidUrl }: { appleUrl: string; androidUrl: string }) {
  if (!appleUrl && !androidUrl) return null;

  const itemClass =
    "inline-flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink";

  return (
    <div className="mt-4 flex gap-2">
      {appleUrl ? (
        <a href={appleUrl} target="_blank" rel="noopener noreferrer" aria-label="App Store" className={itemClass}>
          <AppleMark />
        </a>
      ) : null}
      {androidUrl ? (
        <a
          href={androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Play"
          className={itemClass}
        >
          <PlayMark />
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
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4">
            <AppIcon src={project.imageUrl} name={project.name} />
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-mute">
                {number}
                <span className="px-2" aria-hidden>
                  —
                </span>
                {project.period}
              </p>
              <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{project.name}</h3>
              <p className="mt-2 text-sm text-mute">
                {project.kind}
                <span className="px-2 text-line-strong" aria-hidden>
                  /
                </span>
                {project.role}
              </p>
            </div>
          </div>
          <StoreLinks appleUrl={project.appleUrl} androidUrl={project.androidUrl} />
        </div>
        <div className="lg:col-span-8">
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
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4">
            <AppIcon src={project.imageUrl} name={project.name} />
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
                {number}
                <span className="px-2" aria-hidden>
                  —
                </span>
                {project.period}
              </p>
              <h3 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-[2.75rem]">{project.name}</h3>
              <p className="mt-3 text-sm text-mute">{project.kind}</p>
            </div>
          </div>
          <StoreLinks appleUrl={project.appleUrl} androidUrl={project.androidUrl} />

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

        <div className="lg:col-span-8">
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
