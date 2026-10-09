import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section, SectionHeading, SectionHeader } from "@/components/rohi/section-primitives";
import { CtaBand } from "@/components/rohi/sections/cta-band";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AI Assistant Notice",
  description: "How the ROHI SYSTEMS AI assistant works: what it collects, how conversations are processed and stored, third-party AI providers, retention, and your rights.",
  alternates: { canonical: "/ai-notice" },
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

export default function AiNoticePage() {
  return (
    <>
      <Section tone="cloud" className="pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeader eyebrow="AI Assistant Notice" heading="How the ROHI AI assistant works." lede="The AI assistant on this site helps visitors understand what ROHI builds, explore business problems, and decide whether to start a conversation. This notice explains exactly how it handles information — so you know what you're sharing and what happens to it." />
          <p className="mt-6 font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft/70">Last revised: October 2026</p>
        </Container>
      </Section>
      <Section tone="light" className="pb-20">
        <Container>
          <div className="space-y-12">
            <SubSection number="01" eyebrow="What's collected" title="What information the assistant collects">
              <p>When you use the chatbot, we collect the messages you send. You may share: your name, company, email, phone or WhatsApp, industry, the business problem you're describing, your current process, your current technology, and what success would look like. Some of this can be commercially sensitive even if it isn't legally &quot;sensitive personal data.&quot;</p>
              <p>The assistant does not collect your account credentials, API keys, payment details, or anything else you don&apos;t type into it.</p>
            </SubSection>
            <SubSection number="02" eyebrow="Why" title="Why it's collected">
              <p>Two purposes only: to generate a useful response to your question, and — if you choose to start a conversation — to give the ROHI team the context you&apos;ve already shared, so you don&apos;t have to repeat yourself.</p>
            </SubSection>
            <SubSection number="03" eyebrow="Processing" title="How the AI processes it">
              <p>The assistant is powered by a large language model (LLM) provided by a third-party AI service. To generate a reply, the messages you send are transmitted to that API, which processes them and returns a response. The system prompt instructs the assistant to use ROHI&apos;s confirmed knowledge base as its source of truth and to refuse to invent information beyond it.</p>
            </SubSection>
            <SubSection number="04" eyebrow="Storage" title="Whether conversations are stored">
              <p>Conversation history is stored in <span className="font-medium text-ink">your browser&apos;s local storage</span> only — so you can resume a conversation on a return visit. It does not leave your device unless you take an action.</p>
              <p>If you click <span className="font-medium text-ink">&quot;Start a Conversation&quot;</span> in the chat, a summary and the transcript of the conversation are saved to ROHI&apos;s database so the team has the context. If you never hand off, no transcript is saved on our side.</p>
            </SubSection>
            <SubSection number="05" eyebrow="Retention" title="How long conversations are retained">
              <p>Your browser&apos;s local copy persists until you clear browser data or use the &quot;Reset&quot; button in the chat. Transcripts saved on handoff are kept until you request deletion, or until they are no longer needed for the enquiry they relate to.</p>
            </SubSection>
            <SubSection number="06" eyebrow="Human review" title="Whether humans can review conversations">
              <p>Yes — when you hand off to start a conversation, the ROHI team reads the summary and transcript so they can follow up with the full context. No one at ROHI reads your conversations without you initiating that handoff.</p>
            </SubSection>
            <SubSection number="07" eyebrow="Third-party AI" title="Third-party AI providers">
              <p>Yes. The assistant uses a third-party LLM API provider to generate responses. That provider processes the messages you send. We do not control the provider&apos;s own retention or processing policies beyond our own configuration.</p>
            </SubSection>
            <SubSection number="08" eyebrow="International" title="Whether data leaves Mozambique">
              <p>Yes, potentially. The LLM API provider processes messages externally, and those servers may be outside Mozambique. We do not claim that conversations stay in Mozambique, because that would not be accurate for a third-party AI API. If your conversation contains sensitive commercial information, treat it as you would any message sent to an external service — and avoid sharing credentials, secrets, or anything truly confidential.</p>
            </SubSection>
            <SubSection number="09" eyebrow="Model training" title="Whether conversations are used to train models">
              <p>No. ROHI does not use your conversations to train AI models. Whether the third-party LLM provider uses inputs to train its own models is governed by that provider&apos;s terms, not ours. If this matters to you, do not share information you would not want processed by a third-party AI service.</p>
            </SubSection>
            <SubSection number="10" eyebrow="Your rights" title="Access, correction, and deletion">
              <p>You can request access to, correction of, or deletion of any conversation transcript we hold from a handoff. To do so, contact us through the <Link href="/contact" className="font-medium text-ink underline underline-offset-4 hover:text-teal">contact page</Link> or by email at <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-ink underline underline-offset-4 hover:text-teal">{SITE_CONFIG.email}</a>.</p>
            </SubSection>
            <SubSection number="11" eyebrow="Limitations" title="What the assistant cannot do">
              <p>AI-generated responses may be incomplete, inaccurate, or outdated. The assistant is designed to stay within ROHI&apos;s confirmed knowledge base and to say when it doesn&apos;t have enough information — but you should review any AI-generated answer before using it for an important business decision.</p>
              <p>The assistant does not provide legal, financial, or professional advice. It is not a substitute for the ROHI team. For anything that matters, start a conversation and a person will follow up.</p>
            </SubSection>
            <SubSection number="12" eyebrow="Safety" title="What not to share">
              <p>Do not share through the chatbot: passwords, banking credentials, API keys, authentication tokens, private keys, or other sensitive credentials. If you share something sensitive by accident, tell us and we will delete it from our records.</p>
            </SubSection>
          </div>
        </Container>
      </Section>
      <CtaBand eyebrow="AI & data" heading="Have a question about how the assistant works?" lede="If this notice doesn't cover something, ask us. We take data handling seriously because ROHI builds systems that handle other people's data too." ctaLabel="Start a Conversation" href="/contact" />
    </>
  );
}
