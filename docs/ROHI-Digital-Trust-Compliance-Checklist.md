# ROHI SYSTEMS — Digital Trust & Compliance Checklist

> **Internal document — not published on the website.**
> For ROHI's founders/team and Mozambican legal counsel.
>
> Status: v1.0 · Last revised: October 2026
>
> **Important:** this is operational planning, not a legal opinion. Before
> launch (and before any public claim of compliance), ROHI's exact
> classification and final legal documents should be validated by a
> Mozambican technology/commercial lawyer.

---

## 1. The framing

Don't think of this as *"we need Terms and Conditions for the website."*
Think of it as the **ROHI Digital Trust & Compliance Architecture** —
because ROHI is not going to remain a simple website.

The strategy spans:

```
Website → Lead capture → AI assistant → CRM → Custom systems →
SaaS → Embedded AI → Subscriptions → Client data → Cloud infrastructure → AI providers
```

The legal and technical architecture needs to grow with that. This checklist
tracks both.

---

## 2. Priority table

| Priority    | Area             | ROHI action                                                        | Status |
| ----------- | ---------------- | ------------------------------------------------------------------ | ------ |
| 🔴 Critical | INTIC            | Determine whether ROHI's activities require registration/licensing | ☐ |
| 🔴 Critical | Privacy          | Privacy Policy + data-handling framework                           | ☑ (website) / ☐ (internal framework) |
| 🔴 Critical | Cybersecurity    | Security controls under the 2026 environment                      | ☑ (website stance) / ☐ (implementation audit) |
| 🔴 Critical | AI               | AI/data governance before deploying agents                        | ☑ (notice) / ☐ (governance policy) |
| 🟠 High     | Cookies          | Consent/preferences for non-essential tracking                    | ☑ |
| 🟠 High     | Terms            | Strong website Terms                                               | ☑ |
| 🟠 High     | Client contracts | MSA/SOW/subscription legal structure                              | ☐ |
| 🟠 High     | Third-party AI   | Review provider terms/data-processing arrangements                 | ☐ |
| 🟡 Medium   | Consumer law     | Prepare for B2C if ROHI ever sells directly to consumers          | ☐ |
| 🟡 Medium   | Cloud            | Reassess if ROHI becomes a cloud provider                          | ☐ |
| 🟡 Medium   | Data centre      | Only relevant if ROHI operates infrastructure                      | ☐ |
| 🟢 Ongoing  | AI regulation    | Monitor CNIA / national AI framework                               | ☐ |

**Legend:** ☑ = done (on the website) · ☐ = open / in progress

---

## 3. What's already live on the website (as of v1.0)

These public pages exist and are grounded in what the site actually does:

- `/terms` — Terms of Service (13 clauses incl. AI limitations & disclosure)
- `/privacy` — Privacy Policy (10 sections, incl. a dedicated AI-assistant section)
- `/cookies` — Cookie Policy (categories, durations, third parties, consent management)
- `/ai-notice` — AI Assistant Notice (the 12-section AI privacy notice)
- `/security` — Security & Data Protection (incl. an honest "Compliance approach" section that references the Mozambican framework without claiming validated compliance)
- Cookie consent banner (Accept All / Reject Non-Essential / Manage Preferences)
- Consent-gated analytics (no events recorded unless the visitor accepts)

These take an **honest stance**: no fake certifications, no compliance claims
that haven't been legally validated, precise safe language instead.

---

## 4. The immediate sequence (10 steps)

Work through these in order. The website pieces (✅ done) are in place;
the internal work (☐ open) is what remains.

