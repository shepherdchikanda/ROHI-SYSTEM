"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, Container, Eyebrow } from "../section-primitives";
import { RohiButton } from "../rohi-button";

const FOCUS = [
  "Business requirements",
  "Workflows",
  "Roles & permissions",
  "Data model & integrity",
  "Integrations",
  "Architecture",
  "Intelligence where it fits",
  "Scalability",
];

export function CustomSystemsSection() {
  return (
    <Section id="custom-systems" tone="navy" className="overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 bg-navy-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-teal/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-7">
            <Eyebrow tone="teal">Custom Systems</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 font-sans text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
            >
              Your business does not have to adapt to software that was never
              designed for it.
            </motion.h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              ROHI designs and builds technology around actual organizational
              processes — not the other way around. Every project may use only
              one capability, several, or all of them. There is no fixed
              architecture.
            </p>
            <div className="mt-9">
              <RohiButton href="/contact" variant="primary" size="lg">
                Start a Conversation
              </RohiButton>
            </div>
          </div>

          {/* Right — focus list */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                What we scope around
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {FOCUS.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2.5 text-sm text-white/85"
                  >
                    <Check className="size-4 shrink-0 text-teal" strokeWidth={2} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
            <p className="mt-4 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
              Fig. 10 — Custom systems engineering scope
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
