"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * App Router `template.tsx` — wraps every route's children.
 * Provides a subtle, fast page transition (fade + slight rise)
 * keyed by pathname so navigation feels like a cohesive product.
 *
 * Motion is restrained per brand: no dramatic transitions,
 * no parallax, no flashy effects — just a clean 0.25s fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
