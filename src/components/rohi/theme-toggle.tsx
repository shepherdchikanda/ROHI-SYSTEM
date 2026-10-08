"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dark mode toggle — appears in the header on desktop.
 * Avoids hydration mismatch by rendering a placeholder until mounted.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes mounted pattern — must read after hydration to avoid mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  // Gate ALL theme-dependent output behind `mounted` so the server render
  // and the first client render produce identical markup. Without this,
  // next-themes resolves `theme` from localStorage before hydration, making
  // aria-label/title differ between server and client → hydration mismatch.
  const ariaLabel = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";
  const title = mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:text-navy hover:bg-navy/5 outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40",
        className,
      )}
      aria-label={ariaLabel}
      title={title}
      suppressHydrationWarning
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {isDark ? (
              <Sun className="size-4" strokeWidth={1.8} />
            ) : (
              <Moon className="size-4" strokeWidth={1.8} />
            )}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}
