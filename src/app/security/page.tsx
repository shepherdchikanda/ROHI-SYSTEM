import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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
  title: "Security & Data Protection",
  description:
    "The controls ROHI SYSTEMS actually implements on this website — transport, storage, access, cookies, monitoring — and what we do not claim. Our approach to Mozambique's digital framework, honestly stated, not a compliance certification.",
  alternates: { canonical: "/security" },
};

/* BodySection — same visual language as SubSection on the other legal pages.
   Named BodySection here to distinguish the honest "what we actually do"
   register on the security page. */
function BodySection({
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

export default function SecurityPage() {
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
            eyebrow="Security"
            heading="Security & data protection."
            lede="This page describes the security controls actually implemented on rohi.systems today, and the controls ROHI scopes per engagement for client systems. It is not a marketing page — it is an honest statement. Where we don't do something, we say so."
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
            <Eyebrow tone="navy">The controls</Eyebrow>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <BodySection
              number="03"
              eyebrow="Transport"
              title="Transport."
            >
              <p>
                Traffic between your browser and this website is encrypted
                with HTTPS, terminated at the gateway in front of the
                application server. Plain HTTP requests are upgraded to HTTPS.
              </p>
            </BodySection>

            <BodySection
              number="04"
              eyebrow="Storage"
              title="Data storage."
            >
              <p>
                Enquiries, newsletter subscriptions and chat transcripts handed
                off to our team are stored in a local SQLite database on our own
                server — not in a public cloud SaaS, not in a shared
                multi-tenant store. The only external data flow is to the LLM
                API that powers the chatbot, to generate replies. We do not sell
                or share the information you submit here.
              </p>
            </BodySection>

            <BodySection
              number="05"
              eyebrow="Access"
              title="Authentication & access."
            >
              <p>
                There are no visitor accounts on the marketing site. There is
                nothing to log in to. Access to the data we collect is limited
                to ROHI team members who need it to respond to your enquiry or
                to manage the site. Authentication, role-based access and audit
                for client systems are scoped per engagement — the controls
                appropriate to a given system depend on its risk profile and
                are defined in the engagement agreement.
              </p>
            </BodySection>

            <BodySection
              number="06"
              eyebrow="Isolation"
              title="Data isolation."
            >
              <p>
                There is no public multi-tenant SaaS platform here. We do not
                host one client&apos;s data alongside another&apos;s in a
                shared application with shared access. For client engagements,
                data isolation is designed per engagement — including, where
                applicable, separate databases, separate deployments, and
                isolation between environments.
              </p>
            </BodySection>

            <BodySection
              number="07"
              eyebrow="Cookies & analytics"
              title="Cookies & analytics."
            >
              <p>
                Cookies on this site are minimal. Essential cookies are set by
                default; analytics cookies are set only with your opt-in. The
                analytics we run is anonymous and aggregated — no personally
                identifiable information, no third-party advertising trackers.
                See{" "}
                <Link href="/privacy">the Privacy Policy</Link> for what
                analytics we collect and how, and the cookie banner (footer)
                to change your choice.
              </p>
            </BodySection>

            <BodySection
              number="08"
              eyebrow="Backups"
              title="Backups."
            >
              <p>
                Backups for the rohi.systems database are operational, not
                advertised. We do not claim a Recovery Time Objective (RTO) or
                Recovery Point Objective (RPO) for this website. Backup
                strategy, retention and recovery testing for client systems are
                scoped per engagement and stated in the engagement agreement.
              </p>
            </BodySection>

            <BodySection
              number="09"
              eyebrow="Monitoring"
              title="Monitoring."
            >
              <p>
                We run basic operational monitoring on this site — enough to
                know when something is broken. We do not operate a 24/7
                Security Operations Centre (SOC) for the marketing site. For
                client systems, monitoring depth is scoped per engagement.
              </p>
            </BodySection>

            <BodySection
              number="10"
              eyebrow="Practices"
              title="Security practices."
            >
              <p>
                Internally, we work on the principles of least privilege,
                scoped access, and change review — access is granted to do a
                specific job, and removed when the job is done. Changes to
                production are reviewed before deployment. These are practices,
                not certifications.
              </p>
            </BodySection>

            {/* Explicit "what we don't claim" panel — visually distinct so
                a visitor scanning the page cannot miss it. */}
            <div className="rounded-xl border border-navy/15 bg-cloud p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-navy text-teal">
                  <ShieldCheck className="size-4" aria-hidden />
                </span>
                <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
                  What we don&apos;t claim
                </span>
              </div>
              <SectionHeading
                as="h3"
                className="mb-4 text-xl text-ink sm:text-2xl"
              >
                Honest boundaries.
              </SectionHeading>
              <div
                className="max-w-3xl text-ink-soft leading-relaxed
                           [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                           [&_li]:marker:text-navy/40"
              >
                <ul>
                  <li>
                    <strong className="font-semibold text-ink">
                      No SOC 2 or ISO 27001.
                    </strong>{" "}
                    ROHI has not completed a SOC 2 Type I/II or ISO 27001
                    certification. We do not claim them.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">
                      No multi-tenant SaaS platform.
                    </strong>{" "}
                    We do not operate a public multi-tenant SaaS — there is no
                    shared platform where one client&apos;s data sits beside
                    another&apos;s behind a single login.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">
                      No AI accuracy guarantee.
                    </strong>{" "}
                    The ROHI assistant on this site is a general-purpose LLM
                    service. We do not guarantee its responses are accurate,
                    complete, or suitable for your decisions. Review before you
                    rely on it. See the{" "}
                    <Link href="/ai-notice">AI Notice</Link>.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">
                      No encryption-at-rest beyond SQLite + host filesystem.
                    </strong>{" "}
                    The rohi.systems database relies on the host filesystem&apos;s
                    protections, not a separate application-layer encryption
                    layer. Stronger encryption-at-rest for client systems is
                    scoped per engagement.
                  </li>
                </ul>
              </div>
            </div>

            <BodySection
              number="11"
              eyebrow="Compliance"
              title="Our approach to Mozambique's digital framework."
            >
              <p>
                ROHI SYSTEMS is committed to responsible, secure and
                transparent technology practices. We design systems with
                applicable Mozambican requirements and recognized security
                principles in mind. The framework we track includes:
              </p>
              <ul>
                <li>
                  <strong className="font-semibold text-ink">
                    Electronic Transactions Law (Law 3/2017).
                  </strong>{" "}
                  The foundation for electronic signatures, records and
                  transactions in Mozambique.
                </li>
                <li>
                  <strong className="font-semibold text-ink">INTIC.</strong>{" "}
                  The national regulator for electronic systems. Our
                  classification under INTIC is being determined. We do not
                  claim a registration we have not been granted.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Cybersecurity Law &amp; Cybercrime Law (2026, in force).
                  </strong>{" "}
                  We design with these in view, including obligations relevant
                  to operators of systems and to incident handling.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Pending Data Protection Law.
                  </strong>{" "}
                  Mozambique&apos;s standalone data protection framework is in
                  development. We are designing around its expected principles
                  now — not waiting for it to land.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Cloud Computing &amp; Data Centre regulations.
                  </strong>{" "}
                  We reassess applicability per engagement when a deployment
                  touches cloud or hosted infrastructure.
                </li>
              </ul>
              <p>
                ROHI works with Mozambican legal counsel for specific
                validation on client engagements. This page is an honest
                statement of approach — not a compliance certification. We do
                not claim certifications or registrations we have not been
                granted.
              </p>
            </BodySection>

            <BodySection
              number="12"
              eyebrow="Vulnerability disclosure"
              title="Reporting a vulnerability."
            >
              <p>
                If you believe you have found a security vulnerability in
                rohi.systems, please report it responsibly — give us reasonable
                time to respond before any public disclosure. Contact us
                through{" "}
                <Link href="/contact">the contact page</Link> or by email at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
                We will acknowledge receipt and engage seriously. We do not
                pursue good-faith reporters.
              </p>
            </BodySection>
          </div>
        </Container>
      </Section>

      {/* 13 — CTA */}
      <CtaBand
        eyebrow="Security"
        heading="Have a security question for your project?"
        lede="Security for systems we build is scoped per engagement. Tell us about your requirements and we'll address them in the proposal — including the controls, the boundaries, and the things we'd recommend you do not skip."
        ctaLabel="Start a Conversation"
        href="/contact"
      />
    </>
  );
}
