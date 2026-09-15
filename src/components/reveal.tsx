"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal built on `useInView` (IntersectionObserver).
 *
 * `initial={false}` keeps the server-rendered output visible (no inline
 * `opacity: 0`), so content is never trapped invisible if the observer
 * doesn't fire — it only hides once JS hydrates and frames it for the
 * scroll-in animation. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const show = reduce || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : y }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}