"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}

/**
 * Wraps content in a spring-backed magnetic field: elements gravitate
 * toward the cursor within `strength` px, then relax on leave.
 * Driven by motion values so hover never re-renders React.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.25,
  onClick,
  href,
  ariaLabel,
  style,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <motion.div className={className} style={style} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      className="inline-block"
    >
      <motion.div
        style={{ x: sx, y: sy, display: "inline-block" }}
      >
        {href ? (
          <a href={href} aria-label={ariaLabel} target="_blank" rel="noreferrer">
            {inner}
          </a>
        ) : (
          inner
        )}
      </motion.div>
    </div>
  );
}