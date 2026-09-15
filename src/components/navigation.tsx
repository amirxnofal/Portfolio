"use client";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

/**
 * Fixed top navigation with scroll-progress line, blur backdrop,
 * and a mobile menu.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Progress is a motion value driven by a single rAF-throttled,
  // passive scroll listener — no per-event React work.
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    let lastScrolled = false;

    const sync = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(max > 0 ? Math.min(1, y / max) : 0);

      const next = y > 40;
      if (next !== lastScrolled) {
        lastScrolled = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-wide">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
            <span className="text-[var(--text-c)]">amir</span>
            <span className="text-[var(--text-muted)]">/backend</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link-line flex items-baseline gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-c)]"
              >
                <span className="text-[var(--accent-c)]">{l.index}</span>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-all hover:border-[var(--accent-c)] hover:text-[var(--accent-bright)]"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 bg-[var(--text-c)] transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-[var(--text-c)] transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Scroll progress line */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-[var(--accent-deep)] via-[var(--accent-c)] to-[var(--accent-bright)]"
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[var(--bg)]/97 px-8 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: "easeOut" }}
                  className="group flex items-baseline gap-3 border-b border-[var(--border)] py-5 font-mono text-2xl uppercase tracking-tight text-[var(--text-secondary)] last:border-none hover:text-[var(--text-c)]"
                >
                  <span className="text-xs text-[var(--accent-c)]">{l.index}</span>
                  {l.label}
                  <span className="ml-auto text-xs text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              amir / backend — building secure & scalable APIs
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}