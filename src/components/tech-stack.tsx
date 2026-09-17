"use client";

import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { TECH_GROUPS, PROJECTS } from "@/lib/data";

export default function TechStack() {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-secondary)] py-24 md:py-36"
    >
      {/* red tint glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-[var(--accent-c)]/8 blur-[100px]"
      />

      <div className="container-x relative">
        <SectionHeading
          index="02"
          kicker="capabilities --stack"
          title={
            <>
              The stack I build
              <br />
              <span className="text-gradient-red">systems on.</span>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_GROUPS.map((g, i) => (
            <Reveal key={g.code} delay={0.06 * (i % 3)}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-c)]/50">
                {/* indexed corner number */}
                <div
                  aria-hidden
                  className="absolute right-5 top-5 font-mono text-sm text-[var(--border-strong)] transition-colors duration-300 group-hover:text-[var(--accent-c)]"
                >
                  0{i + 1}
                </div>

                <div className="font-mono text-xs tracking-[0.16em] text-[var(--accent-bright)]">
                  {g.code}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-c)]">{g.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                  {g.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--border-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* bottom red line on hover */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent-c)] transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* footnote */}
        <Reveal delay={0.25}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {"// every layer above maps to production code in "}
            <a
              href={PROJECTS.find((p) => p.featured)!.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-secondary)] underline decoration-[var(--accent-c)]/60 underline-offset-4 transition-colors hover:text-[var(--accent-bright)]"
            >
              repos/amirxnofal
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}