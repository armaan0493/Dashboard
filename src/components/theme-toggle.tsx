"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background text-xs text-foreground/70 shadow-sm transition hover:bg-foreground hover:text-background sm:h-9 sm:w-9"
      aria-label="Toggle theme"
    >
      <span className="hidden sm:inline-block">{isDark ? "🌙" : "☀️"}</span>
      <span className="sm:hidden">{isDark ? "D" : "L"}</span>
    </button>
  );
}
