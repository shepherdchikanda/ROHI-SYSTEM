"use client";

import { motion } from "framer-motion";
import { Section, Container, SectionHeader } from "../section-primitives";

const PRINCIPLES = [
  {
    n: "01",
    title: "Business First",
    desc: "We begin with the problem, not the technology. Understanding comes before architecture, and architecture before tools.",
  },
  {
    n: "02",
    title: "Built Around You",
    desc: "The system reflects how the organization actually operates — not how software assumed it should.",
  },
  {
    n: "03",
    title: "Practical Intelligence",
    desc: "We use AI and data where they create meaningful value. Not everywhere. Not for its own sake.",
  },
  {
    n: "04",
    title: "Engineering Depth",
    desc: "We build systems designed to work reliably in the real world — not demos that impress once.",
  },
  {
    n: "05",
    title: "Long-Term Thinking",
    desc: "We design technology that can evolve with the organization, not lock it into a moment in time.",
  },
  {
    n: "06",
    title: "Simplicity",
    desc: "Complexity belongs inside the system — not in the user's experience. The hard work stays hidden.",
  },
];

export function WhyRohiSection() {
  return (
    <Section id="why" tone="light" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="08"
          eyebrow="Why ROHI"
          heading={
            <>
              Six principles.
              <br />
              One way of working.
            </>
          }
          lede="ROHI is not a list of services. It is an approach to technology that puts the organization first and the tools in their place."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="group relative flex flex-col gap-4 bg-background p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono-tech text-sm font-medium tracking-widest text-teal">
                  {p.n}
                </span>
                <span className="h-px flex-1 bg-navy/10" aria-hidden />
              </div>
              <h3 className="font-sans text-xl font-bold tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {p.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
