"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Scroll progress bar (thin teal line under the header) +
 * back-to-top button (appears after scrolling).
 */
export function ScrollUtilities() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Progress bar — fixed at top, above the header border */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-teal"
        style={{ scaleX }}
      />
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 left-5 z-[60] flex size-11 items-center justify-center rounded-full border border-navy/15 bg-background text-navy shadow-lg transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
            aria-label="Back to top"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
