"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setError(data.message ?? "Failed to create account");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!result || result.error) {
        setError(result?.error ?? "Account created, but login failed");
        setLoading(false);
        return;
      }

      router.push(result.url ?? "/dashboard");
    } catch (err) {
      console.error("Signup error", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError(null);
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-6 shadow-xl shadow-black/60 backdrop-blur-sm sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold text-white sm:text-3xl">
          Create your account
        </h1>
        <p className="mb-6 text-center text-sm text-slate-300">
          Join to access your personal dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-medium text-slate-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
              placeholder="Your name"
            />
          </div>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-[11px] text-slate-400">
          <div className="h-px flex-1 bg-white/10" />
          <span>or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-100 transition hover:bg-white/10"
        >
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-sky-400 hover:text-sky-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
