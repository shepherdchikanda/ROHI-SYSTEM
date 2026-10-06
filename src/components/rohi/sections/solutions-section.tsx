"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, BrainCircuit, Workflow, BarChart3, Globe, Layers } from "lucide-react";
import { Section, Container, SectionHeader } from "../section-primitives";
import { RohiButton } from "../rohi-button";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    icon: Boxes,
    key: "business-systems",
    label: "Business Systems",
    problem: "Standard software forces the organization to adapt to it.",
    whatWeBuild:
      "Custom systems designed around real workflows, users and data — operational platforms, internal systems, customer portals, specialized applications.",
    capabilities: [
      "Workflow orchestration",
      "Role-based access",
      "Process modelling",
      "System integrations",
      "Custom business logic",
    ],
    outcomes: [
      "Work happens in one place",
      "Fewer manual handoffs",
      "Clearer accountability",
    ],
  },
  {
    icon: BrainCircuit,
    key: "ai-intelligence",
    label: "AI & Intelligence",
    problem: "Information exists but cannot be understood or used in time.",
    whatWeBuild:
      "Practical AI where the work benefits — document understanding, intelligent search, classification, decision support, AI assistants embedded in workflows.",
    capabilities: [
      "Document understanding",
      "Intelligent search",
      "Classification & extraction",
      "Decision support",
      "AI assistants",
    ],
    outcomes: [
      "Faster access to the right information",
      "Less manual reading and sorting",
      "Better-supported decisions",
    ],
  },
  {
    icon: Workflow,
    key: "automation",
    label: "Automation",
    problem: "Skilled people spend hours on repetitive, mechanical work.",
    whatWeBuild:
      "Automated workflows across systems — approvals, notifications, recurring reports, data synchronization, document processing and orchestration.",
    capabilities: [
      "Approvals & routing",
      "Scheduled reports",
      "Data synchronization",
      "Document processing",
      "System orchestration",
    ],
    outcomes: [
      "Time returned to the team",
      "Fewer manual errors",
      "Predictable, repeatable processes",
    ],
  },
  {
    icon: BarChart3,
    key: "data-analytics",
    label: "Data & Analytics",
    problem: "The organization cannot see what is actually happening.",
    whatWeBuild:
      "Dashboards, analytics and reporting built around decisions — consolidating disconnected data into one coherent, readable picture.",
    capabilities: [
      "Operational dashboards",
      "Analytics",
      "Scheduled reporting",
      "Data consolidation",
      "Decision support views",
    ],
    outcomes: [
      "Visibility into operations",
      "Decisions backed by evidence",
      "Bottlenecks surfaced early",
    ],
  },
  {
    icon: Globe,
    key: "digital-foundations",
    label: "Digital Foundations",
    problem: "The organization's digital presence does not reflect where it is going.",
    whatWeBuild:
      "Corporate websites, customer portals, digital forms, booking systems, e-commerce and basic integrations — built to evolve, not just to launch.",
    capabilities: [
      "Corporate websites",
      "Customer portals",
      "Digital forms",
      "Booking systems",
      "E-commerce & integrations",
    ],
    outcomes: [
      "A credible digital presence",
      "Foundations that scale",
      "Customers can find and use you",
    ],
  },
  {
    icon: Layers,
    key: "custom-solutions",
    label: "Custom Solutions",
    problem: "Your business does not have to adapt to software that was never designed for it.",
    whatWeBuild:
      "Technology built around actual organizational processes — business requirements, workflows, roles, data, integrations, architecture, intelligence and scalability.",
    capabilities: [
      "Requirements architecture",
      "Custom workflows",
      "Role & data modelling",
      "System integration",
      "Scalable engineering",
    ],
    outcomes: [
      "Software that fits the organization",
      "A system that can grow",
      "No more forcing workarounds",
    ],
  },
];

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];
  const Icon = current.icon;

  return (
    <Section id="solutions" tone="cloud" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <Container>
        <SectionHeader
          number="09"
          eyebrow="Solutions"
          heading={
            <>
              What we can build,
              <br />
              scoped to your problem.
            </>
          }
          lede="Every organization is different. ROHI scopes solutions around the complexity, requirements and outcomes of the problem — not a fixed service menu."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Tab list */}
          <div className="lg:col-span-4">
            <ul className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 scroll-thin">
              {SOLUTIONS.map((s, i) => {
                const TabIcon = s.icon;
                const isActive = i === active;
                return (
                  <li key={s.key} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-selected={isActive}
                      aria-controls={`solution-panel-${s.key}`}
                      id={`solution-tab-${s.key}`}
                      role="tab"
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40 lg:w-auto",
                        isActive
                          ? "border-navy/10 bg-navy text-white"
                          : "border-navy/10 bg-background text-ink-soft hover:border-navy/20 hover:text-ink",
                      )}
                    >
                      <TabIcon
                        className={cn(
                          "size-4 shrink-0",
                          isActive ? "text-teal" : "text-ink-soft",
                        )}
                        strokeWidth={1.6}
                      />
                      <span className="whitespace-nowrap">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panel */}
          <div
            id={`solution-panel-${current.key}`}
            role="tabpanel"
            aria-labelledby={`solution-tab-${current.key}`}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2"
              >
                {/* Problem */}
                <div className="bg-background p-7">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                      The problem
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-lg font-semibold leading-snug text-ink">
                    {current.problem}
                  </p>
                </div>

                {/* What we build */}
                <div className="bg-background p-7">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-teal" strokeWidth={1.6} />
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                      What ROHI can build
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    {current.whatWeBuild}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="bg-background p-7">
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                    Example capabilities
                  </span>
                  <ul className="mt-4 space-y-2">
                    {current.capabilities.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2 text-sm text-ink"
                      >
                        <span
                          className="size-1.5 rounded-full bg-teal"
                          aria-hidden
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="bg-background p-7">
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                    Potential outcomes
                  </span>
                  <ul className="mt-4 space-y-2">
                    {current.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-center gap-2 text-sm text-ink"
                      >
                        <span
                          className="size-1.5 rounded-full bg-navy"
                          aria-hidden
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                Fig. 09 — {current.label} · scoped to your context
              </p>
              <RohiButton href="/contact" variant="ghost" size="sm">
                Describe your challenge
              </RohiButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
