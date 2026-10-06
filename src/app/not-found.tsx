import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="content"
      className="mx-auto flex min-h-svh w-full max-w-xl flex-col justify-center px-5 pt-24"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.04em]">
        This page is not part of the site.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 w-fit items-center border border-ink px-5 text-sm"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
