"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RohiLogo } from "../rohi-logo";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };

const STORAGE_KEY = "rohi-chat-messages";
const STORAGE_TS_KEY = "rohi-chat-saved-at";
const HISTORY_MAX_AGE = 48 * 60 * 60 * 1000; // 48 hours
const SESSION_KEY = "rohi-chat-session";
const HANDOFF_KEY = "rohi-chat-handoff";

const QUICK_OPTIONS = [
  "Explore ROHI",
  "I have a business problem",
  "I need a system",
  "I want to use AI",
  "Talk to ROHI",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi, I'm ROHI's AI assistant. I can help you understand what we build, explore a business problem you're dealing with, or help you figure out whether ROHI could be a good fit.\n\nWhat are you working on?",
};

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [handoffBusy, setHandoffBusy] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>("");

  // Initialise session id once
  useEffect(() => {
    try {
      let sid = sessionStorage.getItem(SESSION_KEY);
      if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, sid);
      }
      sessionIdRef.current = sid;
      // Restore saved conversation (localStorage) — only if < 48h old
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedAt = Number(localStorage.getItem(STORAGE_TS_KEY) || 0);
      const isFresh = Date.now() - savedAt < HISTORY_MAX_AGE;
      if (saved && isFresh) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 1) {
          setHasHistory(true);
        }
      } else if (saved && !isFresh) {
        localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(STORAGE_TS_KEY);
        localStorage.removeItem(STORAGE_TS_KEY);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Persist messages to localStorage (skip streaming partials)
  useEffect(() => {
    try {
      const persistable = messages
        .filter((m) => !(m.streaming && m.content === ""))
        .map((m) => ({ role: m.role, content: m.content }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
      localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  // Mark new messages when closed
  useEffect(() => {
    if (!open && messages.length > 1) setHasNew(true);
  }, [messages.length, open]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      track("chat_open");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Handoff: build a summary from the conversation, save the transcript to
   * the DB, stash the summary in sessionStorage for the contact form to read,
   * then navigate to /contact.
   */
  const handoff = useCallback(async () => {
    if (handoffBusy) return;
    setHandoffBusy(true);
    track("chat_handoff");
    // Build a lightweight summary from the user/assistant messages
    const userMsgs = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content);
    const assistantMsgs = messages
      .filter((m) => m.role === "assistant")
      .map((m) => m.content);
    const summary = {
      business: "",
      problem: userMsgs[0] ?? "",
      currentProcess: userMsgs.slice(1).join(" / ") ?? "",
      currentTech: "",
      desiredOutcome: "",
      potentialDirection: assistantMsgs.slice(-1)[0] ?? "",
      urgency: "",
      contact: "",
    };
    // Stash for the contact form
    const handoffPayload = {
      summary,
      improving: userMsgs[0] ?? "",
      // attach the full conversation text for the team's reference
      conversationText: messages
        .map((m) => `${m.role === "user" ? "Visitor" : "ROHI"}: ${m.content}`)
        .join("\n\n"),
    };
    try {
      sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoffPayload));
    } catch {
      /* ignore */
    }
    // Save transcript to DB (fire and forget — don't block navigation)
    try {
      void fetch("/api/chat/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          summary,
          messages: messages
            .filter((m) => !(m.streaming && m.content === ""))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        keepalive: true,
      });
    } catch {
      /* ignore — non-blocking */
    }
    setHandoffBusy(false);
    setOpen(false);
    router.push("/contact");
  }, [handoffBusy, messages, router]);


  function resumeHistory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch { /* ignore */ }
    setHasHistory(false);
  }

  function dismissHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TS_KEY);
    } catch { /* ignore */ }
    setHasHistory(false);
  }

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      setInput("");
      setBusy(true);

      const userMsg: Msg = { role: "user", content };
      const assistantMsg: Msg = {
        role: "assistant",
        content: "",
        streaming: true,
      };
      // Build the history to send (exclude the empty assistant placeholder)
      const history = [...messages, userMsg].filter(
        (m) => m.role !== "assistant" || m.content.length > 0,
      );
      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const fallback =
            res.status === 429
              ? "I'm getting a lot of requests right now. Please try again in a moment, or use the contact form to reach the ROHI team."
              : "I'm having trouble responding right now. Please try again, or reach the ROHI team through the contact page.";
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: fallback,
              streaming: false,
            };
            return next;
          });
          setBusy(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          // Update the streaming assistant message
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: acc,
              streaming: true,
            };
            return next;
          });
        }
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: acc || "I don't have enough to say on that. Could you tell me a bit more?",
            streaming: false,
          };
          return next;
        });
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          // user cancelled; leave partial content
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content:
                "I ran into an issue responding. Please try again, or reach the ROHI team through the contact page.",
              streaming: false,
            };
            return next;
          });
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages],
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onQuick(opt: string) {
    send(opt);
  }

  function resetConversation() {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close ROHI assistant" : "Open ROHI assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex h-14 items-center gap-2 rounded-full pl-3 pr-4 font-sans text-sm font-semibold text-navy shadow-lg transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40",
          open
            ? "bg-navy text-white"
            : "bg-teal text-navy hover:bg-teal-soft",
        )}
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <MessageSquare className="size-5" strokeWidth={2} />
        )}
        <span className={cn(open && "hidden sm:inline")}>
          {open ? "Close" : "Ask ROHI"}
        </span>
        {hasNew && !open && (
          <span className="absolute right-1 top-1 size-2.5 rounded-full bg-navy" />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-3 z-[60] flex h-[min(620px,70vh)] w-[min(440px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-5"
            role="dialog"
            aria-label="ROHI AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-[#0B1220] px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <RohiLogo tone="light" height={22} />
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="rounded-md px-2 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:text-teal"
                  aria-label="Reset conversation"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f5f7fa] px-4 py-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-teal" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                AI assistant · understands ROHI
              </span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-[#f5f7fa] px-3.5 py-4 scroll-thin"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {/* Resume previous conversation prompt */}
              {hasHistory && messages.length === 1 && !busy && (
                <div className="rounded-lg border border-[#20C7C9]/30 bg-[#20C7C9]/5 p-3 text-center">
                  <p className="text-xs text-[#667085] mb-2">You have a previous conversation saved (expires in 48h).</p>
                  <div className="flex gap-2 justify-center">
                    <button type="button" onClick={resumeHistory} className="rounded-md bg-[#0B1220] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#111a2e]">
                      Continue
                    </button>
                    <button type="button" onClick={dismissHistory} className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-[#667085] hover:bg-gray-50">
                      Start fresh
                    </button>
                  </div>
                </div>
              )}
              {/* Quick options show only after welcome, when not busy and last is assistant welcome */}
              {messages.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onQuick(opt)}
                      className="rounded-full border border-navy/15 bg-background px-3 py-1.5 text-xs font-medium text-ink-soft transition-all hover:border-teal/50 hover:text-navy"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {busy && messages[messages.length - 1]?.content === "" && (
                <div className="flex items-center gap-1.5 text-ink-soft">
                  <span className="size-2 animate-bounce rounded-full bg-ink-soft/60 [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-ink-soft/60 [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-ink-soft/60" />
                </div>
              )}
            </div>

            {/* Handoff — passes conversation context to the contact form */}
            <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-[#f5f7fa] px-3.5 py-1.5">
              <button
                type="button"
                onClick={handoff}
                disabled={handoffBusy || messages.length <= 1}
                className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-widest text-teal transition-colors hover:text-navy disabled:opacity-40"
              >
                {handoffBusy ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                    Saving context…
                  </>
                ) : (
                  <>
                    Start a Conversation
                    <ArrowUpRight className="size-3" />
                  </>
                )}
              </button>
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-ink-soft/50">
                Context shared with team
              </span>
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 border-t border-gray-200 bg-white px-3 py-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask about a business problem, a capability, or what ROHI could build…"
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-lg border border-gray-200 bg-[#f5f7fa] px-3 py-2 text-sm text-[#111827] placeholder:text-ink-soft/50 outline-none transition-colors focus:border-teal/60 focus:ring-[3px] focus:ring-teal/20"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal text-navy transition-all hover:bg-teal-soft disabled:opacity-40 disabled:hover:bg-teal focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal/40"
                aria-label="Send message"
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" strokeWidth={2} />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-[#20C7C9] text-[#0B1220] font-medium"
            : "rounded-bl-md border border-gray-200 bg-white text-[#111827] shadow-sm",
        )}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{msg.content}</span>
        ) : (
          <div className="space-y-1.5">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-[#0B1220]">{children}</strong>,
                ul: ({ children }) => <ul className="ml-4 list-disc space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="ml-4 list-decimal space-y-1">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h2: ({ children }) => <h2 className="text-sm font-bold mt-2 mb-1">{children}</h2>,
                a: ({ href, children }) => {
                  if (href && href.startsWith("/")) {
                    return <a href={href} className="inline-flex items-center gap-0.5 rounded bg-[#20C7C9]/10 px-1.5 py-0.5 text-[#20C7C9] font-semibold hover:bg-[#20C7C9]/20 no-underline">{children}</a>;
                  }
                  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#20C7C9] font-semibold underline underline-offset-2">{children}</a>;
                },
                code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">{children}</code>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-[#20C7C9] pl-3 italic text-gray-600">{children}</blockquote>,
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        )}
        {msg.streaming && msg.content && (
          <span className="ml-0.5 inline-block size-1.5 translate-y-0.5 animate-pulse rounded-full bg-[#20C7C9]" />
        )}
      </div>
    </div>
  );
}
