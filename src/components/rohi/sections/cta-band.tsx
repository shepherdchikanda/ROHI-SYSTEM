"use client";

import { motion } from "framer-motion";
import { Section, Container, Eyebrow } from "../section-primitives";
import { RohiButton } from "../rohi-button";

/**
 * Closing CTA band — used at the bottom of content pages to guide
 * visitors toward /contact.
 */
export function CtaBand({
  eyebrow = "Next step",
  heading = "Have a business problem worth solving?",
  lede = "Tell us what you're trying to improve. We start by understanding the problem — not by sending a quote.",
  ctaLabel = "Start a Conversation",
  href = "/contact",
}: {
  eyebrow?: string;
  heading?: string;
  lede?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <Section tone="navy" className="overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-navy-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
        aria-hidden
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <Eyebrow tone="teal">{eyebrow}</Eyebrow>
          <h2 className="font-sans text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            {lede}
          </p>
          <div className="mt-2">
            <RohiButton href={href} variant="primary" size="lg">
              {ctaLabel}
            </RohiButton>
          </div>
          <p className="mt-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
            We start by understanding the problem.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
