"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MessageSquare, X, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RohiLogo } from "../rohi-logo";

type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };

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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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
            className="fixed bottom-24 right-3 z-[60] flex h-[min(620px,70vh)] w-[min(440px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-background shadow-2xl sm:right-5"
            role="dialog"
            aria-label="ROHI AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-navy/10 bg-navy px-4 py-3 text-white">
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
            <div className="flex items-center gap-2 border-b border-navy/5 bg-cloud px-4 py-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-teal" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-ink-soft">
                AI assistant · understands ROHI
              </span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-cloud/40 px-3.5 py-4 scroll-thin"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
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

            {/* Handoff link */}
            <div className="flex items-center justify-between gap-2 border-t border-navy/5 bg-background px-3.5 py-1.5">
              <a
                href="/contact"
                className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-widest text-teal transition-colors hover:text-navy"
              >
                Start a Conversation
                <ArrowUpRight className="size-3" />
              </a>
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-ink-soft/50">
                Powered by ROHI
              </span>
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 border-t border-navy/10 bg-background px-3 py-3"
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
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-lg border border-navy/15 bg-cloud px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-teal/60 focus:ring-[3px] focus:ring-teal/20"
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
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-navy text-white"
            : "rounded-bl-md border border-navy/10 bg-background text-ink",
        )}
      >
        {msg.content}
        {msg.streaming && msg.content && (
          <span className="ml-0.5 inline-block size-1.5 translate-y-0.5 animate-pulse rounded-full bg-teal" />
        )}
      </div>
    </div>
  );
}
