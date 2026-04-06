"use client";

import { motion } from "framer-motion";
import { ABOUT_TEXT } from "@/lib/constants";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
            <ProfilePhoto size="lg" priority />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">About me</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Student · Builder · Curious mind
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{ABOUT_TEXT}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
