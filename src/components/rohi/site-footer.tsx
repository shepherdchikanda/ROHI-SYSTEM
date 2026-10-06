import Link from "next/link";
import { RohiMark } from "./rohi-mark";

const FOOTER_NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const LEGAL = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Top — brand statement */}
        <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <RohiMark size={32} tone="light" />
              <span className="font-sans text-base font-bold uppercase tracking-[0.04em]">
                ROHI <span className="text-white/55">SYSTEMS</span>
              </span>
            </div>
            <p className="mt-6 font-sans text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
              Technology That Moves Business.
            </p>
            <p className="mt-3 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal">
              Intelligent Business Systems
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Built around the way your business actually works.
            </p>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-4 lg:col-start-8">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
              Navigation
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
              © {year} ROHI SYSTEMS
            </p>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
              Built in Mozambique
            </p>
          </div>
          <div className="flex items-center gap-5">
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-teal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
