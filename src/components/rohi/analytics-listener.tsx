"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Global, delegation-based analytics listener.
 * - Tracks clicks on any element with [data-slot="rohi-button"] → cta_click
 * - Tracks page views on route change → page_view
 * No per-component wiring needed. Privacy-friendly: no cookies, no PII.
 */
export function AnalyticsListener() {
  const pathname = usePathname();

  // Page view on route change
  useEffect(() => {
    track("page_view");
  }, [pathname]);

  // Delegated click tracking for CTAs
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-slot='rohi-button']",
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      const label = (target.textContent ?? "").trim().slice(0, 80);
      track("cta_click", { href, label });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
