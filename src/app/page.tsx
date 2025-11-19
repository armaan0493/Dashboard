import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center sm:items-start sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium uppercase tracking-[0.18em] text-slate-300">
            Secure Auth Demo
          </span>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Full-stack Auth Dashboard
          </h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            A modern authentication experience built with Next.js 14 App Router,
            NextAuth.js, MongoDB, and Tailwind CSS. Sign up, manage your
            profile, and access a protected dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm sm:flex-row">
          <Link
            className="flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/40 transition hover:brightness-110"
            href="/signup"
          >
            Get started
          </Link>
          <Link
            className="flex h-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/60 px-6 text-sm font-medium text-slate-100 transition hover:bg-slate-800/80"
            href="/login"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
