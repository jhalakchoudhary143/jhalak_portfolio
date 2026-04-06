"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer theme control until client hydration (avoids flash / mismatch with next-themes).
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
