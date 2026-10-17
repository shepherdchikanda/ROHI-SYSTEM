/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

export function RohiLogo({
  tone = "dark",
  height = 44,
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
  return (
    <img
      src={src}
      alt="ROHI SYSTEMS — Intelligent Business Systems"
      style={{ height, width: "auto" }}
      loading={priority ? "eager" : "lazy"}
      className={cn("select-none", className)}
    />
  );
}
