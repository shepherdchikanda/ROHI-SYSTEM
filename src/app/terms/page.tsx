import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  SectionHeading,
} from "@/components/rohi/section-primitives";
import { CtaBand } from "@/components/rohi/sections/cta-band";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of the ROHI SYSTEMS website and engagements with ROHI — services, payments, IP, AI limitations, liability, termination, governing law. Honest, scoped to what we actually do.",
  alternates: { canonical: "/terms" },
};

/* Inline sub-section block — same pattern used across ROHI legal pages. */
function SubSection({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-navy/10 pt-8 sm:pt-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
          {number}
        </span>
        <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
      </div>
      <SectionHeading as="h2" className="mb-4 text-xl text-ink sm:text-2xl">
        {title}
      </SectionHeading>
      <div
        className="max-w-3xl text-ink-soft leading-relaxed
                   [&_a]:font-medium [&_a]:text-teal [&_a:hover]:underline
                   [&_p:not(:first-child)]:mt-4
                   [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                   [&_li]:marker:text-navy/40"
      >
        {children}
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      {/* 01 — Intro */}
      <Section
        tone="cloud"
        className="pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20"
      >
        <Container>
          <SectionHeader
            number="01"
            eyebrow="Terms"
            heading="Terms of Service."
            lede="These terms govern your use of rohi.systems and the basis on which ROHI SYSTEMS works with clients. They are written plainly — what we do, what we don't promise, and where responsibility sits. Specific engagements are governed by their own agreement, which prevails over these general terms where they differ."
          />
          <p className="mt-8 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/70">
            Last revised: October 2026
          </p>
        </Container>
      </Section>

      {/* 02 — Body */}
      <Section tone="light" className="pb-24 pt-4 sm:pb-28">
        <Container>
          <div className="mb-10 flex items-center gap-3 sm:mb-12">
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
              02
            </span>
            <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
            <Eyebrow tone="navy">The clauses</Eyebrow>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <SubSection
              number="03"
              eyebrow="Acceptance"
              title="Acceptance of terms."
            >
              <p>
                By accessing or using rohi.systems you accept these terms. If
                you do not accept them, do not use the site. For client
                engagements, these general terms apply alongside the specific
                engagement agreement — where they conflict, the engagement
                agreement prevails.
              </p>
            </SubSection>

            <SubSection
              number="04"
              eyebrow="Usage"
              title="Website usage."
            >
              <p>
                The website is provided &ldquo;as is.&rdquo; You agree not to
                misuse it — not to attempt to breach its security, interfere
                with its operation, scrape content at scale, or use it to send
                unsolicited communications. You agree to comply with applicable
                law when using the site.
              </p>
            </SubSection>

            <SubSection
              number="05"
              eyebrow="Services"
              title="Services."
            >
              <p>
                ROHI SYSTEMS offers work across six capability areas: Business
                Systems, AI &amp; Intelligence, Automation, Data &amp;
                Analytics, Digital Foundations, and Custom Solutions, with
                Support &amp; Maintenance for systems we build. The specific
                deliverables, scope, timeline and price for any engagement are
                defined in the engagement agreement for that engagement — which
                prevails over any general description on this website.
              </p>
            </SubSection>

            <SubSection
              number="06"
              eyebrow="Payments"
              title="Payments."
            >
              <p>
                Fees are scoped per engagement, based on complexity,
                requirements, integrations and outcomes. There is no public
                price list. Quotes are issued after a real discovery
                conversation — not before. Payment terms (milestones,
                schedule, currency) are defined in the engagement agreement.
              </p>
            </SubSection>

            <SubSection
              number="07"
              eyebrow="Recurring"
              title="Subscriptions &amp; recurring services."
            >
              <p>
                Where an engagement includes recurring services — support,
                maintenance, monitoring, hosted components — the subscription
                terms (scope, fees, renewal, cancellation notice) are defined
                in the engagement agreement for that engagement. Cancellation
                notice is governed by that agreement.
              </p>
            </SubSection>

            <SubSection
              number="08"
              eyebrow="Intellectual property"
              title="Intellectual property."
            >
              <p>
                Custom work created for a client under an engagement agreement
                is transferred to the client as defined in that agreement.
                ROHI retains ownership of its tools, frameworks, pre-existing
                IP, and methodologies developed before or independently of the
                engagement — these remain ROHI&apos;s even when used in a
                client project. The content of this website (copy, design,
                diagrams, marks) is &copy; ROHI SYSTEMS.
              </p>
            </SubSection>

            <SubSection
              number="09"
              eyebrow="Client"
              title="Client responsibilities."
            >
              <p>To work effectively, ROHI expects clients to:</p>
              <ul>
                <li>Provide accurate information about the problem and context;</li>
                <li>Have the authority to act on decisions relevant to the engagement;</li>
                <li>Give timely access to people, systems and information needed to do the work;</li>
                <li>Comply with applicable laws, including those relevant to data we may process on the client&apos;s behalf.</li>
              </ul>
            </SubSection>

            <SubSection
              number="10"
              eyebrow="Third-party & AI"
              title="Third-party &amp; AI services."
            >
              <p>
                Some ROHI services use third-party APIs and AI components —
                including, on this website, the ROHI assistant. ROHI does not
                control the availability, accuracy or output of those
                third-party services. Where a third-party service is integral
                to an engagement, that dependency is identified in the
                engagement agreement.
              </p>
            </SubSection>

            <SubSection
              number="11"
              eyebrow="AI limitations"
              title="AI limitations &amp; disclosure."
            >
              <p>
                AI features on this site, including the ROHI assistant,
                generate responses based on available information. Those
                responses may be incomplete, inaccurate, or outdated. Review
                any AI-generated response before relying on it for an
                important decision. ROHI does not claim AI capabilities that
                have not been built — what you see is what exists.
              </p>
              <p>
                Do not share passwords, credentials, or other sensitive
                information via the chatbot. ROHI does not guarantee the
                accuracy, feasibility, or outcomes of AI-generated responses.
                See the{" "}
                <Link href="/ai-notice">AI Notice</Link> for the full
                statement.
              </p>
            </SubSection>

            <SubSection
              number="12"
              eyebrow="Liability"
              title="Liability."
            >
              <p>
                The services and the website are provided &ldquo;as is&rdquo;
                without warranties of any kind, express or implied. To the
                extent permitted by law, ROHI&apos;s liability for any
                engagement is limited to the fees paid for that specific
                engagement. ROHI is not liable for indirect, incidental, or
                consequential damages arising from the use of the website or
                services.
              </p>
            </SubSection>

            <SubSection
              number="13"
              eyebrow="Termination"
              title="Termination."
            >
              <p>
                Either party may terminate an engagement per the notice period
                defined in the engagement agreement. The website may be
                modified, suspended, or discontinued with reasonable notice.
                Clauses that by their nature should survive termination
                (intellectual property, liability, governing law, for example)
                survive.
              </p>
            </SubSection>

            <SubSection
              number="14"
              eyebrow="Governing law"
              title="Governing law."
            >
              <p>
                These terms and any engagement with ROHI SYSTEMS are governed
                by the laws of Mozambique. Any dispute is subject to the
                jurisdiction of the Mozambican courts, except where an
                engagement agreement specifies otherwise.
              </p>
            </SubSection>

            <SubSection
              number="15"
              eyebrow="Changes"
              title="Changes to these terms."
            >
              <p>
                ROHI may update these terms. The <em>Last revised</em> date at
                the top of this page reflects the most recent change. Continued
                use of the website after a change constitutes acceptance of
                the updated terms. For client engagements, the engagement
                agreement in force governs — these website terms do not
                retroactively change a signed agreement.
              </p>
              <p>
                Questions about these terms? Contact us via{" "}
                <Link href="/contact">the contact page</Link> or email at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
              </p>
            </SubSection>
          </div>
        </Container>
      </Section>

      {/* 16 — CTA */}
      <CtaBand
        eyebrow="Terms"
        heading="Have a question about working with ROHI?"
        lede="Terms are the baseline — the real shape of an engagement is defined by the engagement agreement, written around your problem. Tell us what you're trying to improve and we'll talk it through."
        ctaLabel="Start a Conversation"
        href="/contact"
      />
    </>
  );
}
