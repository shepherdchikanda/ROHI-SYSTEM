import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { SectionHeader } from "./section-primitives";

/**
 * Page hero — top of each inner page. Provides spacing below the fixed
 * header and a consistent intro layout.
 */
export function PageHero({
  number,
  eyebrow,
  heading,
  lede,
  tone = "cloud",
}: {
  number: string;
  eyebrow: string;
  heading: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "cloud" | "navy";
}) {
  const toneClass =
    tone === "navy"
      ? "bg-navy text-white"
      : tone === "cloud"
        ? "bg-cloud text-ink"
        : "bg-background text-ink";
  return (
    <section className={cn("relative", toneClass)}>
      <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          heading={heading}
          lede={lede}
          tone={tone === "navy" ? "light" : "dark"}
        />
      </div>
    </section>
  );
}
