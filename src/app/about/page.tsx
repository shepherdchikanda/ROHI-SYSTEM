import type { Metadata } from "next";
import { AboutSection } from "@/components/rohi/sections/about-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "About — From Complexity to Clarity",
  description:
    "ROHI SYSTEMS exists to make organizations more capable through technology. Purpose, mission, vision, philosophy, beliefs, and where the company is going.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <CtaBand
        eyebrow="About ROHI"
        heading="Think ROHI could be the right partner?"
        lede="Tell us what you're trying to improve. We start by understanding the problem, then decide together whether we're the right fit."
      />
    </>
  );
}
