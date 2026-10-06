import type { Portfolio } from "@/lib/portfolio";

export function Contact({
  contact,
  profile,
  index,
}: {
  contact: Portfolio["contact"];
  profile: Portfolio["profile"];
  index: string;
}) {
  const channels = [
    profile.email
      ? { label: "Email", value: profile.email, href: `mailto:${profile.email}?subject=Hello`, external: false }
      : null,
    profile.phoneDisplay
      ? { label: "Phone", value: profile.phoneDisplay, href: profile.phoneHref, external: false }
      : null,
    profile.linkedinUrl
      ? {
          label: "LinkedIn",
          value: profile.linkedinLabel || "LinkedIn",
          href: profile.linkedinUrl,
          external: true,
        }
      : null,
    profile.githubUrl
      ? { label: "GitHub", value: profile.githubLabel || "GitHub", href: profile.githubUrl, external: true }
      : null,
    profile.websiteUrl
      ? {
          label: "Website",
          value: profile.websiteLabel || profile.websiteUrl,
          href: profile.websiteUrl,
          external: true,
        }
      : null,
  ].filter((channel) => channel !== null);

  return (
    <section id="contact" aria-labelledby="contact-title" className="inverse scroll-mt-24 bg-inverse text-paper">
      <div className="mx-auto w-full max-w-[72rem] px-5 py-20 sm:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-inverse-muted">{index}</span>
          <span className="h-px w-8 bg-white/20" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-inverse-muted">
            {contact.eyebrow || "Contact"}
          </span>
        </div>
        <h2
          id="contact-title"
          className="mt-8 max-w-[14ch] font-serif text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.04em]"
        >
          {contact.title}
        </h2>
        {contact.intro ? (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inverse-muted">{contact.intro}</p>
        ) : null}
        {profile.email ? (
          <a
            href={`mailto:${profile.email}?subject=Hello`}
            className="mt-10 inline-flex min-h-12 items-center border border-paper bg-paper px-5 text-sm text-inverse transition-colors hover:bg-transparent hover:text-paper"
          >
            {contact.ctaLabel || `Email ${profile.shortName}`}
          </a>
        ) : null}
        {channels.length === 0 ? (
          <p className="mt-10 text-sm text-inverse-muted">Contact details have not been added yet.</p>
        ) : (
          <ul className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-white/15 py-5 lg:border-b-0 lg:pr-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-inverse-muted">
                  {channel.label}
                </p>
                <a
                  href={channel.href}
                  className="mt-2 block break-all text-[15px] underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-paper"
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer me" }
                    : { rel: "me" })}
                >
                  {channel.value}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-inverse-muted">
          {profile.location ? <span>{profile.location}</span> : null}
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/25 underline-offset-4 hover:decoration-paper"
            >
              Download CV
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
