"use client";

import Reveal from "@/components/reveal";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: React.ReactNode;
  className?: string;
}

/**
 * Consistent section opener: index number, monospace kicker, big title.
 */
export default function SectionHeading({ index, kicker, title, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <div className="mb-12">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <span className="text-[var(--accent-bright)]">/{index}</span>
          <span className="h-px w-12 bg-[var(--border-strong)]" />
          {kicker}
        </div>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}