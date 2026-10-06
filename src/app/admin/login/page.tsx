import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Private</p>
      <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em]">Admin</h1>
      <p className="mt-3 text-sm leading-relaxed text-mute">
        Sign in to edit the portfolio. This area is not part of the public site.
      </p>
      <LoginForm />
    </main>
  );
}
