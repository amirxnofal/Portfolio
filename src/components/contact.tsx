"use client";

import Reveal from "@/components/reveal";
import Magnetic from "@/components/magnetic-button";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/data";
import { GithubIcon } from "@/components/hero";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-[var(--border)] py-28 md:py-40"
    >
      {/* background: oversized CTA text */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-semibold leading-none tracking-tight"
      >
        <span className="text-outline text-[16vw]">LET&apos;S</span>
      </div>

      <div className="container-x relative -mt-8 text-center md:-mt-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-bright)]">
            {/* contact */}
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--text-c)] md:text-6xl">
            Have an API that needs to{" "}
            <span className="text-gradient-red">stay standing?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            I&apos;m open to backend roles and freelance work. My inbox is a queue — every
            message gets processed.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.18}>
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent-c)] px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent-bright)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {EMAIL}
                <span className="font-mono text-xs opacity-80 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>

            <Magnetic strength={0.14}>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--text-c)] hover:text-[var(--text-c)]"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </Magnetic>

            <Magnetic strength={0.14}>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-4 text-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--text-c)] hover:text-[var(--text-c)]"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            response time:{" "}
            <span className="text-[#4ade80]">&lt; 24h</span> · status:{" "}
            <span className="text-[var(--accent-bright)]">accepting</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}