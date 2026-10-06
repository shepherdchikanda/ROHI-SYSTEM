import type { Metadata } from "next";
import { ProductsSection } from "@/components/rohi/sections/products-section";
import { CtaBand } from "@/components/rohi/sections/cta-band";

export const metadata: Metadata = {
  title: "Products — Focused business systems",
  description:
    "ROHI SYSTEMS develops focused products that solve specific business problems. FIMS is in controlled development. Products are part of ROHI — they do not replace the company.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsSection />
      <CtaBand
        eyebrow="Products"
        heading="Interested in a ROHI SYSTEMS product?"
        lede="If a focused product could solve your problem, tell us what you're trying to improve. We'll let you know whether an existing or upcoming product fits."
        ctaLabel="Talk to us about products"
      />
    </>
  );
}
