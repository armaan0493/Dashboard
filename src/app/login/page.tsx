"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-foreground">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-6 text-center text-sm text-slate-300">
            Loading login...
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!result || result.error) {
      setError(result?.error ?? "Invalid email or password");
      return;
    }

    router.push(result.url ?? "/dashboard");
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);
    await signIn("google", { callbackUrl });
    setLoading(false);
  }

  const heading = "Welcome back";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl shadow-black/60 backdrop-blur-sm sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold text-white sm:text-3xl">
          {heading}
        </h1>
        <p className="mb-6 text-center text-sm text-slate-300">
          Sign in to access your dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-[11px] text-slate-400">
          <div className="h-px flex-1 bg-white/10" />
          <span>or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-100 transition hover:bg-white/10"
        >
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-slate-400">
          New here?{" "}
          <Link href="/signup" className="font-medium text-sky-400 hover:text-sky-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
