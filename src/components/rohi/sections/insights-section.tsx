"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, Container, SectionHeader } from "../section-primitives";
import { PUBLISHED_INSIGHTS } from "@/lib/insights";

// Remaining planned topics (not yet published)
const PLANNED_TOPICS = [
  {
    tag: "Automation",
    title: "Workflows that should not depend on one person",
    desc: "Identifying the repetitive, rule-based work that automation removes cleanly — and the work it should not touch.",
  },
  {
    tag: "Data",
    title: "Dashboards people actually use",
    desc: "Why most dashboards are unread — and how to build operational visibility around real decisions.",
  },
  {
    tag: "Strategy",
    title: "From services to recurring technology",
    desc: "How an African technology company can structure itself to build products, not just projects.",
  },
];

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function InsightsSection() {
  return (
    <Section
      id="insights"
      tone="cloud"
      className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
    >
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
          lede="Insights explain complex technology clearly, demonstrate expertise and support decisions — not chase traffic. More are written as the work continues."
        />

        {/* Published articles */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLISHED_INSIGHTS.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/insights/${a.slug}`}
                className="group flex h-full flex-col gap-4 rounded-xl border border-navy/10 bg-background p-6 transition-colors hover:border-teal/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-navy/10 bg-cloud px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                    {a.tag}
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-teal">
                    {a.readingTime}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold leading-snug tracking-[-0.01em] text-ink group-hover:text-teal">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {a.summary}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/50">
                    {fmtDate(a.date)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:text-teal">
                    Read
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}

          {/* Planned topics */}
          {PLANNED_TOPICS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (PUBLISHED_INSIGHTS.length + i) * 0.06,
                ease: "easeOut",
              }}
              className="group relative flex h-full flex-col gap-4 rounded-xl border border-dashed border-navy/15 bg-background/60 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-navy/10 bg-cloud px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                  {t.tag}
                </span>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/50">
                  Planned
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold leading-snug tracking-[-0.01em] text-ink">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {t.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-2">
                <span className="text-sm font-medium text-ink-soft/50">
                  Coming soon
                </span>
                <ArrowUpRight className="size-4 text-ink-soft/30" />
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
          Fig. 12 — Published insights + planned topics, written as the work
          continues
        </p>
      </Container>
    </Section>
  );
}
