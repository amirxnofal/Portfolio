"use client";

import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";

const STATS = [
  { value: "47", label: "endpoints in one API" },
  { value: "8", label: "API modules" },
  { value: "3", label: "rate-limit layers" },
  { value: "100+", label: "git commits shipped" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          kicker="whoami  --profile"
          title={
            <>
              Turning requirements into
              <br />
              <span className="text-gradient-red">reliable systems.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Left: narrative */}
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-[var(--text-secondary)] md:text-2xl">
                I&apos;m Amir — a backend developer who cares about the part of the product
                nobody sees but everybody feels:{" "}
                <span className="text-[var(--text-c)]">the API that never drops a request</span>,
                the database that answers in milliseconds, the auth that keeps attackers out.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl leading-relaxed text-[var(--text-muted)]">
                My work is grounded in a layered, modular architecture —{" "}
                <span className="font-mono text-[var(--text-secondary)]">
                  Route → Middleware → Controller → Service → Model
                </span>{" "}
                — where validation happens once, business logic stays testable, and every
                failure mode has an explicit response.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 font-mono text-sm leading-7">
                <div>
                  <span className="text-[var(--accent-bright)]">$</span>{" "}
                  <span className="text-[var(--text-c)]">SYSTEM_STATUS</span>
                </div>
                <div className="text-[var(--text-muted)]">
                  │ focus:
                </div>
                <div className="pl-4 text-[var(--text-secondary)]">
                  ├─ schema design &amp; query tuning
                </div>
                <div className="pl-4 text-[var(--text-secondary)]">
                  ├─ API security &amp; rate limiting
                </div>
                <div className="pl-4 text-[var(--text-secondary)]">
                  ├─ caching hot paths with Redis
                </div>
                <div className="pl-4 text-[var(--text-secondary)]">
                  └─ auth flows: JWT, refresh rotation
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: stat blocks */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent-c)]/60">
                  <div
                    aria-hidden
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[var(--accent-ghost)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="font-mono text-4xl font-semibold text-[var(--text-c)]">
                    {s.value}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-[var(--text-muted)]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}