import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PUBLISHED_INSIGHTS, getInsight } from "@/lib/insights";
import {
  Section,
  Container,
  Eyebrow,
} from "@/components/rohi/section-primitives";
import { CtaBand } from "@/components/rohi/sections/cta-band";
import { RohiButton } from "@/components/rohi/rohi-button";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title,
      description: insight.summary,
      type: "article",
      publishedTime: insight.date,
    },
  };
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight || !insight.published) notFound();

  // prev/next in published order (most-recent-first → "next" = older)
  const idx = PUBLISHED_INSIGHTS.findIndex((i) => i.slug === insight.slug);
  const newer = idx > 0 ? PUBLISHED_INSIGHTS[idx - 1] : null;
  const older =
    idx < PUBLISHED_INSIGHTS.length - 1 ? PUBLISHED_INSIGHTS[idx + 1] : null;

  return (
    <>
      {/* Article header */}
      <Section tone="cloud" className="pt-28 pb-10 sm:pt-36 sm:pb-12 lg:pt-40 lg:pb-16">
        <Container size="narrow">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-teal"
          >
            <ArrowLeft className="size-3.5" />
            All insights
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-navy/10 bg-background px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
              {insight.tag}
            </span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
              {fmtDate(insight.date)} · {insight.readingTime} read
            </span>
          </div>
          <h1 className="mt-5 font-sans text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {insight.summary}
          </p>
          <div className="mt-6 flex items-center gap-2 border-t border-navy/10 pt-4">
            <span className="size-7 rounded-full bg-navy/10" aria-hidden />
            <div>
              <p className="font-sans text-sm font-semibold text-ink">
                ROHI SYSTEMS
              </p>
              <p className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/60">
                Editorial
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Article body */}
      <Section tone="light" className="pb-20">
        <Container size="narrow">
          <article className="space-y-6">
            {insight.content.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="pt-4 font-sans text-2xl font-bold tracking-[-0.01em] text-ink"
                  >
                    {block.text}
                  </h2>
                );
              if (block.type === "p")
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-ink-soft sm:text-lg"
                  >
                    {block.text}
                  </p>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="space-y-2.5">
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-base leading-relaxed text-ink-soft sm:text-lg"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-teal"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-teal py-2 pl-5 font-sans text-xl font-bold leading-snug tracking-[-0.01em] text-ink sm:text-2xl"
                  >
                    {block.text}
                  </blockquote>
                );
              return null;
            })}
          </article>

          {/* Prev / Next */}
          <nav className="mt-14 grid gap-4 border-t border-navy/10 pt-8 sm:grid-cols-2">
            {newer ? (
              <Link
                href={`/insights/${newer.slug}`}
                className="group rounded-lg border border-navy/10 bg-cloud p-5 transition-colors hover:border-teal/40"
              >
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/60">
                  ← Newer
                </span>
                <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-teal">
                  {newer.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link
                href={`/insights/${older.slug}`}
                className="group rounded-lg border border-navy/10 bg-cloud p-5 text-right transition-colors hover:border-teal/40 sm:text-right"
              >
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/60">
                  Older →
                </span>
                <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-teal">
                  {older.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {/* Inline handoff */}
          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-navy/10 bg-cloud p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow tone="navy">Does this connect to your work?</Eyebrow>
              <p className="mt-2 font-sans text-lg font-semibold text-ink">
                Tell us what you&apos;re trying to improve.
              </p>
            </div>
            <RohiButton href="/contact" variant="solidNavy" size="md">
              Start a Conversation
            </RohiButton>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
