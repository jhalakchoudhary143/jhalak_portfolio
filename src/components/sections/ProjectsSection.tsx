"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { IconGithub } from "@/components/icons/BrandIcons";
import { PROJECTS } from "@/lib/constants";

function ProjectCard({
  title,
  description,
  tech,
  gradient,
  badge,
  links,
}: (typeof PROJECTS)[number]) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 14);
    my.set(py * -10);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const transform = useMotionTemplate`perspective(900px) rotateX(${my}deg) rotateY(${mx}deg)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass group relative overflow-hidden rounded-3xl"
    >
      <motion.div
        style={{ transform }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="origin-center will-change-transform"
      >
      <div
        className={`relative h-40 bg-gradient-to-br ${gradient} transition duration-500 group-hover:brightness-110`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="absolute bottom-4 left-4 text-3xl font-black text-white/90 drop-shadow-md">
          {title.slice(0, 1)}
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
          {badge ? (
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200"
            >
              {t}
            </span>
          ))}
        </div>
        {links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((l) => {
              const hasLink = l.href.trim().length > 0;
              const content = (
                <>
                  {l.label === "GitHub" ? (
                    <IconGithub className="h-4 w-4" aria-hidden />
                  ) : (
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  )}
                  {hasLink ? l.label : "Add GitHub link"}
                </>
              );

              if (!hasLink) {
                return (
                  <span
                    key={l.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-muted"
                  >
                    {content}
                  </span>
                );
              }

              return (
                <a
                  key={l.label + l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-white/10"
                >
                  {content}
                </a>
              );
            })}
          </div>
        ) : (
          <p className="mt-5 text-xs text-muted">No public repo link yet — add one in `src/lib/constants.ts` when ready.</p>
        )}
      </div>
      </motion.div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Projects</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Selected work</h2>
          <p className="mt-3 text-muted">Hover cards for a subtle 3D tilt. Links open in a new tab.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
