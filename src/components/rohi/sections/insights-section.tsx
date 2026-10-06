"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, Container, SectionHeader } from "../section-primitives";

const TOPICS = [
  {
    tag: "Systems",
    title: "When standard software stops fitting the business",
    desc: "How to recognize the moment custom systems become the better investment — and how to scope them without overbuilding.",
    state: "Planned",
  },
  {
    tag: "Automation",
    title: "Workflows that should not depend on one person",
    desc: "Identifying the repetitive, rule-based work that automation removes cleanly — and the work it should not touch.",
    state: "Planned",
  },
  {
    tag: "AI",
    title: "Where AI actually improves the work",
    desc: "A practical framework for deciding where intelligence belongs in a system — and where it only adds noise.",
    state: "Planned",
  },
  {
    tag: "Data",
    title: "Dashboards people actually use",
    desc: "Why most dashboards are unread — and how to build operational visibility around real decisions.",
    state: "Planned",
  },
  {
    tag: "Strategy",
    title: "From services to recurring technology",
    desc: "How an African technology company can structure itself to build products, not just projects.",
    state: "Planned",
  },
  {
    tag: "Efficiency",
    title: "The cost of fragmented information",
    desc: "What disconnected tools actually cost an organization — beyond the obvious time lost.",
    state: "Planned",
  },
];

export function InsightsSection() {
  return (
    <Section id="insights" tone="cloud" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="13"
          eyebrow="Insights"
          heading={
            <>
              How ROHI thinks
              <br />
              about the work.
            </>
          }
          lede="Insights will explain complex technology clearly, demonstrate expertise and support decisions — not chase traffic. Topics are planned; writing is in progress."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="group relative flex flex-col gap-4 rounded-xl border border-navy/10 bg-background p-6 transition-colors hover:border-navy/20"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-navy/10 bg-cloud px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                  {t.tag}
                </span>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-teal">
                  {t.state}
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold leading-snug tracking-[-0.01em] text-ink">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {t.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-2">
                <span className="text-sm font-medium text-ink-soft/60">
                  Coming soon
                </span>
                <ArrowUpRight className="size-4 text-ink-soft/40" />
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
          Fig. 12 — Planned insights, written as the work continues
        </p>
      </Container>
    </Section>
  );
}
