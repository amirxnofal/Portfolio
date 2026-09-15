"use client";

import { GITHUB_URL, LINKEDIN_URL } from "@/lib/data";
import { GithubIcon } from "@/components/hero";
import { LinkedinIcon } from "@/components/contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-c)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
          amir/backend
        </a>

        <p className="font-mono text-xs text-[var(--text-muted)]">
          © {year} — built as an API: one request at a time
        </p>

        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-bright)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-bright)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}