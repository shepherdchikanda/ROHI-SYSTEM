"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/analytics";

/**
 * Newsletter subscribe form — used on the Insights page.
 * Posts to /api/subscribe. Stores email in the Subscriber table.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v || status === "loading") return;
    setStatus("loading");
    track("newsletter_submit");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, source: "insights", website: honeypot }),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus("error");
      void data;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-navy/10 bg-background p-7 sm:p-9">
      <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-7">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
            Insights, occasionally
          </span>
          <h3 className="mt-3 font-sans text-2xl font-bold tracking-[-0.01em] text-ink sm:text-3xl">
            Get notified when we publish.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            No spam, no newsletters-for-the-sake-of-it. When we publish a
            genuine piece on systems, automation, AI or data, you&apos;ll hear
            about it. Unsubscribe anytime.
          </p>
        </div>
        <div className="sm:col-span-5">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-lg border border-teal/40 bg-teal/5 p-4"
              >
                <Check className="size-5 text-teal" />
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">
                    You&apos;re on the list.
                  </p>
                  <p className="text-xs text-ink-soft">
                    We&apos;ll only write when there&apos;s something worth
                    reading.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="flex flex-col gap-2"
              >
                <label
                  htmlFor="newsletter-email"
                  className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-ink-soft"
                >
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-11 flex-1 rounded-md border border-navy/15 bg-cloud px-3.5 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-teal/60 focus:ring-[3px] focus:ring-teal/20"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !email.trim()}
                    className="flex h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:opacity-40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Subscribe</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-500">
                    Couldn&apos;t subscribe. Please try again or email us
                    directly.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
