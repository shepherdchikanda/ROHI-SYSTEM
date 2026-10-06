"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import { Section, Container, SectionHeader, Eyebrow } from "../section-primitives";

/**
 * Products section.
 * FIMS is a ROHI SYSTEMS product designed to solve a specific business problem.
 * It is not "the ROHI platform" and not the definition of the company.
 * Until FIMS is publicly ready, show a controlled product-development state.
 */
export function ProductsSection() {
  return (
    <Section id="products" tone="light" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="10"
          eyebrow="Products"
          heading={
            <>
              Products that solve
              <br />
              specific problems.
            </>
          }
          lede="Products are part of ROHI SYSTEMS — they do not replace the company brand. A product is a focused system built to solve a defined problem, and may eventually become one of several."
        />

        {/* Product hierarchy breadcrumb */}
        <div className="mt-10 flex flex-wrap items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
          <span>ROHI SYSTEMS</span>
          <span aria-hidden>→</span>
          <span className="text-ink-soft">Products</span>
          <span aria-hidden>→</span>
          <span className="text-teal">FIMS</span>
          <span className="text-ink-soft/40">/ Future products</span>
        </div>

        {/* FIMS product card — controlled development state */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 overflow-hidden rounded-2xl border border-navy/10 bg-cloud"
        >
          <div className="grid gap-px bg-navy/5 sm:grid-cols-12">
            {/* Left — mark */}
            <div className="relative flex flex-col justify-between bg-background p-8 sm:col-span-4 sm:p-10">
              <div>
                <div className="flex size-14 items-center justify-center rounded-xl border border-navy/10 bg-background text-navy">
                  <Package className="size-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-sans text-3xl font-extrabold tracking-[-0.02em] text-navy">
                  FIMS
                </h3>
                <p className="mt-2 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
                  A ROHI SYSTEMS product
                </p>
              </div>
              <p className="mt-8 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                Status · In development
              </p>
            </div>

            {/* Right — detail */}
            <div className="bg-background p-8 sm:col-span-8 sm:p-10">
              <Eyebrow tone="navy">Focused business system</Eyebrow>
              <p className="mt-5 font-sans text-xl font-semibold leading-snug text-ink">
                Building the next generation of focused business systems.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                FIMS is a focused system designed to solve a specific business
                problem — not a general-purpose platform. It is part of ROHI
                SYSTEMS, not the definition of it. Public details will be shared
                as the product reaches readiness.
              </p>

              {/* What we can confirm (no invented features) */}
              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-navy/10 bg-navy/5 sm:grid-cols-3">
                {[
                  {
                    k: "Category",
                    v: "Focused business system",
                  },
                  {
                    k: "Approach",
                    v: "Built around a defined problem",
                  },
                  {
                    k: "Availability",
                    v: "Controlled development",
                  },
                ].map((m) => (
                  <div key={m.k} className="bg-background p-4">
                    <p className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/60">
                      {m.k}
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink">{m.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
                >
                  Talk to us about FIMS
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/50">
                  Product details shared on request
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Future products placeholder */}
        <div className="mt-8 flex items-center gap-4 rounded-xl border border-dashed border-navy/15 bg-cloud/60 p-6">
          <div className="flex size-10 items-center justify-center rounded-lg border border-dashed border-navy/20 text-ink-soft/50">
            <Package className="size-5" strokeWidth={1.4} />
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-ink">
              Future products
            </p>
            <p className="mt-0.5 text-sm text-ink-soft">
              Additional focused products will appear here as they are
              developed.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
