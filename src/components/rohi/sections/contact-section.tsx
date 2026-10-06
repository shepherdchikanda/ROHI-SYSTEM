"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import {
  Section,
  Container,
  SectionHeader,
} from "../section-primitives";
import { RohiButtonElement } from "../rohi-button";
import { cn } from "@/lib/utils";

type Field = {
  name: keyof FormState;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  help?: string;
  rows?: number;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  improving: string;
  currentProcess: string;
  currentTech: string;
  successLooksLike: string;
};

const FIELDS: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Organization (optional)",
    optional: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone / WhatsApp",
    type: "tel",
    placeholder: "+258 ...",
    optional: true,
  },
  {
    name: "improving",
    label: "What are you trying to improve?",
    type: "textarea",
    placeholder:
      "Describe the business problem you want to solve — in your own words.",
    rows: 3,
    required: true,
  },
  {
    name: "currentProcess",
    label: "Current process",
    type: "textarea",
    placeholder:
      "How does the work happen today? Where does it slow down?",
    rows: 2,
    optional: true,
  },
  {
    name: "currentTech",
    label: "Current technology",
    type: "textarea",
    placeholder:
      "What systems, tools or spreadsheets are involved today?",
    rows: 2,
    optional: true,
  },
  {
    name: "successLooksLike",
    label: "What would success look like?",
    type: "textarea",
    placeholder:
      "If the system worked well, what would be different six months from now?",
    rows: 2,
    optional: true,
  },
];

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  improving: "",
  currentProcess: "",
  currentTech: "",
  successLooksLike: "",
};

export function ContactSection() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function update(name: keyof FormState, val: string) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        issues?: { path: string; message: string }[];
      };
      if (!res.ok || !data.ok) {
        const issueText = data.issues?.[0]?.message;
        setStatus("error");
        setErrorMsg(
          issueText || data.error || "Something went wrong. Please try again.",
        );
        return;
      }
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <Section id="contact" tone="navy" className="overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-navy-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — final CTA copy */}
          <div className="lg:col-span-5">
            <SectionHeader
              number="14"
              eyebrow="Contact"
              tone="light"
              heading={
                <>
                  Have a business problem worth solving?
                </>
              }
              lede="Tell us what you are trying to improve. We start by understanding the problem — not by sending a quote."
            />
            <div className="mt-8 space-y-4">
              <p className="text-sm text-white/60">
                Every organization is different. We scope solutions around the
                complexity, requirements and outcomes of the problem.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40">
                  What happens next
                </p>
                <ol className="mt-3 space-y-2">
                  {[
                    "We review what you send",
                    "A short conversation to understand context",
                    "Discovery → Solution design → Proposal",
                  ].map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <span className="font-mono-tech text-[11px] font-medium tracking-widest text-teal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                      <Check className="size-7" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-sans text-xl font-bold text-white">
                        Thank you. We&apos;ve received your message.
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        A member of the ROHI team will reach out to understand
                        the problem before anything else.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-teal transition-colors hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      {FIELDS.slice(0, 4).map((f) => (
                        <FieldInput
                          key={f.name}
                          field={f}
                          value={values[f.name]}
                          onChange={(v) => update(f.name, v)}
                          disabled={status === "submitting"}
                        />
                      ))}
                    </div>
                    <div className="grid gap-5">
                      {FIELDS.slice(4).map((f) => (
                        <FieldInput
                          key={f.name}
                          field={f}
                          value={values[f.name]}
                          onChange={(v) => update(f.name, v)}
                          disabled={status === "submitting"}
                        />
                      ))}
                    </div>

                    {status === "error" && errorMsg && (
                      <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
                        We respond to qualified problems, not every form
                      </p>
                      <RohiButtonElement
                        type="submit"
                        variant="primary"
                        size="lg"
                        withArrow={false}
                        disabled={status === "submitting"}
                        className="min-w-[180px]"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Start a Conversation"
                        )}
                      </RohiButtonElement>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-4 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/40">
              Fig. 13 — Describe the problem. We start by understanding it.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  disabled,
}: {
  field: Field;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const id = `field-${field.name}`;
  const common = cn(
    "w-full rounded-md border border-white/15 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors outline-none focus:border-teal/60 focus:ring-[3px] focus:ring-teal/20 disabled:opacity-50",
  );
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center justify-between gap-2 font-mono-tech text-[11px] uppercase tracking-[0.16em] text-white/50"
      >
        <span>{field.label}</span>
        {field.required ? (
          <span className="text-teal">Required</span>
        ) : (
          <span className="text-white/30">Optional</span>
        )}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          disabled={disabled}
          required={field.required}
          className={cn(common, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          required={field.required}
          autoComplete={
            field.type === "email"
              ? "email"
              : field.type === "tel"
                ? "tel"
                : field.name === "name"
                  ? "name"
                  : "organization"
          }
          className={common}
        />
      )}
    </div>
  );
}
