"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, ChevronDown, ChevronUp } from "lucide-react";
import { readConsent, writeConsent, clearConsent, CONSENT_KEY } from "@/lib/consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const c = readConsent();
    if (c.timestamp === 0) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
    setAnalytics(c.analytics);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) {
        const c = readConsent();
        if (c.timestamp > 0) setShow(false);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function acceptAll() {
    writeConsent(true);
    setShow(false);
    setManage(false);
  }
  function rejectNonEssential() {
    writeConsent(false);
    setShow(false);
    setManage(false);
  }
  function savePreferences() {
    writeConsent(analytics);
    setShow(false);
    setManage(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-[70] w-[min(26rem,calc(100vw-2rem))] sm:bottom-5 sm:left-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden rounded-xl border border-navy/15 bg-background shadow-2xl"
      >
        <div className="flex items-start gap-3 border-b border-navy/10 bg-cloud px-5 py-4">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy text-teal">
            <Cookie className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-sm font-bold text-ink">Cookies & privacy</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              This site sets zero cookies. We use essential browser storage to run the site. With your permission, we also collect anonymous analytics to improve it. No marketing trackers. No tracking pixels.{" "}
              <Link href="/cookies" className="font-medium text-teal hover:underline">Read the policy</Link>.
            </p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {manage && (
            <motion.div
              key="manage"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-b border-navy/10"
            >
              <div className="space-y-3 px-5 py-4">
                <CookieToggle label="Necessary" desc="Required for the site to function. Always on." checked disabled />
                <CookieToggle label="Analytics" desc="Anonymous, aggregated events (page views, clicks). No browser cookies, no PII stored." checked={analytics} onChange={setAnalytics} />
                <CookieToggle label="Marketing" desc="Not used. We don't run any marketing or advertising trackers." checked={false} disabled />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center">
          <button type="button" onClick={rejectNonEssential} className="h-10 flex-1 rounded-md border border-navy/15 px-4 text-sm font-semibold text-ink-soft transition-colors hover:border-navy/30 hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40">
            Reject non-essential
          </button>
          <button type="button" onClick={acceptAll} className="h-10 flex-1 rounded-md bg-teal px-4 text-sm font-semibold text-navy transition-colors hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40">
            Accept all
          </button>
        </div>
        <div className="flex items-center justify-between border-t border-navy/10 bg-cloud px-5 py-2.5">
          <button type="button" onClick={() => { setManage((v) => !v); setAnalytics(readConsent().analytics); }} className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft transition-colors hover:text-teal">
            {manage ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            Manage preferences
          </button>
          {manage && (
            <button type="button" onClick={savePreferences} className="font-mono-tech text-[10px] uppercase tracking-widest text-teal transition-colors hover:text-navy">
              Save preferences
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CookieToggle({ label, desc, checked, disabled, onChange }: { label: string; desc: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; }) {
  return (
    <label className={"flex items-start gap-3 rounded-md p-2 " + (disabled ? "opacity-70" : "cursor-pointer hover:bg-cloud")}>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className="peer sr-only" />
        <span className={"flex h-5 w-9 items-center rounded-full p-0.5 transition-colors " + (checked ? "bg-teal" : "bg-navy/15")}>
          <span className={"size-4 rounded-full bg-white shadow transition-transform " + (checked ? "translate-x-4" : "translate-x-0")} />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-sm font-semibold text-ink">
          {label}
          {checked && <Check className="ml-1 inline size-3 text-teal" aria-hidden />}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{desc}</span>
      </span>
    </label>
  );
}

export function resetConsent() {
  clearConsent();
  window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_KEY, newValue: null }));
}
