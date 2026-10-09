"use client";

import { motion } from "framer-motion";
import { Section, Container, SectionHeader } from "../section-primitives";
import { RohiButton } from "../rohi-button";

const PATTERNS = [
  { n: "01", title: "Your information is fragmented", desc: "The same data lives in five places. Decisions wait for numbers that arrive late. No one trusts the source of truth — because there isn't one.", direction: "Business system + data consolidation" },
  { n: "02", title: "Your team is drowning in manual work", desc: "Skilled people spend hours on work the system should handle — approvals, copying data, assembling reports. The cost is quiet, but constant.", direction: "Automation" },
  { n: "03", title: "Standard software doesn't fit how you work", desc: "You've adapted your process to the tool, not the other way around. The workarounds have become the process.", direction: "Custom systems" },
  { n: "04", title: "You can't see what's actually happening", desc: "Operations are opaque until something goes wrong. By the time the numbers arrive, the moment has passed.", direction: "Data + visibility" },
];

export function IsThisYouSection() {
  return (
    <Section id="is-this-you" tone="cloud" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader number="02" eyebrow="Is this you?" heading={<>Recognize your situation?</>} lede="Most organizations don't start with a software problem. They start with a process that grew faster than the systems supporting it. If any of these sound familiar, you're in the right place." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2">
          {PATTERNS.map((p, i) => (
            <motion.article key={p.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }} className="group flex flex-col gap-4 bg-background p-7 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono-tech text-sm font-medium tracking-widest text-teal">{p.n}</span>
                <span className="h-px flex-1 bg-navy/10" aria-hidden />
              </div>
              <h3 className="font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              <p className="mt-auto pt-2 font-mono-tech text-[11px] uppercase tracking-widest text-ink-soft/60">→ {p.direction}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">Not sure where you sit? Take the 90-second operations maturity assessment — you'll get your stage and the biggest opportunity for your situation.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RohiButton href="/assessment" variant="solidNavy" size="lg">Take the assessment</RohiButton>
            <RohiButton href="/contact" variant="outline" size="lg" withArrow={false}>Talk to ROHI instead</RohiButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