- [x] **1. Determine ROHI's INTIC classification** *(partially — see note)*
  > NOTE: this requires a Mozambican lawyer to determine whether ROHI's
  > specific activities (website, AI assistant, future SaaS, client systems)
  > fall under INTIC's electronic-service-provider / digital-platform
  > licensing regime (Decree 44/2025 amending the 2023 regime). The website
  > currently states this is "being determined" — which is honest. Resolve
  > with counsel before claiming any registration.
  - Sources to review with counsel:
    - INTIC — Registration & Licensing: https://intic.gov.mz/registo-e-licenciamento/
    - INTIC — Sectorial Legislation: https://intic.gov.mz/sectorial/
    - INTIC — Digital Services Licensing Requirements: https://intic.gov.mz/requisitos-de-licenciamento-de-provedores-intermediarios-de-servicos-electronicos-e-de-operadores-de-plataformas-digitais/

- [x] **2. Design the data map** *(website-level done; internal map pending)*
  > The website Privacy Policy describes what's collected. An INTERNAL data
  > map (every system that touches data, where it's stored, who can access it,
  > retention) does not yet exist. Build it before scaling.

- [x] **3. Design the cookie/consent architecture** ✅
  > Consent banner + Cookie Policy page + consent-gated analytics. Done.

- [x] **4. Create the AI data/privacy rules** *(public-facing done; internal governance pending)*
  > The AI Assistant Notice explains the visitor-facing rules. An INTERNAL
  > AI governance policy (who can deploy AI features, what data AI can
  > touch, prompt-injection defences, logging, retention of AI outputs)
  > is still to be written.

- [x] **5. Draft Terms & Conditions** ✅
  > `/terms` covers website use, IP, acceptable use, AI, liability, governing
  > law (Mozambique), etc. Have counsel review before launch.

- [x] **6. Draft Privacy Policy** ✅
  > `/privacy` covers what's collected, storage, usage, third parties,
  > cookies, AI assistant, rights, children, changes, contact. Have counsel
  > review.

- [x] **7. Draft Cookie Policy** ✅
  > `/cookies` covers categories, durations, third parties, consent, browser
  > management.

- [x] **8. Draft AI Assistant Notice** ✅
  > `/ai-notice` covers the 12-section AI privacy notice + limitations +
  > what not to share.

- [ ] **9. Create the Client MSA/SOW framework** *(internal — not on the website)*
  > This is the real commercial protection. For paying customers:
  > - Statement of Work (per project)
  > - Master Services Agreement
  > - Subscription Agreement (for recurring services / SaaS)
  > - Data Processing provisions
  > - SLA
  > - IP ownership (custom work → client; ROHI tools/frameworks → ROHI)
  > - Payment terms
  > - Support
  > - Change requests
  > - Termination
  > - Liability (capped at fees paid for the engagement)
  > - Security provisions
  > - AI provisions (who owns AI outputs, can ROHI train on client data —
  >   default: no, unless explicitly agreed)
  > Have Mozambican commercial counsel draft these.

- [ ] **10. Build an internal ROHI Compliance Checklist** *(this document)* ✅
  > You're reading it. Keep it living — update the status column as items
  > close.

---

## 5. Critical legal questions to resolve with counsel

These are the substantive questions that determine ROHI's classification and
exposure. Bring them to a Mozambican technology/commercial lawyer:

### INTIC
- [ ] Does ROHI's website + AI assistant constitute an "electronic service" /
      "digital platform" requiring INTIC registration/licensing?
- [ ] Does building custom client systems trigger INTIC obligations?
- [ ] If ROHI later launches FIMS (a SaaS product), does that trigger
      platform-operator licensing?
- [ ] Are there sector-specific overlays (finance, health) if ROHI serves
      clients in regulated industries?

### Data protection (current + pending law)
- [ ] What is ROHI's lawful basis/grounds for processing contact-form data,
      chatbot conversations, newsletter emails, analytics?
- [ ] Does the pending Data Protection Law (before the Assembly of the
      Republic) change the basis ROHI relies on now?
- [ ] International transfers: the chatbot uses a third-party LLM API whose
      servers may be outside Mozambique. Is this lawful under the current
      framework and the pending DP law? What safeguards are needed?
- [ ] Retention periods: define explicit retention for enquiries, chat
      transcripts, subscribers, analytics events.

