import type { Metadata } from "next";
import { InsightsSection } from "@/components/rohi/sections/insights-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Insights — How ROHI thinks about the work",
  description:
    "Insights explaining complex technology clearly, demonstrating expertise and supporting decisions — on business systems, automation, AI, data and technology strategy.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <InsightsSection />
      <CtaBand
        eyebrow="Insights"
        heading="Want thinking applied to your problem?"
        lede="If an insight here connects to something you're working on, tell us about it. We can explore whether the same thinking applies to your context."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
