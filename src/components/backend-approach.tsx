"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { PIPELINE } from "@/lib/data";

/**
 * The engineering section — an animated live request pipeline
 * that literally diagrams how the codebase is shaped.
 */
export default function BackendApproach() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="engineering" className="relative scroll-mt-20 overflow-hidden py-24 md:py-36">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />

      {/* huge faint label */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-2vw] top-10 select-none font-mono text-[10vw] font-semibold leading-none text-[var(--text-c)]/[0.03]"
      >
        FLOW
      </div>

      <div className="container-x relative">
        <SectionHeading
          index="03"
          kicker="engineering --approach"
          title={
            <>
              How I architect
              <br />
              <span className="text-gradient-red">a request.</span>
            </>
          }
        />

        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Every endpoint in my projects follows the same traceable path. Each stage has one
            job, and a request can be rejected fast — before it ever touches the database.
            Hover a stage to see its role.
          </p>
        </Reveal>

        {/* ── Live pipeline ─────────────────────────────── */}
        <Reveal delay={0.15} className="mt-14">
          <div className="relative overflow-x-auto pb-4">
            <div className="min-w-[760px]">
              <div className="relative flex items-center gap-0">
                {PIPELINE.map((p, i) => (
                  <div key={p.step} className="flex flex-1 items-center">
                    <Stage
                      node={p.node}
                      step={p.step}
                      detail={p.detail}
                      color={p.color}
                      isActive={active === i}
                      hasActiveNeighbor={
                        active !== null && Math.abs(active - i) === 1
                      }
                      onEnter={() => setActive(i)}
                      onLeave={() => setActive(null)}
                    />
                    {i < PIPELINE.length - 1 && (
                      <Connector
                        lit={active !== null && (active === i || active === i + 1)}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* live traffic: packets moving left→right */}
              <Traffic />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-bright)]">
                fail-fast principle
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Validation, auth and rate limits run <em>before</em> business logic, so invalid
                traffic dies in middleware — never loading the database.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-bright)]">
                atomic states
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Stock is reserved on order and restored on cancel — no double-sell, and a{" "}
                <span className="text-[var(--text-secondary)]">200 ✓</span> only means the whole
                transaction committed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stage({
  node,
  step,
  detail,
  color,
  isActive,
  hasActiveNeighbor,
  onEnter,
  onLeave,
}: {
  node: string;
  step: string;
  detail: string;
  color: string;
  isActive: boolean;
  hasActiveNeighbor: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative flex flex-col items-center rounded-xl border bg-[var(--surface)] px-4 py-5 text-center transition-all duration-300 ${
        isActive
          ? "border-[var(--accent-c)] bg-[var(--accent-ghost)]"
          : hasActiveNeighbor
            ? "border-[var(--border-strong)]"
            : "border-[var(--border)]"
      }`}
    >
      <span
        className="absolute -top-px left-4 h-px w-8"
        style={{ background: color }}
        aria-hidden
      />
      <span className="font-mono text-xs text-[var(--text-muted)]">{step}</span>
      <span
        className={`mt-1 font-mono text-lg font-semibold transition-colors duration-300 ${
          isActive ? "text-[var(--accent-bright)]" : "text-[var(--text-c)]"
        }`}
      >
        {node}
      </span>
      <span
        className="mt-2 hidden h-px w-6 transition-all duration-300"
        style={{ background: isActive ? "var(--accent-c)" : "var(--border-strong)" }}
        aria-hidden
      />
      <span className="mt-2 hidden max-w-[150px] text-[11px] leading-snug text-[var(--text-muted)] md:block">
        {detail}
      </span>
    </div>
  );
}

function Connector({ lit }: { lit: boolean }) {
  return (
    <div className="relative mx-1.5 h-px flex-1">
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: lit
            ? "repeating-linear-gradient(90deg, var(--accent-c) 0 6px, transparent 6px 12px)"
            : "repeating-linear-gradient(90deg, var(--border-strong) 0 6px, transparent 6px 12px)",
        }}
      />
      <span className="absolute -top-[3px] -translate-y-full font-mono text-[9px] text-[var(--text-muted)]">
        →
      </span>
    </div>
  );
}

/** Animated request packets travelling along the pipeline.
 *  Pure CSS transform/opacity animation — compositor thread only. */
function Traffic() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  const packets = [{ delay: 0 }, { delay: 1.1 }, { delay: 2.2 }];

  return (
    <div aria-hidden className="relative flex h-8 items-center justify-between">
      {packets.map((p, i) => (
        <div key={i} className="relative flex-1">
          <div
            className="absolute top-0 h-2 w-2 rounded-sm bg-[var(--accent-bright)]"
            style={{
              boxShadow: "0 0 12px rgba(239,43,43,0.7)",
              willChange: "transform, opacity",
              animation: "packet-travel 4s linear infinite",
              animationDelay: `${p.delay * (i + 0.5)}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}