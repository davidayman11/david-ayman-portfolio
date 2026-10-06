"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { logout } from "@/actions/auth";

const links = [
  ["/admin", "Overview"],
  ["/admin/profile", "Profile"],
  ["/admin/hero", "Hero"],
  ["/admin/about", "About"],
  ["/admin/experience", "Experience"],
  ["/admin/projects", "Projects"],
  ["/admin/skills", "Skills"],
  ["/admin/education", "Education"],
  ["/admin/certifications", "Certifications"],
  ["/admin/approach", "Approach"],
  ["/admin/contact", "Contact"],
  ["/admin/seo", "SEO"],
  ["/admin/settings", "Settings"],
] as const;

export function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-svh bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Private</p>
            <p className="font-serif text-2xl tracking-[-0.03em]">Portfolio admin</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-mute">{email}</span>
            <Link href="/" className="underline decoration-line-strong underline-offset-4">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="min-h-11 underline decoration-line-strong underline-offset-4">
                Log out
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Admin" className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto px-5 pb-3">
          {links.map(([href, label]) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center border px-3 text-sm ${
                  active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="mx-auto w-full max-w-5xl px-5 py-8">{children}</div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-4xl tracking-[-0.03em]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{description}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="inline-flex min-h-11 items-center border border-ink px-4 text-sm">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

const savedCopy: Record<string, string> = {
  "1": "Saved.",
  photo: "Photo updated.",
  cv: "CV uploaded.",
};

export function SavedNote({ saved }: { saved?: string }) {
  const message = saved ? savedCopy[saved] : undefined;
  if (!message) return null;
  return (
    <p role="status" className="mb-6 border border-signal/40 bg-signal/10 px-3 py-2 text-sm">
      {message}
    </p>
  );
}
