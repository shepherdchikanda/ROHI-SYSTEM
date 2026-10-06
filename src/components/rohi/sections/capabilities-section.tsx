"use client";

import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Workflow, BarChart3 } from "lucide-react";
import { Section, Container, SectionHeader } from "../section-primitives";

const CAPABILITIES = [
  {
    icon: Boxes,
    label: "Systems",
    tag: "01",
    title: "Technology built around real business processes.",
    desc: "When standard software does not fit the way an organization operates, ROHI designs systems around the actual process — workflows, users, data and intelligence.",
  },
  {
    icon: BrainCircuit,
    label: "AI",
    tag: "02",
    title: "Practical intelligence where it creates meaningful value.",
    desc: "Document understanding, intelligent search, classification, decision support, forecasting and AI assistants — used where the work genuinely benefits from it.",
  },
  {
    icon: Workflow,
    label: "Automation",
    tag: "03",
    title: "Technology that reduces repetitive and unnecessary work.",
    desc: "Approvals, notifications, recurring reports, data synchronization, document processing and workflow orchestration — connected where it makes sense.",
  },
  {
    icon: BarChart3,
    label: "Data",
    tag: "04",
    title: "Turning business information into useful visibility.",
    desc: "Dashboards, analytics, reporting and data consolidation that make operations understandable and decisions better supported.",
  },
];

export function CapabilitiesSection() {
  return (
    <Section id="capabilities" tone="light" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="02"
          eyebrow="What We Build"
          heading={
            <>
              Four capabilities.
              <br />
              One connected system.
            </>
          }
          lede="ROHI combines Systems, AI, Automation and Data according to the problem being solved. A particular project may use only one, several, or all of them — never the same architecture twice."
        />

        {/* Capability grid — modular, connected */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.article
                key={cap.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col gap-5 bg-background p-7 transition-colors hover:bg-cloud"
              >
                {/* Connector dots showing these are linked capabilities */}
                {i < CAPABILITIES.length - 1 && (
                  <span
                    className="pointer-events-none absolute right-3 top-1/2 hidden h-px w-6 bg-navy/10 [background-image:repeating-linear-gradient(90deg,rgba(11,18,32,0.25)_0,rgba(11,18,32,0.25)_3px,transparent_3px,transparent_6px)] lg:block"
                    aria-hidden
                  />
                )}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg border border-navy/10 bg-cloud text-navy transition-colors group-hover:border-teal/40 group-hover:text-teal">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft/50">
                    {cap.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold tracking-[-0.01em] text-ink">
                    {cap.label}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink">
                    {cap.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {cap.desc}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-6 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
          Fig. 03 — Capabilities as connected modules, not separate departments
        </p>
      </Container>
    </Section>
  );
}
