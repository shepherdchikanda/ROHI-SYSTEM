import type { Metadata } from "next";
import { SolutionsSection } from "@/components/rohi/sections/solutions-section";
import { CustomSystemsSection } from "@/components/rohi/sections/custom-systems-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Solutions — Intelligent Business Systems",
  description:
    "Business Systems, AI & Intelligence, Automation, Data & Analytics, Digital Foundations and Custom Solutions — scoped to your problem, not a fixed service menu.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsSection />
      <CustomSystemsSection />
      <CtaBand
        eyebrow="Custom systems"
        heading="Your business does not have to adapt to software that was never designed for it."
        lede="If standard tools do not fit the way you work, ROHI can design and build technology around your actual processes."
        ctaLabel="Describe your challenge"
      />
    </>
  );
}