### AI + client data
- [ ] Who owns the data ROHI processes for a client? (default: the client)
- [ ] Who owns the custom software ROHI builds? (default: client, with ROHI
      retaining its own tools/frameworks — confirm in the MSA)
- [ ] Who owns AI-generated outputs? (ROHI's position: the client owns
      outputs generated within their engagement, subject to the AI provider's
      terms — have counsel validate)
- [ ] Can ROHI train models on client data? (default: NO, unless explicitly
      agreed in the MSA — make this explicit)
- [ ] What are ROHI's obligations if an AI provider's terms change?

### Cybersecurity (Laws 13/2026 + 14/2026)
- [ ] What security controls are now legally required of ROHI's systems?
- [ ] What are the incident-reporting obligations?
- [ ] Do the new laws affect how ROHI must log, retain, or disclose?

### Consumer protection
- [ ] Is ROHI's typical customer a "consumer" under Mozambican consumer law?
      (Likely no for B2B, but confirm — affects which protections apply)
- [ ] If ROHI ever sells FIMS B2C, what consumer-law obligations trigger?

---

## 6. What we will NOT claim (the honesty guardrails)

Until legally validated, ROHI will not claim:

- "ISO compliant" or "ISO 27001 certified"
- "SOC 2 compliant"
- "Fully compliant with Mozambican data protection law"
- "INTIC registered" / "INTIC certified"
- "100% secure"
- "AI outputs are always accurate"
- "Your data never leaves Mozambique"

Instead, ROHI uses precise, defensible language:

> *ROHI is committed to responsible, secure and transparent technology
> practices and designs its systems with applicable Mozambican requirements
> and recognized security principles in mind.*

This is already reflected on the `/security` page. Keep it.

---

## 7. Internal technical controls to implement (beyond the website)

These are operational, not website content. Track separately.

### Website
- [x] HTTPS (via gateway)
- [x] Secure headers (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) — set in `next.config.ts` at the application level
- [x] Secure forms (validation server-side)
- [x] Bot/spam protection on the contact form (honeypot — see `src/lib/honeypot.ts`)
- [x] Bot/spam protection on the assessment form (honeypot — `isBot` check in `src/app/api/assessment/route.ts`)
- [x] Minimal data collection
- [x] Access controls (no visitor auth on marketing site)

### AI agent
- [x] No credentials/API keys requested (system prompt enforces)
- [x] Prompt/data separation (system prompt + KB separate from user input)
- [ ] Prompt-injection hardening (system prompt has some defences; review)
- [x] Controlled retention (transcripts saved only on handoff)
- [x] Logging (analytics events, consent-gated)
- [ ] Conversation access controls (who at ROHI can read transcripts)

### Client systems (per engagement)
- [ ] Role-based access + authentication
- [ ] Authorization
- [ ] Encryption (in transit + at rest, per engagement)
- [ ] Backups + recovery procedures
- [ ] Logging + monitoring
- [ ] Incident response plan
- Document all of these per engagement in the project agreement.

### Internal ROHI
- [ ] Password manager (1Password / Bitwarden) for all credentials
- [ ] MFA on all ROHI accounts
- [ ] Least-privilege access to systems + repos + DB
- [ ] Git security (branch protection, signed commits, secret scanning)
- [ ] Secrets management (no API keys in code/env-in-repo)
- [ ] Backup policy
- [ ] Founder/employee access policy (onboarding + offboarding)

---

## 8. The next milestones

1. **Engage Mozambican counsel** for INTIC classification + Terms/Privacy
   review + MSA/SOW drafting.
2. **Build the internal data map** (every system that touches data).
3. **Write the internal AI governance policy.**
4. **Define explicit retention periods** for each data category.
5. **Document per-engagement security** in a standard template for client
   projects.

---

## 9. Change log

- **v1.0 (October 2026):** initial checklist. Website legal pages
  (Terms, Privacy, Cookie Policy, AI Notice, Security with Compliance
  Approach) live. Internal items (INTIC classification, MSA/SOW, data map,
  AI governance, technical controls beyond the website) open.
