"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

type CursorMode = "default" | "link" | "view" | "text";

/**
 * Custom cursor: a precise red dot plus a spring-lagged ring.
 * Grows into a labeled ring over interactive elements (fine pointers only).
 * Position is animated through framer motion values — no re-renders.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const { x, y } = useMousePosition();

  const dotX = useTransform(x, (v) => v - 3);
  const dotY = useTransform(y, (v) => v - 3);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const [mode, setMode] = useState<CursorMode>("default");
  const enabledRef = useRef(false);

  useEffect(() => {
    // Skip entirely on a mouse-less pointer OR reduced-motion users
    // (they keep their native cursor instead of a hidden one).
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    enabledRef.current = true;
    document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, [reduce]);

  useEffect(() => {
    // The DOM `custom-cursor` class already hides the native cursor — this
    // listener only widens the custom ring over interactive elements.
    if (!enabledRef.current) return;

    const targets = ["a", "button", "[data-cursor='link']"];
    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hasLink =
        t?.closest(targets.join(",")) ||
        t?.closest("[data-cursor='view']");
      setMode(hasLink ? "link" : t?.closest("[data-cursor='text']") ? "text" : "default");
    };

    window.addEventListener("mouseover", enter);
    return () => window.removeEventListener("mouseover", enter);
  }, []);

  if (reduce) return null;

  const ringSize = mode === "default" ? 36 : mode === "link" ? 64 : 44;

  return (
    <>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" />
      </motion.div>

      {/* Lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize, opacity: mode === "default" ? 0.55 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-c)]/80"
        >
          {mode === "link" && (
            <div className="flex h-full w-full items-center justify-center text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--text-c)]">
              Open
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}