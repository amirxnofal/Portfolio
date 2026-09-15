"use client";

import Reveal from "@/components/reveal";
import { GITHUB_URL, GITHUB_USERNAME, PROJECTS, PROFILE } from "@/lib/data";
import Magnetic from "@/components/magnetic-button";
import { GithubIcon } from "@/components/hero";

const ACHIEVEMENTS = ["Pull Shark", "YOLO"];

const REPO_LINES: Record<string, string> = {
  "E-Commerce": "…built solo: Node, MongoDB, Redis",
  "social-media-app": "Express · MongoDB · Redis",
  "Sara7a-App": "anonymous confession app",
  "social-media-app-ts": "TypeScript rewrite",
  eCommerceFrontend: "REST client UI",
};

/**
 * GitHub band — real profile stats and a fast path to the repos.
 */
export default function GithubBand() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      {/* corner flood */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-[-80px] h-96 w-96 rounded-full bg-[var(--accent-c)]/8 blur-[120px]"
      />

      <div className="container-x relative">
        <Reveal>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-bright)]">
                  $ git status
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-c)] md:text-4xl">
                  The work is public.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                  No screenshots of made-up products — everything below is a real repository
                  you can read, run, and review.
                </p>

                {/* live stat readout */}
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Stat value={String(PROFILE.github.publicRepos)} label="public repos" />
                  <Stat value={String(PROFILE.github.followers)} label="followers" />
                  <div className="flex items-center gap-2">
                    {ACHIEVEMENTS.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-[var(--border-strong)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        🏅 {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Magnetic strength={0.16}>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-4 rounded-full bg-[var(--text-c)] px-8 py-4 text-sm font-semibold text-[var(--bg)] transition-colors duration-300 hover:bg-[var(--accent-bright)] hover:text-white"
                >
                  <GithubIcon className="h-5 w-5" />
                  github.com/{GITHUB_USERNAME}
                  <span className="font-mono text-xs opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </Magnetic>
            </div>

            {/* terminal flourish */}
            <div className="mt-10 border-t border-[var(--border)] pt-6 font-mono text-xs leading-6 text-[var(--text-muted)]">
              <div>
                <span className="text-[var(--accent-bright)]">$</span> gh repo list --owner{" "}
                {GITHUB_USERNAME}
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    {p.name} {REPO_LINES[p.name] ?? "…public on GitHub"}
                  </div>
                ))}
                <div>amirxnofal   …this profile</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-semibold text-[var(--text-c)]">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}