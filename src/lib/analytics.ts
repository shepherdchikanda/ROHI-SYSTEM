/**
 * Privacy-friendly analytics helper.
 * Fires events to /api/track — no cookies, no PII.
 * Respects cookie consent: events are only recorded when the visitor
 * has explicitly accepted analytics.
 */
import { analyticsAllowed } from "@/lib/consent";

export function track(name: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!analyticsAllowed()) return;
  const page = window.location.pathname;
  try {
    const body = JSON.stringify({ name, page, payload });
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/track", blob);
      if (ok) return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export function trackCta(label: string, href?: string): void {
  track("cta_click", { label, href });
}
