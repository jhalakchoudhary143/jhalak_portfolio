"use client";

import { motion } from "framer-motion";
import { SOFT_SKILLS, TECH_SKILLS } from "@/lib/constants";

function SkillFlipCard({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.45 }}
      className="group h-36 [perspective:1200px] sm:h-40"
    >
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/25 to-blue-600/15 p-4 shadow-lg [backface-visibility:hidden]">
          <div>
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <p className="mt-1 text-xs text-muted">Hover to flip</p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#6B46C1] to-[#4299E1]"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-violet-400/30 bg-[#1a1025]/95 p-4 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-300">Proficiency</p>
          <p className="mt-2 text-3xl font-bold text-white">{level}%</p>
          <p className="mt-2 text-xs leading-relaxed text-violet-100/80">
            Practice · Projects · Persistence
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Skills</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Technical & soft skills</h2>
          <p className="mt-3 text-muted">
            Flip cards on hover — progress animates into view as you scroll.
          </p>
        </motion.div>

        <div className="mb-12">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground/90">
            Technical
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_SKILLS.map((s, i) => (
              <SkillFlipCard key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground/90">Soft</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {SOFT_SKILLS.map((s, i) => (
              <SkillFlipCard key={s.name} name={s.name} level={s.level} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
