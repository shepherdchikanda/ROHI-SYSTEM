"use client";

import { motion } from "framer-motion";
import { Lock, FileText } from "lucide-react";
import { Section, Container, SectionHeader } from "../section-primitives";
import { RohiButton } from "../rohi-button";

/**
 * Case studies — placeholder state.
 * No invented clients, metrics or outcomes.
 * When real case studies exist, each follows: Challenge → Business Problem →
 * Approach → System → Result → Technology.
 */
export function CaseStudiesSection() {
  return (
    <Section id="case-studies" tone="cloud" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <Container>
        <SectionHeader
          number="11"
          eyebrow="Case Studies"
          heading={
            <>
              Proof before
              <br />
              claims.
            </>
          }
          lede="Case studies will be published here as projects reach a shareable state. Each will follow a clear structure — challenge, business problem, approach, system, result and technology — focused on business impact, not code."
        />

        {/* Placeholder card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 overflow-hidden rounded-2xl border border-navy/10 bg-background"
        >
          <div className="grid gap-px bg-navy/5 sm:grid-cols-2">
            <div className="flex flex-col items-start justify-center gap-4 p-10 sm:p-14">
              <div className="flex size-14 items-center justify-center rounded-xl border border-navy/10 bg-cloud text-navy">
                <FileText className="size-6" strokeWidth={1.6} />
              </div>
              <p className="font-sans text-2xl font-bold tracking-[-0.01em] text-ink sm:text-3xl">
                Case studies coming soon.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                ROHI does not publish invented clients, metrics or outcomes.
                When a project is ready to be shared, it will appear here — with
                the business problem it solved and the system that was built.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-navy/10 bg-cloud px-3 py-1.5">
                <Lock className="size-3.5 text-ink-soft" strokeWidth={1.6} />
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                  Placeholder — no real case studies yet
                </span>
              </div>
            </div>

            {/* Case study structure preview */}
            <div className="bg-background p-10 sm:p-14">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                Each case study will follow
              </p>
              <ol className="mt-6 space-y-5">
                {[
                  { n: "01", k: "Challenge", v: "What was happening?" },
                  { n: "02", k: "Business Problem", v: "Why did it matter?" },
                  { n: "03", k: "Approach", v: "How did ROHI structure the problem?" },
                  { n: "04", k: "System", v: "What was built?" },
                  { n: "05", k: "Result", v: "What changed?" },
                  { n: "06", k: "Technology", v: "Relevant technologies & capabilities." },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span className="font-mono-tech text-xs font-medium tracking-widest text-teal">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-sans text-sm font-semibold text-ink">
                        {s.k}
                      </p>
                      <p className="text-sm text-ink-soft">{s.v}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
            Fig. 11 — Case study framework (ready for real projects)
          </p>
          <RohiButton href="/contact" variant="ghost" size="sm">
            Discuss your project
          </RohiButton>
        </div>
      </Container>
    </Section>
  );
}
