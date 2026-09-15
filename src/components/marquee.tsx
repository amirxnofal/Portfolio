import { CORE_TECH } from "@/lib/data";

/**
 * Infinite scrolling strip of the core stack.
 * Runs as a pure CSS transform loop on the compositor thread —
 * no JS animation, no re-renders, no reduced-motion conflict
 * (the global reduced-motion block kills the animation).
 */
function Row({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <div key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {t}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-[var(--accent-c)]/80" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const row = [...CORE_TECH.map((t) => `${t}`)];

  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-secondary)] py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent"
        aria-hidden
      />
      <div className="animate-marquee flex whitespace-nowrap" style={{ width: "max-content" }}>
        <Row items={row} />
        <div className="flex shrink-0 items-center" aria-hidden>
          {row.map((t, i) => (
            <div key={i} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-mono text-sm text-[var(--text-secondary)]/60 uppercase tracking-[0.22em]">
                {t}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-[var(--accent-c)]/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}