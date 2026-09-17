"use client";

import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { PROJECTS } from "@/lib/data";
import Magnetic from "@/components/magnetic-button";

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured)!;
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-secondary)] py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[var(--accent-c)]/6 blur-[110px]"
      />

      <div className="container-x relative">
        <SectionHeading
          index="04"
          kicker="projects --repos"
          title={
            <>
              Real systems,
              <br />
              <span className="text-gradient-red">built solo.</span>
            </>
          }
        />

        {/* ── Featured project: E-Commerce ─────────────────── */}
        <Reveal>
          <article className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 hover:border-[var(--border-strong)]">
            {/* top-left header bar */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--accent-deep)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--border-strong)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--border-strong)]" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#f1e05a]" />
                <span>JavaScript</span>
                <span className="text-[var(--border-strong)]">/</span>
                <span className="text-[var(--text-secondary)]">amirxnofal/E-Commerce</span>
              </div>
            </div>

            <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left: copy + terminal */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-c)]/40 bg-[var(--accent-ghost)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-bright)]">
                  ✦ Featured build
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text-c)] md:text-4xl">
                  E-Commerce Platform
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-[var(--text-secondary)]">
                  {featured.description} —{" "}
                  <span className="text-[var(--text-c)]">
                    47 endpoints, 8 modules, zero teammates.
                  </span>
                </p>

                {/* terminal window */}
                <div className="mt-7 overflow-hidden rounded-xl border border-[var(--border)] bg-[#0a0a0a] font-mono text-[13px] leading-relaxed">
                  <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-[11px] text-[var(--text-muted)]">
                    <span className="text-[var(--accent-bright)]">~/E-Commerce</span>
                    <span>— zsh</span>
                  </div>
                  <div className="px-5 py-4">
                    <div>
                      <span className="text-[var(--accent-bright)]">$</span>{" "}
                      <span className="text-[var(--text-c)]">curl POST /api/v1/orders</span>
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      ├─ auth: jwt + refresh validation
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      ├─ service: reserve stock (atomic)
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      ├─ cache: invalidate cart in Redis
                    </div>
                    <div className="text-[var(--text-muted)]">
                      └─ <span className="text-[#4ade80]">200 ✓</span> order created · 42ms
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: architecture facts */}
              <div className="flex flex-col justify-between gap-6">
                <div className="grid gap-3">
                  {featured.details?.slice(0, 5).map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 transition-colors duration-300 group-hover:border-[var(--border-strong)]"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent-c)]" />
                      <span className="text-sm leading-snug text-[var(--text-secondary)]">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 self-start">
                  <Magnetic strength={0.15}>
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-6 py-3 font-mono text-sm text-[var(--text-c)] transition-all duration-300 hover:border-[var(--accent-c)] hover:text-[var(--accent-bright)]"
                    >
                      <span>view source</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                    </a>
                  </Magnetic>

                  {/* only rendered for projects that are actually deployed */}
                  {featured.deployUrl && (
                    <Magnetic strength={0.15}>
                      <a
                        href={featured.deployUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 rounded-full border border-[var(--accent-c)]/50 bg-[var(--accent-ghost)] px-6 py-3 font-mono text-sm text-[var(--accent-bright)] transition-all duration-300 hover:border-[var(--accent-c)]"
                      >
                        <span>live demo</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </div>

            {/* bottom red line */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--accent-deep)] via-[var(--accent-c)] to-transparent"
            />
          </article>
        </Reveal>

        {/* ── Other projects grid ──────────────────────────── */}
        {/* flex-wrap + justify-center instead of a fixed 4-col grid:
            a partial row (1–3 cards) centers instead of leaving a
            one-sided void, and each card keeps the exact same width
            as the old grid at every breakpoint. */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {others.map((p, i) => (
            <Reveal
              key={p.name}
              delay={0.06 * i}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              {/* The card is no longer one big <a>: it carries a GitHub link
                  plus an optional deployed link, and anchors can't nest. The
                  title owns a stretched link (::before covering the card) so
                  clicking anywhere still opens the repo; the live link below
                  sits above that overlay with z-10. */}
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-c)]/50">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background:
                          p.language === "TypeScript" ? "#3178c6" : "#f1e05a",
                      }}
                    />
                    {p.language}
                  </div>
                  <h4 className="mt-3 font-mono text-base font-semibold text-[var(--text-c)] transition-colors duration-300 group-hover:text-[var(--accent-bright)]">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} — source on GitHub`}
                      className="before:absolute before:inset-0 before:content-['']"
                    >
                      {p.name}
                    </a>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                    >
                      {t}
                    </span>
                  ))}

                  <div className="ml-auto flex items-center gap-2">
                    {/* rendered only when the project is actually deployed */}
                    {p.deployUrl && (
                      <a
                        href={p.deployUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} — live demo`}
                        className="relative z-10 inline-flex items-center gap-1 rounded border border-[var(--accent-c)]/40 bg-[var(--accent-ghost)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--accent-bright)] transition-colors duration-300 hover:border-[var(--accent-c)]"
                      >
                        live demo <span aria-hidden>↗</span>
                      </a>
                    )}
                    <span
                      aria-hidden
                      className="font-mono text-[11px] text-[var(--text-muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--accent-bright)]"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}