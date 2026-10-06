import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * ROHI SYSTEMS — shared section primitives.
 * Visual language: restrained, engineered, geometric.
 */

/* Eyebrow label — monospace, used above section headings */
export function Eyebrow({
  children,
  className,
  tone = "teal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "teal" | "navy" | "muted" | "light";
}) {
  const toneClass =
    tone === "teal"
      ? "text-teal"
      : tone === "navy"
        ? "text-navy"
        : tone === "light"
          ? "text-white/70"
          : "text-ink-soft";
  return (
    <span
      className={cn(
        "font-mono-tech inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]",
        toneClass,
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-70" aria-hidden />
      {children}
    </span>
  );
}

/* Section number — monospace, architectural detail */
export function SectionNumber({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "light";
}) {
  return (
    <span
      className={cn(
        "font-mono-tech text-xs font-medium tracking-widest",
        tone === "light" ? "text-white/40" : "text-ink-soft/60",
      )}
    >
      {children}
    </span>
  );
}

/* Heading — Manrope, tight tracking, strong weight */
export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}) {
  return (
    <Tag
      className={cn(
        "font-sans font-bold tracking-[-0.02em] text-balance",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* Lede — supporting paragraph */
export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-pretty leading-relaxed text-ink-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* Section wrapper — consistent vertical rhythm + max width */
export function Section({
  children,
  id,
  className,
  tone = "light",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "light" | "navy" | "cloud";
}) {
  const toneClass =
    tone === "navy"
      ? "bg-navy text-white"
      : tone === "cloud"
        ? "bg-cloud text-ink"
        : "bg-background text-ink";
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-20", toneClass, className)}
    >
      {children}
    </section>
  );
}

/* Container — consistent horizontal padding + max width */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const sizeClass =
    size === "wide"
      ? "max-w-[88rem]"
      : size === "narrow"
        ? "max-w-3xl"
        : "max-w-7xl";
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizeClass, className)}>
      {children}
    </div>
  );
}

/* Section header block — eyebrow + heading + optional lede */
export function SectionHeader({
  number,
  eyebrow,
  heading,
  lede,
  align = "left",
  tone = "dark",
  className,
}: {
  number?: string;
  eyebrow: string;
  heading: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        {number && (
          <SectionNumber tone={isLight ? "light" : "muted"}>
            {number}
          </SectionNumber>
        )}
        <Eyebrow tone={isLight ? "teal" : "navy"}>{eyebrow}</Eyebrow>
      </div>
      <SectionHeading
        className={cn(
          "text-3xl leading-[1.08] sm:text-4xl lg:text-5xl",
          isLight ? "text-white" : "text-ink",
        )}
      >
        {heading}
      </SectionHeading>
      {lede && (
        <Lede
          className={cn(
            "max-w-2xl text-lg",
            align === "center" && "mx-auto",
            isLight ? "text-white/70" : "text-ink-soft",
          )}
        >
          {lede}
        </Lede>
      )}
    </div>
  );
}
