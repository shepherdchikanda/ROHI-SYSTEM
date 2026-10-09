# REBUILD-LEGAL — work record

Agent: full-stack-developer
Task: Rebuild /privacy, /terms, /security after regression (3 legal pages deleted).

## Context I read before starting
- `/home/z/my-project/worklog.md` — confirmed brand language (navy #0B1220, teal #20C7C9, Manrope + JetBrains Mono), CtaBand API, intro-section padding pattern (`pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20`), SectionHeader API (number/eyebrow/heading/lede/tone).
- `src/components/rohi/section-primitives.tsx` — exports `Section`, `Container`, `SectionHeader`, `Eyebrow`, `SectionHeading`, `Lede`, `SectionNumber`. `Section` tone prop is `"light" | "navy" | "cloud"`.
- `src/components/rohi/sections/cta-band.tsx` — `CtaBand({eyebrow,heading,lede,ctaLabel,href})`.
- `src/lib/site-config.ts` — `SITE_CONFIG.email` (hello@rohi.systems placeholder), `SITE_CONFIG.addressLine` ("Maputo, Mozambique").
- `src/app/faq/page.tsx` — mirror pattern: tone="cloud" intro with padded top, tone="light" body, closing CtaBand.
- `src/app/sitemap.ts` — already lists `/privacy`, `/terms`, `/security`, `/cookies`, `/ai-notice` as routes (so internal links to those are safe).
- `src/components/rohi/site-footer.tsx` — Legal column already links to those 5 routes.
- `src/components/rohi/cookie-consent.tsx` — already links to `/cookies`.

## Approach
- All 3 pages are server components (`"use client"` not needed — pure composition).
- Inline `SubSection` (privacy/terms) and `BodySection` (security) defined locally per page, matching the exact visual language:
  * mono section number in teal (`font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal`)
  * navy eyebrow with divider dot
  * `SectionHeading` at `text-xl` (Manrope bold tracking-[-0.02em])
  * prose block `max-w-3xl text-ink-soft leading-relaxed` with inline `[&_a]:font-medium [&_a]:text-teal [&_a:hover]:underline` so plain `<Link>`/`<a>` get ROHI link styling without a separate prose plugin.
- Top border `border-t border-navy/10` between sub-sections for rhythm (matches the engineering/geometric tone).
- `mailto:${SITE_CONFIG.email}` for email links, `<Link>` for internal routes (/contact, /cookies, /ai-notice, /privacy), external `wa.me` is plain anchor with `rel="noopener noreferrer"`.
- Honest content only — no SOC 2 / ISO 27001 / registration claims; Mozambican framework tracked but explicitly noted as "approach, not certification."

## Files produced
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/security/page.tsx`

## Verification
- `bun run lint` exit 0 (only 1 pre-existing warning in `src/app/layout.tsx` re: custom fonts — unrelated to these pages)
- `curl /privacy` → HTTP 200 (title "Privacy Policy · ROHI SYSTEMS", canonical https://rohi.systems/privacy, "Last revised: October 2026" present)
- `curl /terms`   → HTTP 200 (title "Terms of Service · ROHI SYSTEMS", canonical https://rohi.systems/terms, "Last revised: October 2026" present)
- `curl /security`→ HTTP 200 (title "Security & Data Protection · ROHI SYSTEMS", canonical https://rohi.systems/security, "Last revised: October 2026" present)
- dev.log shows clean compiles for all three routes, no runtime errors
