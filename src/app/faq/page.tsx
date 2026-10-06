import type { Metadata } from "next";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/rohi/section-primitives";
import { CtaBand } from "@/components/rohi/sections/cta-band";
import {
  FaqAccordion,
  type FaqGroup,
} from "@/components/rohi/sections/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ — Questions, answered",
  description:
    "The most common questions about working with ROHI SYSTEMS — what we do, how projects run, and where we draw the line. Honest answers based on documented positioning, not over-promising.",
  alternates: { canonical: "/faq" },
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "Working with ROHI",
    items: [
      {
        q: "What does ROHI actually do?",
        a: "ROHI designs and builds intelligent business systems — combining systems engineering, AI, automation and data around how an organization actually works. Not a software agency, not an AI company, not a web shop.",
      },
      {
        q: "Is ROHI a software agency or an AI company?",
        a: "Neither, fully. Those describe individual capabilities. ROHI combines Systems, AI, Automation and Data according to the problem — the mix is shaped by what the work actually needs, not by what we'd prefer to sell.",
      },
      {
        q: "Does ROHI only work in Mozambique?",
        a: "ROHI is based in Mozambique and understands local requirements — M-Pesa, e-Mola, M-Kesh, METIX, WhatsApp Business, SAF-T — but it can serve modern organizations anywhere. Geography is not the constraint; the quality of the problem is.",
      },
      {
        q: "Can ROHI integrate with our existing systems?",
        a: "Often yes, depending on the systems. ROHI scopes integrations as part of understanding the problem. It does not guarantee every integration until the requirements are clear — that would be guessing, not engineering.",
      },
      {
        q: "Does ROHI build websites?",
        a: "Yes, as digital foundations — corporate sites, portals, forms, e-commerce, and basic integrations. But websites are not what defines ROHI; they are one capability, not the company. A website alone rarely solves the business problem it was built for.",
      },
    ],
  },
  {
    category: "How projects work",
    items: [
      {
        q: "How does ROHI price projects?",
        a: "ROHI scopes projects based on complexity, requirements, integrations and outcomes. It understands the problem first, then defines the appropriate solution and cost. There is no fixed price list, and no invented quotes. A real estimate follows a real scope.",
      },
      {
        q: "Do you offer fixed packages?",
        a: "ROHI's model spans Standardized Solutions → Intelligent Systems → Recurring Services → Products. The right shape depends on the problem; not every project is custom-built from scratch, and not every problem fits a package. We pick the form that fits.",
      },
      {
        q: "How long does a project take?",
        a: "It depends on scope, integrations and complexity. ROHI does not promise delivery dates before understanding the work. A timeline is part of the scope — produced once the problem is clear, not before.",
      },
      {
        q: "Can ROHI guarantee AI accuracy / ROI?",
        a: "No responsible technology partner guarantees AI accuracy or ROI upfront. ROHI uses AI where it creates value and measures results against the work — but it does not over-promise. A guarantee that can't be honored is worse than an honest estimate.",
      },
    ],
  },
  {
    category: "Products & approach",
    items: [
      {
        q: "What is FIMS?",
        a: "FIMS is a ROHI SYSTEMS product designed to solve a specific business problem. It is not \"the ROHI platform,\" and it is not the architecture behind every project. Public details are shared as the product reaches readiness — not before.",
      },
      {
        q: "Does every ROHI project use AI?",
        a: "No. ROHI's principle is simple: understand first, add intelligence where it creates value. Some projects need only systems or automation; AI is a capability, not a requirement. If AI doesn't help, it isn't added.",
      },
      {
        q: "How do I start?",
        a: "Use the Contact page to describe what you're trying to improve. ROHI starts by understanding the problem — not by sending a quote. The first conversation is about the work, not the contract.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* 01 — Hero / intro */}
      <Section
        tone="cloud"
        className="pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20"
      >
        <Container>
          <SectionHeader
            number="01"
            eyebrow="FAQ"
            heading="Questions, answered honestly."
            lede="These are the questions we hear most often. The answers reflect ROHI's documented positioning — what we do, how we work, and where we draw the line. We don't promise what we haven't scoped, and we don't quote work we haven't understood."
          />
        </Container>
      </Section>

      {/* 02 — Accordion */}
      <Section tone="light" className="pb-24 pt-4 sm:pb-28">
        <Container>
          <div className="mb-10 flex items-center gap-3 sm:mb-12">
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
              02
            </span>
            <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
            <Eyebrow tone="navy">Answers</Eyebrow>
          </div>
          <FaqAccordion groups={FAQ_GROUPS} />
        </Container>
      </Section>

      {/* 03 — CTA */}
      <CtaBand
        eyebrow="Still have questions?"
        heading="The ROHI team can answer the rest."
        lede="If your question isn't here, or if the answer needs to be specific to your context, the fastest way forward is a conversation. We start by understanding the problem — not by sending a quote."
        ctaLabel="Start a Conversation"
        href="/contact"
      />
    </>
  );
}
