"use client";

import { motion } from "framer-motion";
import { Section, Container, SectionHeader } from "../section-primitives";

const PROBLEMS = [
  {
    title: "Fragmented information",
    desc: "The same data lives in five places, none of them the right one.",
  },
  {
    title: "Manual workflows",
    desc: "Skilled people spend hours on work the system should handle.",
  },
  {
    title: "Disconnected tools",
    desc: "Software that does not talk to other software.",
  },
  {
    title: "Slow reporting",
    desc: "Decisions wait for numbers that arrive too late.",
  },
  {
    title: "Duplicated work",
    desc: "The same task performed across teams, slightly differently.",
  },
  {
    title: "Process depends on people",
    desc: "Knowledge walks out the door when someone leaves.",
  },
  {
    title: "Software that doesn't fit",
    desc: "Standard tools forcing the organization to adapt to them.",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" tone="cloud" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — heading */}
          <div className="lg:col-span-5">
            <SectionHeader
              number="01"
              eyebrow="The Problem"
              heading={
                <>
                  Business gets complicated.
                  <br />
                  Your technology shouldn&apos;t.
                </>
              }
              lede="Most organizations do not have a software problem. They have a structure problem — processes that grew faster than the systems supporting them."
            />
          </div>

          {/* Right — problem list with fragmentation visual */}
          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-lg border border-navy/10 bg-navy/5 sm:grid-cols-2">
              {PROBLEMS.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="group relative bg-background p-6"
                >
                  {/* Fragmentation marker — broken connection */}
                  <div className="flex items-center gap-2" aria-hidden>
                    <span className="size-2 rounded-sm bg-navy/20" />
                    <span className="h-px w-5 bg-navy/15 [background-image:repeating-linear-gradient(90deg,currentColor_0,currentColor_2px,transparent_2px,transparent_4px)] bg-none" style={{ backgroundImage: "repeating-linear-gradient(90deg,rgba(11,18,32,0.25) 0,rgba(11,18,32,0.25) 2px,transparent 2px,transparent 4px)" }} />
                    <span className="size-2 rounded-sm bg-navy/20" />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
              Fig. 02 — Disconnected operational state
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
