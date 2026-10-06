"use client";

import { motion } from "framer-motion";
import { Section, Container, SectionHeader, Eyebrow } from "../section-primitives";

const PILLARS = [
  {
    label: "Purpose",
    text: "To make organizations more capable through technology.",
  },
  {
    label: "Mission",
    text: "To turn real business problems into intelligent business systems that make organizations simpler, smarter and more effective.",
  },
  {
    label: "Vision",
    text: "To build the intelligent systems that power the future of business.",
  },
  {
    label: "Philosophy",
    text: "From Complexity to Clarity. Technology should make organizations more capable, not more complicated.",
  },
];

const BELIEFS = [
  "We turn complex business processes into technology that works.",
  "We build technology built around the way your business actually works.",
  "We understand first. We add intelligence where it creates value.",
  "Complexity belongs inside the system — not in the user's experience.",
];

export function AboutSection() {
  return (
    <Section id="about" tone="light" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="12"
          eyebrow="About ROHI"
          heading={
            <>
              From Complexity to Clarity.
            </>
          }
          lede="ROHI exists to make organizations more capable through technology — not technology for its own sake. The company is the brand. The founders are leaders. The work is what matters."
        />

        {/* Pillars */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="bg-background p-7"
            >
              <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
                {p.label}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Beliefs + origin */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow tone="navy">What ROHI believes</Eyebrow>
            <ul className="mt-6 space-y-5">
              {BELIEFS.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 border-l border-teal/40 pl-4"
                >
                  <span className="font-mono-tech text-xs font-medium tracking-widest text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-ink">{b}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-navy/10 bg-cloud p-8">
              <Eyebrow tone="navy">Where ROHI is from</Eyebrow>
              <p className="mt-4 font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-ink">
                Built in Mozambique. Capable of serving modern organizations
                anywhere.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                The company originates in Mozambique and carries local
                credibility — including familiarity with M-Pesa, e-Mola, M-Kesh,
                METIX, WhatsApp Business, SAF-T and local business requirements.
                These are examples of local relevance, not the company&apos;s
                identity.
              </p>
              <p className="mt-6 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                Local relevance · Global ambition
              </p>
            </div>
          </div>
        </div>

        {/* Trajectory */}
        <div className="mt-14 rounded-xl border border-navy/10 bg-cloud p-8 sm:p-10">
          <Eyebrow tone="navy">Where ROHI is going</Eyebrow>
          <p className="mt-4 max-w-3xl font-sans text-lg font-semibold leading-snug text-ink">
            An Africa-first technology company, designed to evolve from
            services into intelligent systems, recurring technology and
            products — without losing clarity or restraint.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span className="text-teal">Services</span>
            <span aria-hidden>→</span>
            <span>Intelligent Systems</span>
            <span aria-hidden>→</span>
            <span>Recurring Technology</span>
            <span aria-hidden>→</span>
            <span>Products</span>
            <span aria-hidden>→</span>
            <span>African technology company</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
