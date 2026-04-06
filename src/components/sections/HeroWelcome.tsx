"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/ui/ParticleField";

type HeroWelcomeProps = {
  onStart: () => void;
};

export function HeroWelcome({ onStart }: HeroWelcomeProps) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#312e81] to-[#0c4a6e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,70,193,0.35),_transparent_55%)]" />
      <ParticleField className="opacity-80" density={56} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl text-center"
      >
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

        <motion.p
          className="mx-auto mt-6 max-w-xl text-sm text-violet-100/85 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Interactive experience · Smooth motion · Built for performance
        </motion.p>

        <motion.div
          className="relative mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 120, damping: 14 }}
        >
          <span className="pulse-ring relative inline-flex">
            <motion.button
              type="button"
              onClick={onStart}
              className="btn-glow relative rounded-full bg-gradient-to-r from-[#6B46C1] to-[#4299E1] px-12 py-4 text-lg font-bold tracking-wide text-white shadow-xl transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              START
            </motion.button>
          </span>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 text-xs text-violet-200/50">
        Press START to enter
      </div>
    </section>
  );
}
