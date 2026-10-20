import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section, SectionHeading, SectionHeader } from "@/components/rohi/section-primitives";
import { CtaBand } from "@/components/rohi/sections/cta-band";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How ROHI SYSTEMS uses cookies and local storage: essential only by default, analytics opt-in, no marketing cookies. How to manage your preferences.",
  alternates: { canonical: "/cookies" },
};

function SubSection({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <article className="max-w-3xl">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">{number}</span>
        <span className="h-px w-6 bg-navy/15" aria-hidden="true" />
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
      </div>
      <SectionHeading as="h2" className="mb-4 text-xl font-bold text-ink">{title}</SectionHeading>
      <div className="space-y-4 text-ink-soft leading-relaxed">{children}</div>
    </article>
  );
}

export default function CookiePolicyPage() {
  return (
    <>
      <Section tone="cloud" className="pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeader eyebrow="Cookie Policy" heading="How we use cookies and local storage." lede="This site uses the minimum storage needed to function. By default, that is essential only. Analytics is opt-in and anonymous. No marketing cookies. No third-party tracking pixels." />
          <p className="mt-6 font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft/70">Last revised: October 2026</p>
        </Container>
      </Section>
      <Section tone="light" className="pb-20">
        <Container>
          <div className="space-y-12">
            <SubSection number="01" eyebrow="The basics" title="What cookies and local storage are">
              <p>A cookie is a small file a website places in your browser. Local storage is similar. Both are normal web mechanisms. The question is how a site uses them: to function, or to track you.</p>
              <p>ROHI&apos;s principle is to use the minimum storage necessary to run the site, and to make anything beyond that opt-in.</p>
            </SubSection>
            <SubSection number="02" eyebrow="Categories" title="The three categories we use">
              <p>We distinguish three categories:</p>
              <ul className="list-disc space-y-3 pl-5">
                <li><span className="font-medium text-ink">Essential (always on).</span> The minimum storage needed for the site to function: remembering your theme preference and your consent choice. This site sets zero cookies — essential state lives in browser storage (localStorage). These entries cannot be turned off.</li>
                <li><span className="font-medium text-ink">Analytics (opt-in).</span> If you accept, the site records anonymous events — page views, which CTAs are clicked, whether the chatbot is opened, form submissions. No cookies. No PII. We do not intentionally collect or store IP addresses. The server&apos;s rate-limiter sees the visitor IP for spam prevention but does not persist it to the analytics database. If you decline, no analytics events are recorded at all.</li>
                <li><span className="font-medium text-ink">Marketing (not used).</span> We do not run any marketing or advertising trackers. No advertising networks, no retargeting pixels, no social-media tracking. This category is always off.</li>
              </ul>
            </SubSection>
            <SubSection number="03" eyebrow="Durations" title="How long data is kept">
              <ul className="list-disc space-y-2 pl-5">
                <li><span className="font-medium text-ink">Essential storage</span> persists in your browser until you clear your browser data. It contains your theme choice, your consent state, and a few chat-related entries (see below).</li>
                <li><span className="font-medium text-ink">Analytics events</span> are stored on our server as anonymous records. They contain no identifier that links back to you as a person.</li>
                <li><span className="font-medium text-ink">Chatbot conversation history</span> is stored in your browser&apos;s local storage only — so you can resume a conversation. ROHI does not store your conversation on its side unless you click &quot;Start a Conversation&quot; to hand off to the team. However, the messages you send are transmitted to the AI model provider on each turn to generate replies — this is how the assistant works (see the <Link href="/ai-notice" className="font-medium text-ink underline underline-offset-4 hover:text-teal">AI Assistant Notice</Link>). Chat history in your browser auto-expires after 48 hours. You can also clear it immediately with the &quot;Reset&quot; button in the chat.</li>
              </ul>
              <p>The actual browser-storage keys this site uses are:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><code className="font-mono-tech text-[13px] text-ink">rohi-consent</code> — your consent state (necessary; localStorage).</li>
                <li><code className="font-mono-tech text-[13px] text-ink">rohi-chat-messages-v2</code> — chat conversation history (48-hour expiry; localStorage).</li>
                <li><code className="font-mono-tech text-[13px] text-ink">rohi-chat-saved-at-v2</code> — timestamp used for the 48-hour expiry check (localStorage).</li>
                <li><code className="font-mono-tech text-[13px] text-ink">rohi-chat-session</code> — a random session ID for the chat (sessionStorage — cleared when the browser tab closes).</li>
                <li><code className="font-mono-tech text-[13px] text-ink">rohi-chat-handoff</code> — the temporary summary passed to the contact form when you hand off (sessionStorage — cleared immediately after use).</li>
                <li><code className="font-mono-tech text-[13px] text-ink">theme</code> — your theme preference, light or dark (localStorage).</li>
              </ul>
              <p>This is the complete list. The site does not set any cookies.</p>
            </SubSection>
            <SubSection number="04" eyebrow="Third parties" title="Third-party cookies">
              <p>This site does not set third-party cookies. The fonts are loaded from the Google Fonts CDN, which does not set tracking cookies. The AI chatbot&apos;s responses are generated by a third-party LLM API; that provider processes your messages to generate replies but does not place cookies on your browser through our site.</p>
              <p>If you click the WhatsApp button, you leave our site and enter WhatsApp, which is governed by WhatsApp&apos;s own terms and cookie practices.</p>
            </SubSection>
            <SubSection number="05" eyebrow="Consent" title="How consent works">
              <p>The first time you visit, a consent banner appears. You can:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><span className="font-medium text-ink">Accept all</span> — enables anonymous analytics.</li>
                <li><span className="font-medium text-ink">Reject non-essential</span> — keeps only essential storage; no analytics.</li>
                <li><span className="font-medium text-ink">Manage preferences</span> — toggle analytics on or off individually.</li>
              </ul>
              <p>Your choice is remembered. You can change it at any time by clicking <span className="font-mono-tech text-ink">Cookie preferences</span> in the site footer, which re-opens the banner.</p>
            </SubSection>
            <SubSection number="06" eyebrow="Your browser" title="Managing storage in your browser">
              <p>You can also control browser storage through your browser settings. Most browsers let you view, block, or delete stored entries site by site. Note that blocking all browser storage (including essential entries) will prevent the site from remembering your theme and consent state, so the consent banner will appear again on each visit.</p>
            </SubSection>
            <SubSection number="07" eyebrow="Contact" title="Questions">
              <p>If anything here is unclear, contact us through the <Link href="/contact" className="font-medium text-ink underline underline-offset-4 hover:text-teal">contact page</Link> or by email at <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-ink underline underline-offset-4 hover:text-teal">{SITE_CONFIG.email}</a>. See also our <Link href="/privacy" className="font-medium text-ink underline underline-offset-4 hover:text-teal">Privacy Policy</Link> for how the underlying information is handled.</p>
            </SubSection>
          </div>
        </Container>
      </Section>
      <CtaBand eyebrow="Cookie question?" heading="Ask the ROHI team." lede="If anything in this policy is unclear, or you want to ask about how data is handled, the fastest way is a conversation." ctaLabel="Start a Conversation" href="/contact" />
    </>
  );
}
