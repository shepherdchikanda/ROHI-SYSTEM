import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ROHI SYSTEMS — CTA buttons.
 * Most CTAs are anchor links to sections on the same page (#contact, etc.).
 */
const rohiButtonVariants = cva(
  "group/cta inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap rounded-md transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary — electric teal on dark, navy on light
        primary:
          "bg-teal text-navy hover:bg-teal-soft shadow-sm",
        // Solid navy — used on light backgrounds
        solidNavy:
          "bg-navy text-white hover:bg-navy-soft shadow-sm",
        // Outline — subtle border, transparent
        outline:
          "border border-navy/20 text-navy hover:border-navy/40 hover:bg-navy/[0.03] bg-transparent",
        // Outline on dark — for navy sections
        outlineLight:
          "border border-white/25 text-white hover:border-white/50 hover:bg-white/[0.04] bg-transparent",
        // Ghost / text link
        ghost: "text-navy hover:text-teal bg-transparent",
        ghostLight: "text-white hover:text-teal bg-transparent",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-[15px]",
        xl: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface RohiButtonBaseProps
  extends VariantProps<typeof rohiButtonVariants> {
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
  externalArrow?: boolean;
}

function Inner({
  children,
  withArrow = true,
  externalArrow = false,
}: {
  children: React.ReactNode;
  withArrow?: boolean;
  externalArrow?: boolean;
}) {
  if (!withArrow) return <>{children}</>;
  return (
    <>
      <span>{children}</span>
      {externalArrow ? (
        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
      ) : (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
      )}
    </>
  );
}

/* Anchor-based button (for in-page navigation / external links) */
export function RohiButton({
  href,
  variant,
  size,
  className,
  children,
  withArrow,
  externalArrow,
  ...rest
}: RohiButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  return (
    <a
      href={href}
      data-slot="rohi-button"
      className={cn(rohiButtonVariants({ variant, size }), className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <Inner withArrow={withArrow} externalArrow={externalArrow}>
        {children}
      </Inner>
    </a>
  );
}

/* Button element (for forms / actions) */
export const rohiButtonVariantsExport = rohiButtonVariants;

export function RohiButtonElement({
  variant,
  size,
  className,
  children,
  withArrow,
  externalArrow,
  ...props
}: RohiButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      data-slot="rohi-button"
      className={cn(rohiButtonVariants({ variant, size }), className)}
      {...props}
    >
      <Inner withArrow={withArrow} externalArrow={externalArrow}>
        {children}
      </Inner>
    </button>
  );
}

export { rohiButtonVariants };
