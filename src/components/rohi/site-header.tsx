"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RohiMark, RohiWordmark } from "./rohi-mark";
import { RohiButton } from "./rohi-button";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-navy/10 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 lg:h-20">
        {/* Brand */}
        <Link
          href="#top"
          className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
          aria-label="ROHI SYSTEMS — home"
        >
          <RohiMark size={28} tone="navy" />
          <RohiWordmark />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-navy outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA (desktop) */}
        <div className="hidden lg:block">
          <RohiButton href="#contact" size="sm" withArrow={false}>
            Start a Conversation
          </RohiButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-navy/5 outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-40 bg-navy/30 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute inset-x-0 top-16 z-50 border-b border-navy/10 bg-background shadow-lg transition-all duration-300",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0",
          )}
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-6"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-navy/5 py-3 text-base font-medium text-ink transition-colors hover:text-teal"
              >
                {item.label}
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft/50">
                  /{item.href.replace("#", "")}
                </span>
              </Link>
            ))}
            <div className="pt-4">
              <RohiButton
                href="#contact"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Start a Conversation
              </RohiButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
