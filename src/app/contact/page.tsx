import type { Metadata } from "next";
import { ContactSection } from "@/components/rohi/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact — Have a business problem worth solving?",
  description:
    "Tell us what you are trying to improve. We start by understanding the problem — not by sending a quote. ROHI scopes solutions around the complexity, requirements and outcomes of your problem.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection />;
}
