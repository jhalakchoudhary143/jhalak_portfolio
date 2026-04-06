"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { SiteNav } from "@/components/layout/SiteNav";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroWelcome } from "@/components/sections/HeroWelcome";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export function PortfolioExperience() {
  const [started, setStarted] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);

  function handleStart() {
    setStarted(true);
    window.setTimeout(() => setAssistantTyping(true), 450);
  }

  return (
    <div id="top" className="min-h-[100dvh]">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="hero"
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[100dvh]"
          >
            <HeroWelcome onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <SiteNav />
            <main>
              <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,70,193,0.22),_transparent_55%)]" />
                <div className="relative mx-auto max-w-6xl">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10"
                  >
                    <ProfilePhoto size="md" priority />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Portfolio
                      </p>
                      <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Hi, I&apos;m{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                          Jhalak Choudhary
                        </span>
                      </h1>
                      <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
                        Welcome in — explore my story, skills, and projects. Use the assistant (bottom
                        right) to ask questions about my background.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </section>

              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />

              <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-muted">
                    © {new Date().getFullYear()} Jhalak Choudhary. All rights reserved.
                  </p>
                  <p className="text-xs text-muted">Crafted with Next.js · Tailwind · Motion · Three.js</p>
                </div>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AssistantPanel active={started} startTyping={assistantTyping} />
    </div>
  );
}
