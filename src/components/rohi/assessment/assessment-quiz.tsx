"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { Section, Container, Eyebrow } from "../section-primitives";
import { RohiButton } from "../rohi-button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { QUESTIONS, getStage, MAX_SCORE, type Stage } from "@/lib/assessment";

type Answer = { questionId: string; label: string; score: number };
type Step = "intro" | number | "results";
const TOTAL = QUESTIONS.length;

export function AssessmentQuiz() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const savedRef = useRef(false);

  const currentIdx = typeof step === "number" ? step : -1;
  const totalScore = answers.reduce((acc, a) => acc + a.score, 0);
  const stage: Stage | null = step === "results" ? getStage(totalScore) : null;

  const selectOption = useCallback((qIdx: number, opt: { label: string; score: number }) => {
    const q = QUESTIONS[qIdx];
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== q.id);
      return [...without, { questionId: q.id, label: opt.label, score: opt.score }];
    });
    track("assessment_answer", { question: q.id, score: opt.score });
    window.setTimeout(() => {
      if (qIdx + 1 >= TOTAL) {
        setStep("results");
        track("assessment_complete", { score: totalScore + opt.score });
      } else {
        setStep(qIdx + 1);
      }
    }, 220);
  }, [totalScore]);

  async function saveAssessment(withEmail: boolean) {
    if (savedRef.current && !withEmail) return;
    if (!stage) return;
    setSaving(true);
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: withEmail ? email.trim() : "", answers, score: totalScore, stage: stage.name }),
        keepalive: true,
      });
      savedRef.current = true;
    } catch { /* non-blocking */ } finally { setSaving(false); }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || saving) return;
    await saveAssessment(true);
    setEmailDone(true);
  }

  function handoffToContact() {
    if (stage) {
      void saveAssessment(Boolean(email.trim()));
      try {
        sessionStorage.setItem("rohi-chat-handoff", JSON.stringify({
          improving: `Operations maturity assessment — Stage ${stage.id}: ${stage.name} (score ${totalScore}/${MAX_SCORE}). Biggest opportunity: ${stage.direction}.`,
          conversationText: `Self-assessment results:\nStage: ${stage.name}\nScore: ${totalScore}/${MAX_SCORE}\nSummary: ${stage.summary}\nOpportunity: ${stage.opportunity}\n\nAnswers:\n${answers.map((a) => `  - ${a.questionId}: ${a.label}`).join("\n")}`,
        }));
      } catch { /* ignore */ }
      track("assessment_handoff", { stage: stage.name, score: totalScore });
    }
    router.push("/contact");
  }

  if (step === "intro") {
    return (
      <Section tone="cloud" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <Eyebrow tone="navy">Operations maturity</Eyebrow>
            <h1 className="font-sans text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
              How ready is your organization for intelligent systems?
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              A 90-second self-assessment. Seven honest questions about how your operation runs today — no signup, no email required to see your result.
            </p>
            <div className="mt-2 flex flex-col items-center gap-3">
              <button type="button" onClick={() => setStep(0)} className="group inline-flex h-12 items-center gap-2 rounded-md bg-navy px-7 text-base font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40">
                Start the assessment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">7 questions · ~90 seconds · instant result</p>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (step === "results" && stage) {
    const pct = Math.round((totalScore / MAX_SCORE) * 100);
    return (
      <Section tone="light" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        <Container size="narrow">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <Eyebrow tone="navy">Your result</Eyebrow>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">Stage {stage.id} of 4 · score {totalScore}/{MAX_SCORE} · {pct}%</p>
              <h2 className="font-sans text-4xl font-extrabold tracking-[-0.02em] text-ink sm:text-5xl">{stage.name}</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{stage.summary}</p>
            </div>
            <div className="mx-auto w-full max-w-2xl">
              <div className="flex items-center justify-between text-xs font-mono-tech uppercase tracking-widest text-ink-soft/60">
                <span>Fragmented</span><span>Intelligent</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy/10">
                <motion.div className="h-full rounded-full bg-teal" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/5 sm:grid-cols-2">
              <div className="bg-background p-6">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">What this means</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{stage.description}</p>
              </div>
              <div className="bg-background p-6">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">Biggest opportunity</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{stage.opportunity}</p>
                <p className="mt-4 font-mono-tech text-[11px] uppercase tracking-widest text-teal">→ {stage.direction}</p>
              </div>
            </div>
            <div className="rounded-xl border border-navy/10 bg-cloud p-6 sm:p-7">
              {emailDone ? (
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-teal text-navy"><Check className="size-4" /></span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">Thank you. We&apos;ll be in touch.</p>
                    <p className="text-xs text-ink-soft">A member of the ROHI team will follow up based on your results.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitEmail} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="sm:max-w-md">
                    <p className="font-sans text-sm font-semibold text-ink">Want a personalized follow-up from ROHI?</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">Leave your email and the team will reach out with context on your stage — no obligation.</p>
                  </div>
                  <div className="flex gap-2">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-11 w-full min-w-0 flex-1 rounded-md border border-navy/15 bg-background px-3.5 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-teal/60 focus:ring-[3px] focus:ring-teal/20" />
                    <button type="submit" disabled={saving || !email.trim()} className="flex h-11 shrink-0 items-center gap-2 rounded-md bg-teal px-4 text-sm font-semibold text-navy transition-colors hover:bg-teal-soft disabled:opacity-40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40">
                      {saving ? <Loader2 className="size-4 animate-spin" /> : "Send"}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 pb-4 pt-2 text-center">
              <RohiButton href="/contact" onClick={handoffToContact} variant="solidNavy" size="lg">Talk to ROHI about your results</RohiButton>
              <button type="button" onClick={() => { setStep("intro"); setAnswers([]); savedRef.current = false; setEmailDone(false); setEmail(""); }} className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-teal">Retake the assessment</button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  const q = QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / TOTAL) * 100;
  return (
    <Section tone="light" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <Container size="narrow">
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-mono-tech uppercase tracking-widest text-ink-soft/60">
            <span>Question {currentIdx + 1} of {TOTAL}</span><span>{q.dimension}</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div className="h-full rounded-full bg-teal" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            <h2 className="font-sans text-2xl font-bold leading-snug tracking-[-0.01em] text-ink sm:text-3xl lg:text-[2.1rem]">{q.prompt}</h2>
            {q.help && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{q.help}</p>}
            <div className="mt-7 flex flex-col gap-3">
              {q.options.map((opt, i) => {
                const selected = answers.find((a) => a.questionId === q.id)?.label === opt.label;
                return (
                  <button key={opt.label} type="button" onClick={() => selectOption(currentIdx, opt)} className={cn("group flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all", selected ? "border-teal bg-teal/5" : "border-navy/10 bg-background hover:border-navy/25 hover:bg-cloud")}>
                    <span className="flex items-center gap-3">
                      <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border font-mono-tech text-xs font-semibold transition-colors", selected ? "border-teal bg-teal text-navy" : "border-navy/15 text-ink-soft")}>{String.fromCharCode(65 + i)}</span>
                      <span className="font-sans text-sm font-medium text-ink sm:text-base">{opt.label}</span>
                    </span>
                    <ArrowRight className={cn("size-4 shrink-0 transition-all", selected ? "text-teal" : "text-ink-soft/30 group-hover:translate-x-0.5 group-hover:text-ink-soft")} />
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button type="button" onClick={() => currentIdx === 0 ? setStep("intro") : setStep(currentIdx - 1)} className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-teal">← Back</button>
              {currentIdx > 0 && <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-ink-soft/50">{answers.length}/{TOTAL} answered</span>}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
