import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ROHI SYSTEMS logo — uses the uploaded brand logo.
 * - tone="dark"  → dark mark on transparent bg (for light backgrounds: header)
 * - tone="light" → white mark + teal accent on transparent bg (for navy backgrounds: footer, hero)
 */
export function RohiLogo({
  tone = "dark",
  height = 40,
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src =
    tone === "light"
      ? "/rohi-logo-light-inv.png"
      : "/rohi-logo-light.png";
  // Logo aspect ratio is ~1.83:1 (720x393)
  const width = Math.round(height * 1.83);
  return (
    <Image
      src={src}
      alt="ROHI SYSTEMS — Intelligent Business Systems"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}
