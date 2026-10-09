import type { Metadata, } from "next";
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
  title: "Privacy Policy",
  description:
    "How ROHI SYSTEMS collects, stores and uses information on this website — contact enquiries, the AI assistant, newsletter, analytics and cookies. Honest, scoped to what is actually implemented.",
  alternates: { canonical: "/privacy" },
};

/* Inline sub-section block — matches the visual language of every other
   ROHI page: monospace number + eyebrow + Manrope heading + ink-soft prose. */
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
      <SectionHeading
        as="h2"
        className="mb-4 text-xl text-ink sm:text-2xl"
      >
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

export default function PrivacyPage() {
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
            eyebrow="Privacy"
            heading="Privacy Policy."
            lede="This policy explains what we collect on rohi.systems, how we store it, and what we do with it. It is scoped to what is actually implemented on this website — not aspirational language. If anything here is unclear, contact us and we will answer it directly."
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
            <Eyebrow tone="navy">The detail</Eyebrow>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <SubSection number="03" eyebrow="Data collection" title="What we collect.">
              <p>
                We collect a small, deliberate set of information on this
                website. There are five categories — and within each, only what
                the relevant feature actually needs.
              </p>
              <ul>
                <li>
                  <strong className="font-semibold text-ink">
                    Contact form.
                  </strong>{" "}
                  When you submit an enquiry, we collect the fields on the form:
                  Name, Company, Email, Phone / WhatsApp, What do you need?, Tell
                  us about the business problem, Current process, Current
                  technology, What would success look like?, Budget range, and
                  Preferred contact method. The form is the primary way we start
                  a conversation — those fields exist so we can respond
                  usefully, not to profile you.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Chatbot conversations.
                  </strong>{" "}
                  Messages you send to the ROHI assistant and the replies it
                  generates are stored so the conversation can continue and so
                  that, if you ask to be handed off to a person, our team has
                  the context you already shared.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Newsletter.
                  </strong>{" "}
                  Email address only — when you subscribe to receive ROHI
                  insights. No name, no company, no profile enrichment.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Analytics.
                  </strong>{" "}
                  If you opt in via the cookie banner, we record anonymous,
                  aggregated events (page views, outbound button clicks, form
                  submissions). No personally identifiable information is sent.
                  No third-party advertising or marketing trackers run on this
                  site.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Cookies.
                  </strong>{" "}
                  Essential cookies only are set by default — the minimum
                  needed for the site to function (including remembering your
                  cookie consent choice). Analytics cookies are set only with
                  your permission.
                </li>
              </ul>
            </SubSection>

            <SubSection number="04" eyebrow="Storage" title="How we store it.">
              <p>
                Enquiries, newsletter subscriptions and chat transcripts handed
                off to our team are stored in a local SQLite database on our own
                server. We do not sell, rent or trade the information you submit
                here. The only external flow is to the large language model (LLM)
                API that powers the chatbot — your messages are transmitted to
                that provider so it can generate replies. See the AI assistant
                section below and the Third-party services section for what that
                means in practice.
              </p>
            </SubSection>

            <SubSection number="05" eyebrow="Use" title="How we use it.">
              <p>We use what you submit for the thing you submitted it for:</p>
              <ul>
                <li>
                  To respond to your enquiry — by email, phone or WhatsApp,
                  using the contact method you chose.
                </li>
                <li>
                  To give our team the context of your chatbot conversation
                  when you ask to be handed off, so you don&apos;t have to repeat
                  yourself.
                </li>
                <li>
                  To send ROHI insights to subscribers who opted in — and only
                  to them.
                </li>
                <li>
                  To improve the site using consent-gated, anonymous analytics —
                  never by identifying individuals.
                </li>
              </ul>
            </SubSection>

            <SubSection
              number="06"
              eyebrow="Third parties"
              title="Third-party services."
            >
              <p>
                Three third-party services are involved in how this site works:
              </p>
              <ul>
                <li>
                  <strong className="font-semibold text-ink">
                    LLM API (chatbot).
                  </strong>{" "}
                  Messages you send to the ROHI assistant are transmitted to a
                  third-party large language model provider in order to generate
                  replies. We do not control that provider&apos;s data retention
                  practices — what they keep, and for how long, is governed by
                  their terms. We pass only the conversation needed to produce a
                  useful reply.
                </li>
                <li>
                  <strong className="font-semibold text-ink">WhatsApp.</strong>{" "}
                  If you click the WhatsApp button, you leave rohi.systems and
                  enter WhatsApp&apos;s service. WhatsApp&apos;s terms and
                  privacy policy apply to that conversation. We do not control
                  how WhatsApp stores or processes messages.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Analytics &amp; advertising.
                  </strong>{" "}
                  None. We do not run third-party analytics, advertising or
                  marketing trackers on this website. The only analytics we run
                  is our own, opt-in, and anonymous.
                </li>
              </ul>
            </SubSection>

            <SubSection
              number="07"
              eyebrow="AI assistant"
              title="How the AI assistant handles conversations."
            >
              <p>
                The ROHI assistant on this site is powered by a third-party LLM
                API. Here is the honest summary — see{" "}
                <Link href="/ai-notice">the AI Notice</Link> for the full version.
              </p>
              <ul>
                <li>
                  <strong className="font-semibold text-ink">Collected.</strong>{" "}
                  Your messages to the assistant, and the handoff summary built
                  from them if you ask to talk to a person.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Why.</strong> To
                  answer your questions about ROHI and to give our team the
                  context you already shared when you decide to talk to a
                  person.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Processed by.
                  </strong>{" "}
                  A third-party LLM API. ROHI does not run its own model.
                </li>
                <li>
                  <strong className="font-semibold text-ink">Stored.</strong>{" "}
                  The conversation is kept in your browser&apos;s localStorage
                  so it persists across page loads; if you hand off to a person,
                  the transcript and summary are stored in our database.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Human review.
                  </strong>{" "}
                  Only on handoff. The ROHI team does not read chat
                  conversations you don&apos;t hand off.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Data leaving Mozambique.
                  </strong>{" "}
                  Yes — the LLM API processes messages externally, outside
                  Mozambique. The provider&apos;s retention and processing are
                  governed by their terms.
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    Model training.
                  </strong>{" "}
                  No. ROHI does not train on your conversations. Whether the
                  LLM provider uses inputs for its own training is governed by
                  their terms and is outside our control.
                </li>
              </ul>
              <p>
                Do not share passwords, credentials or other sensitive
                information with the chatbot. Treat it as a conversation with a
                helpful stranger, not as a secure channel.
              </p>
            </SubSection>

            <SubSection number="08" eyebrow="Cookies" title="Cookies.">
              <p>
                Essential cookies are set by default — the minimum needed for
                the site to function, including remembering your cookie consent
                choice. Analytics cookies are set only if you opt in via the
                cookie banner. We do not run marketing cookies or advertising
                trackers. See{" "}
                <Link href="/cookies">the Cookies Policy</Link> for the full
                detail, including the list of cookies and their purpose. You can
                change your choice at any time using the cookie preferences
                button in the footer.
              </p>
            </SubSection>

            <SubSection number="09" eyebrow="Your rights" title="Your rights.">
              <p>You can, at any time:</p>
              <ul>
                <li>Ask what information we hold about you;</li>
                <li>Ask us to correct information that is wrong;</li>
                <li>Ask us to delete the information we hold about you;</li>
                <li>Opt out of analytics — by changing your cookie preference;</li>
                <li>
                  Unsubscribe from the newsletter — using the link in any email
                  we send, or by contacting us.
                </li>
              </ul>
              <p>
                To exercise any of these, contact us via{" "}
                <Link href="/contact">the contact page</Link> or by email at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
                We will respond promptly — there is no benefit to us in holding
                information you don&apos;t want us to hold.
              </p>
            </SubSection>

            <SubSection number="10" eyebrow="Children" title="Children.">
              <p>
                This website is not intended for anyone under 16. We do not
                knowingly collect information from minors. If you believe a
                minor has submitted information to us, contact us and we will
                delete it.
              </p>
            </SubSection>

            <SubSection number="11" eyebrow="Changes" title="Changes to this policy.">
              <p>
                We may update this policy as the website evolves. The{" "}
                <em>Last revised</em> date at the top of this page reflects the
                most recent change. We will not materially reduce your rights
                under this policy without clear notice on the site.
              </p>
            </SubSection>

            <SubSection number="12" eyebrow="Contact" title="Contact.">
              <p>
                Questions about this policy, or about information we hold about
                you? Contact us through{" "}
                <Link href="/contact">the contact page</Link> or by email at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
                We will answer directly — not with a form letter.
              </p>
            </SubSection>
          </div>
        </Container>
      </Section>

      {/* 13 — CTA */}
      <CtaBand
        eyebrow="Privacy"
        heading="Have a question about how we handle data?"
        lede="If something here is unclear, or specific to your project, the fastest path is a conversation. We answer directly — no form letter, no runaround."
        ctaLabel="Start a Conversation"
        href="/contact"
      />
    </>
  );
}
