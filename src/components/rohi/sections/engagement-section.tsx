"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Section,
  Container,
  SectionHeader,
  Eyebrow,
} from "../section-primitives";

/**
 * ROHI SYSTEMS — Engagement page sections.
 *
 * Explains the commercial model and what working with ROHI looks like —
 * WITHOUT revealing internal pricing, margins, complexity scores, or
 * confidential commercial strategy. No invented clients, metrics, or
 * delivery guarantees.
 */

/* -------------------------------------------------------------------------- */
/* Block 1 — Intro                                                            */
/* -------------------------------------------------------------------------- */

const INTRO_SUMMARY = [
  {
    k: "Commercial model",
    v: "How engagement scales with the problem — not a fixed service menu.",
  },
  {
    k: "Engagement lifecycle",
    v: "What working together looks like, from first conversation to long-term partner.",
  },
  {
    k: "How we approach scope",
    v: "Scoped around complexity, requirements and outcomes — not public pricing.",
  },
];

export function EngagementIntroSection() {
  return (
    <Section
      id="engagement"
      tone="navy"
      className="overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      <div className="absolute inset-0 bg-navy-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-teal/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeader
          number="01"
          eyebrow="Engagement"
          tone="light"
          heading={<>How we work with clients.</>}
          lede="Every engagement starts with understanding — not a quote. Here is what working with ROHI typically looks like, and how the commercial model is shaped around the problem."
        />

        {/* What this page covers */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] sm:grid-cols-3">
          {INTRO_SUMMARY.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="bg-navy-soft/40 p-7"
            >
              <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
                {s.k}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {s.v}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
          Fig. 11 — Engagement: commercial model + lifecycle
        </p>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Block 2 — Commercial model                                                 */
/* -------------------------------------------------------------------------- */

const STAGES = [
  {
    n: "01",
    title: "Standardized Solutions",
    desc: "Repeatable solutions for common, well-understood problems.",
  },
  {
    n: "02",
    title: "Intelligent Systems",
    desc: "Custom systems combining engineering, AI, automation and data.",
  },
  {
    n: "03",
    title: "Recurring Services",
    desc: "Ongoing technology partnership — maintenance, improvement, evolution.",
  },
  {
    n: "04",
    title: "Products",
    desc: "Focused products that solve specific problems at scale (e.g. FIMS).",
  },
];

export function EngagementModelSection() {
  return (
    <Section id="commercial-model" tone="cloud" className="py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-cloud-grid opacity-60" aria-hidden />
      <Container className="relative">
        <SectionHeader
          number="02"
          eyebrow="Commercial model"
          heading={
            <>
              A model that scales
              <br />
              with the problem.
            </>
          }
          lede="ROHI does not offer a fixed catalogue of services. The engagement scales with the problem — from repeatable solutions to focused products — and is shaped around what the work actually requires."
        />

        {/* Horizontal progression of 4 stage cards */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="relative flex flex-col gap-4 bg-background p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono-tech text-sm font-medium tracking-widest text-teal">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-navy/10" aria-hidden />
              </div>
              <h3 className="font-sans text-lg font-bold tracking-[-0.01em] text-ink">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{s.desc}</p>

              {/* Progression arrow between cards (lg only) */}
              {i < STAGES.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-background text-teal lg:flex"
                  aria-hidden
                >
                  <ChevronRight className="size-3.5" strokeWidth={2.5} />
                </span>
              )}
            </motion.article>
          ))}
        </div>

        {/* Trajectory line — mirrors About page pattern, reinforces progression */}
        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          <span className="text-teal">Standardized</span>
          <span aria-hidden>→</span>
          <span>Intelligent</span>
          <span aria-hidden>→</span>
          <span>Recurring</span>
          <span aria-hidden>→</span>
          <span>Products</span>
        </div>

        {/* Scoping note — confidentiality stance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 rounded-xl border border-navy/10 bg-background p-7 sm:p-8"
        >
          <Eyebrow tone="navy">How ROHI scopes</Eyebrow>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink">
            Every organization is different. ROHI scopes solutions around the
            complexity, requirements and outcomes of the problem — not a
            fixed service menu.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Internal pricing, complexity scoring and margins are not public.
            A scoped proposal is only possible after the work is understood.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Block 3 — Engagement lifecycle (vertical timeline)                        */
/* -------------------------------------------------------------------------- */

const PHASES = [
  {
    n: "01",
    title: "First conversation",
    desc: "You describe what you're trying to improve. We listen first.",
  },
  {
    n: "02",
    title: "Discovery",
    desc: "We understand the organization, people, processes, information and actual problem.",
  },
  {
    n: "03",
    title: "Solution design",
    desc: "We design the right system — architecture, data, workflows, experience.",
  },
  {
    n: "04",
    title: "Proposal",
    desc: "A scoped proposal: what we'd build, how, and the investment involved.",
  },
  {
    n: "05",
    title: "Build",
    desc: "We engineer the technology, introducing AI/automation/data where they create value.",
  },
  {
    n: "06",
    title: "Launch & improve",
    desc: "The system goes live. We measure, learn and continuously improve.",
  },
];

export function EngagementLifecycleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="lifecycle" tone="light" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="03"
          eyebrow="Engagement lifecycle"
          heading={
            <>
              From first conversation
              <br />
              to long-term partner.
            </>
          }
          lede="Working with ROHI follows a clear sequence — but the depth of each phase depends on the problem. Nothing is promised before the work is understood."
        />

        {/* Vertical timeline */}
        <div ref={ref} className="relative mt-16">
          {/* Track */}
          <div
            className="absolute left-[1.625rem] top-0 h-full w-px bg-navy/10 sm:left-12"
            aria-hidden
          />
          {/* Progress fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[1.625rem] top-0 w-px bg-teal sm:left-12"
            aria-hidden
          />

          <ol className="space-y-10 sm:space-y-12">
            {PHASES.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
                className="relative grid gap-4 pl-12 sm:pl-20 lg:grid-cols-12 lg:gap-8 lg:pl-24"
              >
                {/* Node marker on the track */}
                <span
                  className="absolute left-0 top-0 flex size-13 items-center justify-center sm:left-4"
                  aria-hidden
                >
                  <span className="size-3 rounded-full border-2 border-teal bg-background" />
                </span>

                {/* Step number + title */}
                <div className="lg:col-span-4">
                  <span className="font-mono-tech text-sm font-medium tracking-widest text-teal">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-sans text-2xl font-bold tracking-[-0.01em] text-ink sm:text-3xl">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-8">
                  <p className="text-base leading-relaxed text-ink-soft">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Honest-scope note — no premature promises */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 rounded-xl border border-dashed border-navy/15 bg-cloud/60 p-6"
        >
          <p className="text-sm leading-relaxed text-ink-soft">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Honest scope
            </span>
            <span className="mt-2 block">
              ROHI does not promise delivery dates, exact costs or guaranteed
              ROI before understanding the work. Each phase is shaped by what
              the problem actually requires.
            </span>
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
