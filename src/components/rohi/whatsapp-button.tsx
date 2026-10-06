"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { track } from "@/lib/analytics";

/**
 * WhatsApp Business floating button.
 * Stacks ABOVE the ROHI AI assistant button (bottom-right).
 * Hides when the chat panel is open (so it doesn't sit under it).
 * Opens wa.me with a prefilled message in a new tab.
 *
 * NOTE: WhatsApp number is a PLACEHOLDER in src/lib/site-config.ts
 * — replace with the real business number when available.
 */
export function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Detect chat panel open state via DOM observation
  useEffect(() => {
    const check = () =>
      setChatOpen(
        !!document.querySelector(
          '[role="dialog"][aria-label="ROHI AI assistant"]',
        ),
      );
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  function handleOpen() {
    track("whatsapp_click", { source: "floating_button" });
    window.open(whatsappLink(), "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence>
      {!chatOpen && (
        <motion.div
          key="whatsapp"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-5 z-[60] sm:bottom-24"
        >
          <div className="relative flex flex-col items-center">
            {/* Hover hint (to the left of the button) */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-1/2 right-16 mb-1 hidden w-56 rounded-lg border border-navy/10 bg-background p-3 shadow-lg sm:block"
                >
                  <p className="font-sans text-sm font-semibold text-ink">
                    Chat on WhatsApp
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    Prefer to talk directly? Message the ROHI team — we
                    usually reply during business hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleOpen}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              aria-label="Chat with ROHI on WhatsApp"
              className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#25D366]/40"
              style={{ width: 52, height: 52 }}
            >
              <MessageCircle className="size-6" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
