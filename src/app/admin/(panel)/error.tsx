"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1 className="font-serif text-4xl tracking-[-0.03em]">The admin could not be loaded.</h1>
      <p className="mt-3 text-sm text-mute">Check the database connection, then try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-11 items-center border border-ink px-4 text-sm"
      >
        Try again
      </button>
    </div>
  );
}
