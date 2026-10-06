"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RohiButton } from "../rohi-button";
import { Eyebrow } from "../section-primitives";

/**
 * Hero system visual — fragmented nodes organize into a structured,
 * connected system. Subtle ambient motion once settled.
 * Concept: From Complexity to Clarity.
 */
function SystemDiagram() {
  const reduce = useReducedMotion();

  // Grid of nodes (4 columns x 3 rows)
  const nodes = [
    { x: 0, y: 0, active: true },
    { x: 1, y: 0, active: false },
    { x: 2, y: 0, active: true },
    { x: 3, y: 0, active: false },
    { x: 0, y: 1, active: false },
    { x: 1, y: 1, active: true },
    { x: 2, y: 1, active: false },
    { x: 3, y: 1, active: true },
    { x: 0, y: 2, active: true },
    { x: 1, y: 2, active: false },
    { x: 2, y: 2, active: true },
    { x: 3, y: 2, active: false },
  ];

  const cell = 64;
  const padX = 40;
  const padY = 32;
  const w = 3 * cell + padX * 2;
  const h = 2 * cell + padY * 2;

  const pos = (gx: number, gy: number) => ({
    cx: padX + gx * cell,
    cy: padY + gy * cell,
  });

  // Connections (pairs of node indices)
  const connections: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [3, 7],
    [4, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [5, 9],
    [6, 10],
    [1, 5],
    [2, 6],
    [7, 11],
  ];

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abstract representation of a business system — fragmented nodes organized into a connected structure."
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Pathways */}
      <g>
        {connections.map(([a, b], i) => {
          const pa = pos(nodes[a].x, nodes[a].y);
          const pb = pos(nodes[b].x, nodes[b].y);
          return (
            <motion.line
              key={`line-${i}`}
              x1={pa.cx}
              y1={pa.cy}
              x2={pb.cx}
              y2={pb.cy}
              stroke="#20C7C9"
              strokeWidth={1}
              strokeOpacity={0.28}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.28 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.04,
                ease: "easeOut",
              }}
            />
          );
        })}
      </g>

      {/* Flowing data pulses along a few connections */}
      {!reduce &&
        connections.slice(0, 5).map(([a, b], i) => {
          const pa = pos(nodes[a].x, nodes[a].y);
          const pb = pos(nodes[b].x, nodes[b].y);
          return (
            <motion.circle
              key={`pulse-${i}`}
              r={2.2}
              fill="#20C7C9"
              initial={{ cx: pa.cx, cy: pa.cy, opacity: 0 }}
              animate={{
                cx: [pa.cx, pb.cx],
                cy: [pa.cy, pb.cy],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: 1.4 + i * 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

      {/* Nodes */}
      <g>
        {nodes.map((n, i) => {
          const p = pos(n.x, n.y);
          const active = n.active;
          // Initial scattered offset (for the "fragmented → organized" intro)
          const scatter = reduce
            ? { dx: 0, dy: 0, rot: 0 }
            : {
                dx: (i % 2 === 0 ? -1 : 1) * (8 + (i % 3) * 6),
                dy: (i % 3 === 0 ? -1 : 1) * (10 + (i % 2) * 5),
                rot: (i % 2 === 0 ? -1 : 1) * 4,
              };
          return (
            <motion.g
              key={`node-${i}`}
              initial={{
                x: scatter.dx,
                y: scatter.dy,
                rotate: scatter.rot,
                opacity: 0,
              }}
              animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <rect
                x={p.cx - 7}
                y={p.cy - 7}
                width={14}
                height={14}
                rx={3}
                fill={active ? "#20C7C9" : "#FFFFFF"}
                fillOpacity={active ? 1 : 0.12}
                stroke={active ? "#20C7C9" : "#FFFFFF"}
                strokeOpacity={active ? 0 : 0.35}
                strokeWidth={1}
              />
              {active && !reduce && (
                <motion.rect
                  x={p.cx - 11}
                  y={p.cy - 11}
                  width={22}
                  height={22}
                  rx={5}
                  fill="none"
                  stroke="#20C7C9"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  animate={{ scale: [0.6, 1.4], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: 1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
                />
              )}
            </motion.g>
          );
        })}
      </g>
    </motion.svg>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-navy-grid opacity-60" aria-hidden />
      {/* Teal glow accent */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-teal/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Eyebrow tone="teal">Intelligent Business Systems</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="mt-6 font-sans text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            >
              Technology That Moves Business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            >
              We design and build intelligent systems around the way your
              organization actually works — connecting processes, data,
              automation and intelligence to make business simpler and more
              effective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <RohiButton href="/contact" variant="primary" size="lg">
                Start a Conversation
              </RohiButton>
              <RohiButton
                href="/solutions"
                variant="outlineLight"
                size="lg"
                withArrow={false}
              >
                Explore What We Build
              </RohiButton>
            </motion.div>

            {/* Trust strip — factual, no invented logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6"
            >
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                Systems
              </span>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                AI
              </span>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                Automation
              </span>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                Data
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
                Built in Mozambique
              </span>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full">
              <SystemDiagram />
            </div>
            {/* Caption */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                Fig. 01 — From Complexity to Clarity
              </p>
              <p className="hidden font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/30 sm:block">
                System state: Connected
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge transition into light section */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
