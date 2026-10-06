"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, Container, SectionHeader } from "../section-primitives";

const STEPS = [
  {
    n: "01",
    title: "Understand",
    desc: "Understand the organization, the people, the processes, the information and the actual problem — before any technology is chosen.",
    state: "fragmented",
  },
  {
    n: "02",
    title: "Design",
    desc: "Design the right system — architecture, data model, workflows and experience — around how the work actually happens.",
    state: "structured",
  },
  {
    n: "03",
    title: "Build",
    desc: "Engineer the technology required to make the solution real — reliably, and built to work in the real world.",
    state: "built",
  },
  {
    n: "04",
    title: "Intelligence",
    desc: "Introduce data, analytics and AI where they create meaningful value — not everywhere, but where the work benefits.",
    state: "intelligent",
  },
  {
    n: "05",
    title: "Automate",
    desc: "Automate repetitive work and connect processes where appropriate, so people focus on work that needs judgment.",
    state: "automated",
  },
  {
    n: "06",
    title: "Improve",
    desc: "Measure, learn and continuously improve. The system is not finished at launch — it evolves with the organization.",
    state: "improving",
  },
] as const;

/* Mini state visual for each step — shows the system evolving */
function StateVisual({ state }: { state: string }) {
  const nodes = [
    { x: 10, y: 10 },
    { x: 50, y: 8 },
    { x: 88, y: 14 },
    { x: 12, y: 50 },
    { x: 50, y: 52 },
    { x: 90, y: 48 },
    { x: 14, y: 88 },
    { x: 50, y: 90 },
    { x: 86, y: 86 },
  ];

  // Which nodes are active and how many connections, per state
  const config: Record<
    string,
    { activeIdx: number[]; connections: [number, number][]; scattered: boolean; tealPulse: boolean }
  > = {
    fragmented: {
      activeIdx: [0, 2, 5, 7],
      connections: [],
      scattered: true,
      tealPulse: false,
    },
    structured: {
      activeIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      connections: [
        [0, 1],
        [1, 2],
        [3, 4],
        [4, 5],
        [6, 7],
        [7, 8],
      ],
      scattered: false,
      tealPulse: false,
    },
    built: {
      activeIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      connections: [
        [0, 1],
        [1, 2],
        [0, 3],
        [1, 4],
        [2, 5],
        [3, 4],
        [4, 5],
        [3, 6],
        [4, 7],
        [5, 8],
        [6, 7],
        [7, 8],
      ],
      scattered: false,
      tealPulse: false,
    },
    intelligent: {
      activeIdx: [0, 2, 4, 6, 8],
      connections: [
        [0, 4],
        [2, 4],
        [4, 6],
        [4, 8],
        [0, 2],
        [6, 8],
      ],
      scattered: false,
      tealPulse: true,
    },
    automated: {
      activeIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      connections: [
        [0, 1],
        [1, 2],
        [3, 4],
        [4, 5],
        [6, 7],
        [7, 8],
        [0, 3],
        [3, 6],
        [2, 5],
        [5, 8],
      ],
      scattered: false,
      tealPulse: true,
    },
    improving: {
      activeIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      connections: [
        [0, 1],
        [1, 2],
        [0, 3],
        [1, 4],
        [2, 5],
        [3, 4],
        [4, 5],
        [3, 6],
        [4, 7],
        [5, 8],
        [6, 7],
        [7, 8],
        [0, 4],
        [2, 4],
        [4, 6],
        [4, 8],
      ],
      scattered: false,
      tealPulse: true,
    },
  };

  const cfg = config[state] ?? config.fragmented;

  const pos = (n: { x: number; y: number }) => ({
    cx: n.x,
    cy: n.y,
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20"
      fill="none"
      aria-hidden="true"
    >
      {/* Connections */}
      {cfg.connections.map(([a, b], i) => {
        const pa = pos(nodes[a]);
        const pb = pos(nodes[b]);
        return (
          <line
            key={`c-${i}`}
            x1={pa.cx}
            y1={pa.cy}
            x2={pb.cx}
            y2={pb.cy}
            stroke={cfg.tealPulse ? "#20C7C9" : "#FFFFFF"}
            strokeOpacity={cfg.tealPulse ? 0.5 : 0.25}
            strokeWidth={0.8}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((n, i) => {
        const active = cfg.activeIdx.includes(i);
        const offset = cfg.scattered ? (i % 2 === 0 ? 3 : -3) : 0;
        return (
          <circle
            key={`n-${i}`}
            cx={n.x + offset}
            cy={n.y + offset}
            r={active ? 2.4 : 1.6}
            fill={active ? "#20C7C9" : "#FFFFFF"}
            fillOpacity={active ? 1 : 0.3}
          />
        );
      })}
    </svg>
  );
}

export function ApproachSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="approach" tone="navy" className="overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-navy-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeader
          number="07"
          eyebrow="Approach"
          tone="light"
          heading={
            <>
              From Complexity to Clarity.
            </>
          }
          lede="The ROHI methodology. The system becomes clearer as you move through it — from fragmented information to an intelligent, automated, continuously improving structure."
        />

        {/* Progressive timeline */}
        <div ref={ref} className="relative mt-16">
          {/* Track */}
          <div className="absolute left-[1.625rem] top-0 h-full w-px bg-white/10 sm:left-12" aria-hidden />
          {/* Progress fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[1.625rem] top-0 w-px bg-teal sm:left-12"
            aria-hidden
          />

          <ol className="space-y-10 sm:space-y-12">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="relative grid gap-4 pl-12 sm:pl-20 lg:grid-cols-12 lg:gap-8 lg:pl-24"
              >
                {/* Node marker on the track */}
                <span
                  className="absolute left-0 top-0 flex size-13 items-center justify-center sm:left-4"
                  aria-hidden
                >
                  <span className="size-3 rounded-full border-2 border-teal bg-navy" />
                </span>

                {/* Step number + title */}
                <div className="lg:col-span-4">
                  <span className="font-mono-tech text-sm font-medium tracking-widest text-teal">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-sans text-2xl font-bold tracking-[-0.01em] text-white sm:text-3xl">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-base leading-relaxed text-white/70">
                    {step.desc}
                  </p>
                </div>

                {/* State visual */}
                <div className="flex items-center justify-start lg:col-span-3 lg:justify-end">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <StateVisual state={step.state} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-14 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
          Fig. 08 — System state progression: Fragmented → Connected → Built → Intelligent → Automated → Improving
        </p>
      </Container>
    </Section>
  );
}
