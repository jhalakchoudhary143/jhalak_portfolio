"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ParticleField } from "@/components/ui/ParticleField";

type HeroWelcomeProps = {
  onStart: () => void;
};

export function HeroWelcome({ onStart }: HeroWelcomeProps) {
  const [launching, setLaunching] = useState(false);

  function handleStart() {
    if (launching) return;
    setLaunching(true);
    window.setTimeout(() => onStart(), 700);
  }

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#312e81] to-[#0c4a6e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,70,193,0.35),_transparent_55%)]" />
      <ParticleField className="opacity-80" density={56} />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.3)_0%,_rgba(56,189,248,0.08)_45%,_transparent_72%)]"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: launching ? 1.18 : 1 }}
        transition={{ duration: launching ? 0.65 : 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: launching ? 0 : 1, y: launching ? -24 : 0, scale: launching ? 0.96 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl text-center"
      >
        <motion.p
          className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-100/85"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
        >
          Welcome Portal
        </motion.p>

        <motion.h1
          className="text-balance px-2 text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Welcome to{" "}
          <span className="text-gradient bg-gradient-to-r from-violet-200 via-blue-200 to-fuchsia-200 bg-clip-text text-transparent">
            Jhalak Choudhary&apos;s
          </span>{" "}
          Portfolio
        </motion.h1>

        <motion.div
          className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-[#2a1d52]/30 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mx-auto max-w-xl text-sm text-violet-100/90 sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Interactive experience, elegant motion, and a professional portfolio journey from the very first click.
          </motion.p>

          <motion.div
            className="relative mt-7 flex justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, type: "spring", stiffness: 120, damping: 14 }}
          >
            <span className="pulse-ring relative inline-flex">
              <motion.button
                type="button"
                onClick={handleStart}
                disabled={launching}
                className="btn-glow relative rounded-full bg-gradient-to-r from-[#6B46C1] to-[#4299E1] px-12 py-4 text-lg font-bold tracking-wide text-white shadow-xl transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-80"
                whileHover={{ scale: launching ? 1 : 1.04 }}
                whileTap={{ scale: launching ? 1 : 0.98 }}
              >
                {launching ? "Entering..." : "START"}
              </motion.button>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {launching && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.32),_rgba(26,11,46,0.86)_58%,_rgba(15,23,42,1)_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className="pointer-events-none absolute bottom-6 text-xs text-violet-200/50">
        {launching ? "Launching portfolio experience..." : "Press START to enter"}
      </div>
    </section>
  );
}
