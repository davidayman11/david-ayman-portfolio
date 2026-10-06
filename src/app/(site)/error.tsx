"use client";

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col justify-center px-5">
      <h1 className="font-serif text-5xl tracking-[-0.04em]">The portfolio could not be loaded.</h1>
      <p className="mt-4 text-ink-soft">The content database did not respond.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-12 w-fit items-center border border-ink px-5 text-sm"
      >
        Try again
      </button>
    </main>
  );
}
