import { SiteHeader } from "@/components/rohi/site-header";
import { SiteFooter } from "@/components/rohi/site-footer";
import { HeroSection } from "@/components/rohi/sections/hero-section";
import { ProblemSection } from "@/components/rohi/sections/problem-section";
import { CapabilitiesSection } from "@/components/rohi/sections/capabilities-section";
import {
  SystemsSection,
  AiSection,
  AutomationSection,
  DataSection,
} from "@/components/rohi/sections/capability-detail-sections";
import { ApproachSection } from "@/components/rohi/sections/approach-section";
import { WhyRohiSection } from "@/components/rohi/sections/why-rohi-section";
import { SolutionsSection } from "@/components/rohi/sections/solutions-section";
import { CustomSystemsSection } from "@/components/rohi/sections/custom-systems-section";
import { ProductsSection } from "@/components/rohi/sections/products-section";
import { CaseStudiesSection } from "@/components/rohi/sections/case-studies-section";
import { AboutSection } from "@/components/rohi/sections/about-section";
import { InsightsSection } from "@/components/rohi/sections/insights-section";
import { ContactSection } from "@/components/rohi/sections/contact-section";

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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Skip link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <HeroSection />
        <ProblemSection />
        <CapabilitiesSection />
        <SystemsSection />
        <AiSection />
        <AutomationSection />
        <DataSection />
        <ApproachSection />
        <WhyRohiSection />
        <SolutionsSection />
        <CustomSystemsSection />
        <ProductsSection />
        <CaseStudiesSection />
        <AboutSection />
        <InsightsSection />
        <ContactSection />
      </main>

      <SiteFooter />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
