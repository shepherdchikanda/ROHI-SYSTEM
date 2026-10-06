"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Section,
  Container,
  Eyebrow,
  SectionHeading,
  Lede,
} from "../section-primitives";
import { RohiButton } from "../rohi-button";

/* ---------- shared sub-components ---------- */

function DetailRow({
  index,
  eyebrow,
  heading,
  lede,
  examples,
  tone,
  caption,
  reverse = false,
  visual,
}: {
  index: string;
  eyebrow: string;
  heading: string;
  lede: string;
  examples: { title: string; desc: string }[];
  tone: "light" | "cloud";
  caption: string;
  reverse?: boolean;
  visual: React.ReactNode;
}) {
  return (
    <Section tone={tone}>
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className={reverse ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
            <div className="flex items-center gap-4">
              <span className="font-mono-tech text-xs font-medium tracking-widest text-ink-soft/60">
                {index}
              </span>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <SectionHeading className="mt-5 text-3xl leading-[1.08] text-ink sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </SectionHeading>
            <Lede className="mt-5 max-w-xl text-lg">{lede}</Lede>

            {/* Examples */}
            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {examples.map((ex) => (
                <div key={ex.title} className="border-l border-navy/10 pl-4">
                  <dt className="font-sans text-sm font-semibold text-ink">
                    {ex.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {ex.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={reverse ? "lg:col-span-6 lg:row-start-1" : "lg:col-span-6"}
          >
            <div className="rounded-xl border border-navy/10 bg-background p-6 shadow-sm sm:p-8">
              {visual}
            </div>
            <p className="mt-4 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
              {caption}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- small shared visual helpers ---------- */

function NodeGrid({
  nodes,
  cols = 3,
  accent = [0, 4, 8],
}: {
  nodes: string[];
  cols?: number;
  accent?: number[];
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {nodes.map((n, i) => {
        const isActive = accent.includes(i);
        return (
          <div
            key={i}
            className={
              "flex h-12 items-center justify-center rounded-md border text-[10px] font-medium font-mono-tech tracking-widest transition-colors " +
              (isActive
                ? "border-teal/40 bg-teal/10 text-teal"
                : "border-navy/10 bg-cloud text-ink-soft")
            }
          >
            {n}
          </div>
        );
      })}
    </div>
  );
}

function ConnectorLines() {
  return (
    <svg
      viewBox="0 0 320 40"
      className="mt-3 h-8 w-full"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 20H300"
        stroke="#20C7C9"
        strokeWidth="1.4"
        strokeOpacity="0.5"
        strokeDasharray="4 4"
      />
      <circle cx="20" cy="20" r="3" fill="#20C7C9" />
      <circle cx="160" cy="20" r="3" fill="#20C7C9" />
      <circle cx="300" cy="20" r="3" fill="#20C7C9" />
    </svg>
  );
}

/* ---------- Systems section ---------- */

export function SystemsSection() {
  return (
    <DetailRow
      index="03 — Systems"
      eyebrow="Systems"
      heading="Systems built around your business."
      lede="When standard software does not properly fit the way an organization operates, ROHI designs and builds systems around the actual process — including workflows, users, data, integrations and intelligence."
      tone="light"
      caption="Fig. 04 — Modular system architecture"
      examples={[
        { title: "Business management systems", desc: "Core platforms that run daily operations end to end." },
        { title: "Operational platforms", desc: "Systems that coordinate teams, resources and processes." },
        { title: "Workflow systems", desc: "Structured flows for approvals, handoffs and status." },
        { title: "Customer platforms", desc: "Portals and applications where customers interact." },
        { title: "Internal systems", desc: "Tools that support the people doing the work." },
        { title: "Specialized applications", desc: "Software built for a specific organizational need." },
      ]}
      visual={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              System modules
            </span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Connected
            </span>
          </div>
          <NodeGrid
            nodes={["CRM", "OPS", "FIN", "USR", "INV", "RPT", "DOC", "INT", "AI"]}
            accent={[0, 4, 8]}
          />
          <ConnectorLines />
          <div className="grid grid-cols-3 gap-2 text-center">
            {["Users", "Data", "Logic"].map((t) => (
              <div
                key={t}
                className="rounded-md border border-navy/10 bg-cloud px-2 py-2 text-[11px] font-mono-tech uppercase tracking-widest text-ink-soft"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

/* ---------- AI section ---------- */

export function AiSection() {
  return (
    <DetailRow
      index="04 — AI"
      eyebrow="AI"
      heading="Intelligence where it creates value."
      lede="AI is a capability, not the company. ROHI uses it practically — where it improves real work, not where it adds noise. Understand first. Add intelligence where it creates value."
      tone="cloud"
      caption="Fig. 05 — Practical AI applied to real business inputs"
      reverse
      examples={[
        { title: "Document understanding", desc: "Read, extract and structure information from documents." },
        { title: "Intelligent search", desc: "Find answers across the organization's own information." },
        { title: "Analysis & classification", desc: "Make sense of large volumes of unstructured data." },
        { title: "Decision support", desc: "Surface relevant context at the moment a decision is made." },
        { title: "Forecasting", desc: "Estimate demand, capacity and risk from operational data." },
        { title: "AI assistants & workflows", desc: "Assistants embedded in the work, not floating above it." },
      ]}
      visual={
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Inputs
            </span>
            <ArrowRight className="size-4 text-ink-soft" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Structured output
            </span>
          </div>
          <div className="space-y-2">
            {[
              "Documents",
              "Emails",
              "Records",
              "Requests",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-md border border-navy/10 bg-cloud px-3 py-2"
              >
                <span className="text-sm text-ink">{t}</span>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/60">
                  unstructured
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-teal/40 bg-teal/5 p-4">
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-teal">
              AI layer — understand · classify · extract · summarize
            </p>
            <p className="mt-2 text-sm text-ink">
              → Structured records, classified and ready for the system
            </p>
          </div>
        </div>
      }
    />
  );
}

/* ---------- Automation section ---------- */

export function AutomationSection() {
  return (
    <DetailRow
      index="05 — Automation"
      eyebrow="Automation"
      heading="Make repetitive work work automatically."
      lede="Approvals, notifications, recurring reports, data synchronization and document processing — connected where appropriate, so people focus on work that needs judgment."
      tone="light"
      caption="Fig. 06 — Workflow orchestration across systems"
      examples={[
        { title: "Approvals", desc: "Route, notify and record decisions automatically." },
        { title: "Notifications", desc: "The right people informed at the right moment." },
        { title: "Recurring reports", desc: "Generated and delivered on a schedule, not on request." },
        { title: "Data synchronization", desc: "One source of truth across connected systems." },
        { title: "Document processing", desc: "Capture, classify and store without manual steps." },
        { title: "Workflow orchestration", desc: "Coordinate steps across people and systems." },
      ]}
      visual={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Trigger → Action → Result
            </span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Automated
            </span>
          </div>
          <div className="space-y-2">
            {[
              { step: "01", label: "Request received", state: "input" },
              { step: "02", label: "Validate against rules", state: "process" },
              { step: "03", label: "Route for approval", state: "process" },
              { step: "04", label: "Update records", state: "process" },
              { step: "05", label: "Notify stakeholders", state: "output" },
            ].map((s) => (
              <div
                key={s.step}
                className="flex items-center gap-3 rounded-md border border-navy/10 bg-cloud px-3 py-2.5"
              >
                <span className="font-mono-tech text-[11px] font-medium tracking-widest text-ink-soft/70">
                  {s.step}
                </span>
                <span className="text-sm text-ink">{s.label}</span>
                <span className="ml-auto font-mono-tech text-[10px] uppercase tracking-widest text-teal">
                  {s.state}
                </span>
              </div>
            ))}
          </div>
          <ConnectorLines />
        </div>
      }
    />
  );
}

/* ---------- Data section ---------- */

export function DataSection() {
  return (
    <DetailRow
      index="06 — Data"
      eyebrow="Data"
      heading="Turn business information into understanding."
      lede="Dashboards, analytics and reporting that make operations visible — not abstract. Data should feel useful and understandable, not impressive but unread."
      tone="cloud"
      caption="Fig. 07 — Operational visibility across the organization"
      reverse
      examples={[
        { title: "Dashboards", desc: "Live operational views, built around decisions." },
        { title: "Analytics", desc: "Patterns and trends that explain what is happening." },
        { title: "Reporting", desc: "Clear, scheduled reports for the people who need them." },
        { title: "Data consolidation", desc: "One coherent picture from many disconnected sources." },
        { title: "Operational visibility", desc: "See the work, the bottlenecks and the progress." },
        { title: "Decision support", desc: "Relevant numbers at the moment a decision is made." },
      ]}
      visual={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Operations dashboard
            </span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Live
            </span>
          </div>
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Throughput", v: "1,284" },
              { k: "Pending", v: "37" },
              { k: "On-time", v: "94%" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-md border border-navy/10 bg-cloud p-3"
              >
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/70">
                  {m.k}
                </p>
                <p className="mt-1 font-sans text-xl font-bold text-ink">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
          {/* Mini bar chart */}
          <div className="rounded-md border border-navy/10 bg-cloud p-4">
            <p className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/70">
              Weekly volume
            </p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {[40, 62, 48, 70, 55, 82, 68, 90, 74, 96, 80, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-teal/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
