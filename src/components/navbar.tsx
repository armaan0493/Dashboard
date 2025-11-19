"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded bg-gradient-to-r from-indigo-500 to-sky-500 px-2 py-1 text-xs font-semibold text-white">
            Auth
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Dashboard App
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {status === "loading" ? null : session ? (
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/dashboard"
                className="rounded-md px-2 py-1 text-xs font-medium text-foreground/80 hover:bg-foreground/5 sm:text-sm"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="rounded-md px-2 py-1 text-xs font-medium text-foreground/80 hover:bg-foreground/5 sm:text-sm"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="ml-1 rounded-full border border-foreground/10 px-3 py-1 text-xs font-medium text-foreground/80 transition hover:bg-foreground hover:text-background sm:text-sm"
              >
                Logout
              </button>
            </nav>
          ) : !isAuthPage ? (
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/login"
                className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-medium text-foreground/80 transition hover:bg-foreground hover:text-background sm:text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:brightness-110 sm:inline-block sm:text-sm"
              >
                Sign up
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
