import type { Metadata } from "next";
import { ApproachSection } from "@/components/rohi/sections/approach-section";
import { WhyRohiSection } from "@/components/rohi/sections/why-rohi-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Approach — From Complexity to Clarity",
  description:
    "The ROHI methodology: Understand → Design → Build → Intelligence → Automate → Improve. A progressive journey from fragmented information to an intelligent, automated, continuously improving system.",
  alternates: { canonical: "/approach" },
};

export default function ApproachPage() {
  return (
    <>
      <ApproachSection />
      <WhyRohiSection />
      <CtaBand
        eyebrow="Approach"
        heading="Want to see this applied to your problem?"
        lede="We start by understanding the problem — the organization, the people, the processes and the information — before any technology is chosen."
      />
    </>
  );
}
