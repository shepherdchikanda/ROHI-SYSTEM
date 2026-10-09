"use client";

import { resetConsent } from "./cookie-consent";

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className={
        "font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-teal " +
        (className ?? "")
      }
    >
      Cookie preferences
    </button>
  );
}
