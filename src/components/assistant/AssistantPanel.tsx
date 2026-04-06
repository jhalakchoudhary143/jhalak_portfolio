"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2, SendHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INTRO_LINE } from "@/lib/constants";

const AssistantCanvas = dynamic(
  () => import("./AssistantCanvas").then((m) => m.AssistantCanvas),
  { ssr: false, loading: () => <AssistantCanvasSkeleton /> },
);

function AssistantCanvasSkeleton() {
  return (
    <div className="flex h-[160px] w-[160px] shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 sm:h-[180px] sm:w-[180px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
    </div>
  );
}

function TypingIntro({ fullText }: { fullText: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [fullText]);

  return (
    <>
      {displayed}
      {displayed.length < fullText.length && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-violet-400 align-middle" />
      )}
    </>
  );
}

type Msg = { role: "user" | "assistant"; content: string };

type AssistantPanelProps = {
  active: boolean;
  startTyping: boolean;
};

export function AssistantPanel({ active, startTyping }: AssistantPanelProps) {
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const nextHistory = [...messages, { role: "user" as const, content: text }];
    setMessages(nextHistory);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        (data.error ? "Sorry, something went wrong. Try again or use the contact form." : "No reply.");
      setMessages([...nextHistory, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...nextHistory,
        {
          role: "assistant",
          content: "Couldn’t reach the server. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!active) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[min(100vw-2rem,420px)] max-w-[100vw-2rem] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass flex h-[min(85dvh,640px)] w-full flex-col overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-violet-600/20 px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-violet-300" aria-hidden />
                Jhalak Assistant
              </div>
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="rounded-lg p-1.5 text-muted transition hover:bg-white/10 hover:text-foreground"
                aria-label="Minimize assistant"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-start">
              <AssistantCanvas />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-violet-300/90">
                  Intro
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {startTyping ? <TypingIntro fullText={INTRO_LINE} /> : "\u00a0"}
                </p>
                <p className="mt-3 text-xs text-muted">
                  Ask a question below — I answer using this portfolio (smarter replies if{" "}
                  <code className="rounded bg-white/10 px-1">OPENAI_API_KEY</code> is set on the server).
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
              role="log"
              aria-live="polite"
            >
              {messages.length === 0 && !loading && (
                <p className="text-center text-xs text-muted">
                  Try: “What’s her CGPA?” · “Which skills?” · “How do I contact her?”
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-violet-600/80 text-white"
                        : "bg-white/10 text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm text-muted">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Thinking…
                  </div>
                </div>
              )}
            </div>

            <form
              className="flex shrink-0 gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage();
              }}
            >
              <label htmlFor="assistant-input" className="sr-only">
                Ask the assistant
              </label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Jhalak…"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                autoComplete="off"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#6B46C1] to-[#4299E1] px-3 py-2 text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {minimized && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setMinimized(false)}
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition hover:bg-white/10"
          aria-label="Expand assistant"
        >
          <Sparkles className="h-4 w-4 text-violet-300" />
          Assistant
          <ChevronUp className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
}
