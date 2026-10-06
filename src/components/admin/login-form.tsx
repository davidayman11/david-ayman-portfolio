"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { initialState } from "@/lib/action-state";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block" htmlFor="email">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Email</span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
      <label className="block" htmlFor="password">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Password</span>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm"
        />
      </label>
      {state.message ? (
        <p role="alert" className="border border-red-900/20 bg-red-50 px-3 py-2 text-sm text-red-900">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
