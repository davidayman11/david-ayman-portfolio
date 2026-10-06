"use client";

import { useEffect, useState } from "react";

export function SiteHeader({
  shortName,
  cvHref,
  nav,
}: {
  shortName: string;
  cvHref: string | null;
  nav: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-[72rem] items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="font-serif text-lg tracking-[-0.03em] text-ink" onClick={() => setOpen(false)}>
          {shortName}
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] text-ink-soft transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
          {cvHref ? (
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-3 py-1.5 text-[13px] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              CV
            </a>
          ) : null}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 items-center px-1 text-[13px] tracking-[0.14em] uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-paper px-5 py-6 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  className="flex min-h-12 items-center font-serif text-3xl tracking-[-0.03em]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {cvHref ? (
              <li className="pt-5">
                <a
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border border-ink px-4 text-sm"
                  onClick={() => setOpen(false)}
                >
                  View CV
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
