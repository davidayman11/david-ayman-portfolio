import { profile } from "@/lib/content";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}?subject=Hello%20David`,
  },
  {
    label: "Phone",
    value: profile.phoneDisplay,
    href: profile.phoneHref,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="inverse scroll-mt-24 bg-inverse text-paper"
    >
      <div className="mx-auto w-full max-w-[72rem] px-5 py-20 sm:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-inverse-muted">
            07
          </span>
          <span className="h-px w-8 bg-white/20" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-inverse-muted">
            Contact
          </span>
        </div>

        <h2
          id="contact-title"
          className="mt-8 max-w-[14ch] font-serif text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.04em]"
        >
          Tell me what you are building.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-inverse-muted">
          I am open to a role, a product conversation, or a closer look at the
          work. Based in Cairo.
        </p>

        <a
          href={`mailto:${profile.email}?subject=Hello%20David`}
          className="mt-10 inline-flex min-h-12 items-center border border-paper bg-paper px-5 text-sm text-inverse transition-colors hover:bg-transparent hover:text-paper"
        >
          Email {profile.shortName}
        </a>

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

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-inverse-muted">
          <span>{profile.location}</span>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/25 underline-offset-4 hover:decoration-paper"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
