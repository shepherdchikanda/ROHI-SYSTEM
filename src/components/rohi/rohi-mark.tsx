import { cn } from "@/lib/utils";

/**
 * ROHI SYSTEMS logo mark.
 * Concept: fragmented nodes organizing into a structured connected system.
 * Used in header (on light) and footer (on navy).
 */
export function RohiMark({
  className,
  size = 32,
  tone = "navy",
}: {
  className?: string;
  size?: number;
  tone?: "navy" | "light" | "teal";
}) {
  const accent = "#20C7C9";
  const base =
    tone === "navy" ? "#0B1220" : tone === "light" ? "#FFFFFF" : "#20C7C9";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* nodes */}
      <rect x="5" y="5" width="6.5" height="6.5" rx="1.5" fill={accent} />
      <rect x="5" y="20.5" width="6.5" height="6.5" rx="1.5" fill={accent} />
      <rect
        x="20.5"
        y="5"
        width="6.5"
        height="6.5"
        rx="1.5"
        fill={base}
        fillOpacity={tone === "navy" ? 0.9 : 1}
      />
      <rect x="20.5" y="20.5" width="6.5" height="6.5" rx="1.5" fill={accent} />
      {/* pathways */}
      <path
        d="M8.25 11.5L8.25 20.5"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 8.25L20.5 8.25"
        stroke={base}
        strokeOpacity={tone === "navy" ? 0.5 : 1}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 23.75L20.5 23.75"
        stroke={base}
        strokeOpacity={tone === "navy" ? 0.5 : 1}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 11.5L20.5 20.5"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

/* Wordmark — used in header and footer */
export function RohiWordmark({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "light";
}) {
  return (
    <span
      className={cn(
        "font-sans text-base font-bold tracking-[0.04em] uppercase",
        tone === "light" ? "text-white" : "text-navy",
        className,
      )}
    >
      ROHI{" "}
      <span
        className={
          tone === "light" ? "text-white/55" : "text-ink-soft"
        }
      >
        SYSTEMS
      </span>
    </span>
  );
}
