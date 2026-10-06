/**
 * Privacy-friendly analytics helper.
 * Fires events to /api/track — no cookies, no PII.
 * Usage: `import { track } from "@/lib/analytics"; track("cta_click", { label: "hero" });`
 */
export function track(
  name: string,
  payload?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const page = window.location.pathname;
  // Use sendBeacon when available so it survives page unload/navigation
  try {
    const body = JSON.stringify({ name, page, payload });
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/track", blob);
      if (ok) return;
    }
    // Fallback to fetch (no await — fire-and-forget)
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore — analytics must never break UX */
  }
}

/** Convenience: track a CTA click with its label/destination. */
export function trackCta(label: string, href?: string): void {
  track("cta_click", { label, href });
}
