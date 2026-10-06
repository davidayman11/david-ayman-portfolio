import { nav, profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-inverse text-inverse-muted">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm">
          <span className="text-paper">{profile.name}</span>
          <span className="px-2" aria-hidden>
            /
          </span>
          Software Engineer
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#education" className="hover:text-paper">
                Education
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
