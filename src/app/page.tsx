import { HeroSection } from "@/components/rohi/sections/hero-section";
import { ProblemSection } from "@/components/rohi/sections/problem-section";
import { CapabilitiesSection } from "@/components/rohi/sections/capabilities-section";
import { WhyRohiSection } from "@/components/rohi/sections/why-rohi-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ROHI SYSTEMS",
  description:
    "ROHI SYSTEMS designs and builds intelligent business systems — connecting processes, data, automation and intelligence to make organizations simpler and more effective.",
  slogan: "Technology That Moves Business.",
  knowsAbout: [
    "Intelligent Business Systems",
    "Business Systems",
    "AI",
    "Automation",
    "Data & Analytics",
    "Digital Foundations",
    "Custom Systems",
  ],
  areaServed: ["Mozambique", "Africa", "Global"],
  foundingLocation: "Mozambique",
  url: "https://rohi.systems",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <CapabilitiesSection />
      <WhyRohiSection />
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
