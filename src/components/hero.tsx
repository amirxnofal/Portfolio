"use client";

import { motion, useReducedMotion } from "framer-motion";
import Portrait from "@/components/portrait";
import Magnetic from "@/components/magnetic-button";
import { GITHUB_URL } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-16 md:pt-0">
      {/* background engineering grid */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
      {/* oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-2vw] select-none font-mono text-[18vw] font-semibold leading-none tracking-tight text-[var(--text-c)]/[0.028]"
      >
        API
      </div>

      {/* top red hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-c)]/50 to-transparent"
      />

      <div className="container-x relative grid items-center gap-16 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Left: copy ─────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          <motion.div
            {...fadeUp(0.1)}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 font-mono text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-bright)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
            </span>
            <span className="tracking-[0.18em] text-[var(--text-secondary)]">
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          {/* terminal-style greeting */}
          <motion.p
            {...fadeUp(0.2)}
            className="mb-4 font-mono text-sm text-[var(--text-muted)]"
          >
            <span className="text-[var(--accent-bright)]">$</span> whoami
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="text-[clamp(2.6rem,8vw,5.2rem)] font-semibold leading-[0.95] tracking-tight"
          >
            <span className="block text-[var(--text-c)]">Amir</span>
            <span className="text-outline block">Backend</span>
            <span className="text-gradient-red block">Engineer.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-7 max-w-md text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            I design data models, tune queries, and ship{" "}
            <span className="text-[var(--text-c)]">secure, scalable REST APIs</span> with
            Node.js — systems that stay fast, observable, and hard to break.
          </motion.p>

          {/* keyword strip */}
          <motion.div
            {...fadeUp(0.55)}
            className="mt-7 flex flex-wrap gap-2"
          >
            {["Node.js", "Express", "MongoDB", "Redis", "JWT"].map((k) => (
              <span
                key={k}
                className="rounded border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--accent-c)] hover:text-[var(--accent-bright)]"
              >
                {k}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.68)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.18}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent-c)] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent-bright)]"
              >
                View Projects
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>

            <Magnetic strength={0.14}>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-3.5 font-mono text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--text-c)] hover:text-[var(--text-c)]"
              >
                <GithubIcon className="h-4 w-4 transition-colors duration-300 group-hover:text-[var(--accent-bright)]" />
                /amirxnofal
              </a>
            </Magnetic>
          </motion.div>

          {/* micro row */}
          <motion.div
            {...fadeUp(0.8)}
            className="mt-12 hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] md:flex"
          >
            <span>7x public repos</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" />
            <span>47-endpoint API</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" />
            <span>3-layer rate limiting</span>
          </motion.div>
        </div>

        {/* ── Right: layered portrait ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="order-1 flex justify-center lg:order-2"
        >
          <Portrait />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        {...fadeUp(1.0)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
          scroll
        </span>
        <motion.div
          className="h-8 w-px overflow-hidden"
          style={{ background: "var(--border-strong)" }}
        >
          <motion.div
            className="h-3 w-px bg-[var(--accent-bright)]"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18.92-.26 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.67.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}