"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

export interface MousePosition {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks pointer position on the GPU thread.
 *
 * Position lives in framer-motion values (imperative DOM updates), so
 * moving the mouse never re-renders React. Events are rAF-throttled:
 * each frame we read the latest cursor position and write it once.
 */
export function useMousePosition(): MousePosition {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    let latestX = 0;
    let latestY = 0;

    const onMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          x.set(latestX);
          y.set(latestY);
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [x, y]);

  return { x, y };
}