import type { Metadata } from "next";
import { CaseStudiesSection } from "@/components/rohi/sections/case-studies-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Case Studies — Proof before claims",
  description:
    "Case studies will be published here as projects reach a shareable state — each following a clear structure of challenge, business problem, approach, system, result and technology.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesSection />
      <CtaBand
        eyebrow="Case studies"
        heading="Have a project that could become a case study?"
        lede="If you have a business problem worth solving and want to build something real, we'd like to hear about it."
        ctaLabel="Discuss your project"
      />
    </>
  );
}
