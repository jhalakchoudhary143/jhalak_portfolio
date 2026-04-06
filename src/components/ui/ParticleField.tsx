"use client";

import { useEffect, useRef } from "react";

type ParticleFieldProps = {
  className?: string;
  density?: number;
};

export function ParticleField({ className = "", density = 48 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let raf = 0;
    let w = 0;
    let h = 0;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] =
      [];

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;
      const count = Math.floor((density * w) / 1000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          a: Math.random() * 0.5 + 0.2,
        });
      }
    }

    function tick() {
      context.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        context.beginPath();
        context.fillStyle = `rgba(196, 181, 253, ${p.a})`;
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
