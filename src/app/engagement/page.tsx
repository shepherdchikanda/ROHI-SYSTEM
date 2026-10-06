import type { Metadata } from "next";
import {
  EngagementIntroSection,
  EngagementModelSection,
  EngagementLifecycleSection,
} from "@/components/rohi/sections/engagement-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Engagement — How we work with clients",
  description:
    "How ROHI works with clients — a commercial model that scales with the problem (Standardized Solutions → Intelligent Systems → Recurring Services → Products) and a clear engagement lifecycle from first conversation to long-term partner. ROHI scopes solutions around complexity, requirements and outcomes — not a fixed service menu.",
  alternates: { canonical: "/engagement" },
};

export default function EngagementPage() {
  return (
    <>
      <EngagementIntroSection />
      <EngagementModelSection />
      <EngagementLifecycleSection />
      <CtaBand
        eyebrow="Engagement"
        heading="Have a problem worth solving?"
        lede="Tell us what you're trying to improve. We start by understanding — not by sending a quote."
        ctaLabel="Start a Conversation"
        href="/contact"
      />
    </>
  );
}
