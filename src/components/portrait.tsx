"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ORBIT_TECH } from "@/lib/data";

const LAYER0 = "/images/me-layer/01-c0h-hqxb3FIxL_jdhbj6N_y1JPSKG6.png";
const LAYER2 = "/images/me-layer/02-tgWbQq_NgV4lDaS6quQ5N_tAWi4we7.png";
const LAYER3 = "/images/me-layer/03-KR1H7mYi3VUo5r7Xm3U4E_woxKLTXT.png";

/**
 * Layered portrait with mouse-parallax depth and a rotating
 * tech "orbit" — the interactive network around the engineer.
 */
export default function Portrait() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Springs with different stiffness = natural per-layer depth
  const bgX = useSpring(mx, { stiffness: 40, damping: 22 });
  const bgY = useSpring(my, { stiffness: 40, damping: 22 });
  const midX = useSpring(mx, { stiffness: 70, damping: 24 });
  const midY = useSpring(my, { stiffness: 70, damping: 24 });
  const fgX = useSpring(mx, { stiffness: 110, damping: 26 });
  const fgY = useSpring(my, { stiffness: 110, damping: 26 });

  const [orbitOn, setOrbitOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // rAF-throttled: capture the latest pointer position per frame and
    // write it to the motion values once — the springs smooth the rest.
    let raf = 0;
    let latestX = 0;
    let latestY = 0;
    const onMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const cw = window.innerWidth;
          const ch = window.innerHeight;
          mx.set(((latestX - cw / 2) / cw) * 2);
          my.set(((latestY - ch / 2) / ch) * 2);
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mx, my, reduce]);

  // Kick the orbit labels into the DOM after mount so they spin smoothly.
  useEffect(() => {
    const t = setTimeout(() => setOrbitOn(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full max-w-[420px] select-none">
      {/* ── Atmosphere glow behind ─────────────────────────── */}
      <div
        className="absolute -inset-8 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(201,24,24,0.16) 0%, rgba(11,11,11,0) 60%)",
        }}
        aria-hidden
      />

      {/* ── Tech orbit ring ───────────────────────────────── */}
      <div aria-hidden className="absolute inset-x-[-12%] inset-y-[-14%] sm:inset-x-[-20%] sm:inset-y-[-18%]">
        <div className="relative h-full w-full">
          {/* slowly rotating dashed reference ring */}
          <motion.div
            className="absolute inset-[13%] rounded-full border border-dashed border-[var(--border-strong)]/60"
            animate={!reduce && orbitOn ? { rotate: 360 } : {}}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          {/* orbiting red pulse marker (second, faster ring) */}
          <motion.div
            className="absolute inset-[7%] rounded-full border border-[var(--border)]/30"
            animate={!reduce && orbitOn ? { rotate: 360 } : {}}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-bright)] shadow-[0_0_18px_rgba(239,43,43,0.9)]" />
          </motion.div>
          {/* static tech node chips on the circle */}
          {ORBIT_TECH.map((t, i) => {
            const angle = (i / ORBIT_TECH.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const rPct = 46; // distance from center as %
            const x = (50 + rPct * Math.cos(rad)).toFixed(3);
            const y = (50 + rPct * Math.sin(rad)).toFixed(3);
            return (
              <div
                key={t.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex flex-col items-center gap-0.5 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--bg)]/85 px-2.5 py-1.5 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent-c)]/60">
                  <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--text-c)]">
                    {t.label}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {t.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Portrait slab ──────────────────────────────────── */}
      <div className="relative z-10 h-full w-full">
        <div
          className="relative h-full w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]"
          style={{
            maskImage: "radial-gradient(ellipse 120% 100% at 50% 0%, black 68%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 120% 100% at 50% 0%, black 68%, transparent 100%)",
          }}
        >
          {/* Background scene layer — slowest.
              Filter is static; only `transform` animates, and the layer
              is GPU-promoted via will-change so it composites, not paints. */}
          <motion.img
            src={LAYER0}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            style={{ x: bgX, y: bgY, willChange: "transform", filter: "grayscale(90%) brightness(0.42) contrast(1.15)" }}
            width={544}
            height={736}
            decoding="async"
          />
          {/* Atmosphere layer — fastest drift */}
          <motion.img
            src={LAYER3}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
            style={{ x: fgX, y: fgY, willChange: "transform", filter: "grayscale(100%) brightness(0.5) contrast(1.2)" }}
            width={544}
            height={736}
            decoding="async"
          />
          {/* Red multiply wash over the atmosphere for identity */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(205deg, rgba(201,24,24,0.38) 0%, rgba(12,3,3,0.55) 45%, rgba(5,5,5,0.85) 100%)",
            }}
          />

          {/* Portrait layer — middle depth, primary subject */}
          <motion.img
            src={LAYER2}
            alt="Amir — backend developer"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ x: midX, y: midY, willChange: "transform", filter: "grayscale(82%) brightness(0.86) contrast(1.08)" }}
            width={544}
            height={736}
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
          {/* Understated red rim light from below */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(120% 40% at 50% 100%, rgba(201,24,24,0.30) 0%, rgba(0,0,0,0) 55%)",
            }}
          />

          {/* Scanning line — full-height strip moved with transform only
              (translateY % = % of container height), so no layout thrash. */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              animate={{ y: ["12%", "84%", "12%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(239,43,43,0.8), transparent)" }}
              />
            </motion.div>
          )}

          {/* Corner frame */}
          <div aria-hidden className="pointer-events-none absolute inset-3">
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
              (cls, i) => (
                <div key={i} className={`absolute h-6 w-6 border-[var(--accent-c)]/90 ${cls}`} />
              )
            )}
          </div>
        </div>

        {/* ── HUD readouts around the portrait ──────────────── */}
        <HudChip className="-left-4 top-10" label="LATENCY" value="42ms" pulse />
        <HudChip className="-right-6 top-1/3" label="STATUS" value="200 ✓" />
        <HudChip className="-left-6 bottom-1/4" label="NODE" value="v20.x" />
        <HudChip className="-right-4 bottom-8" label="DB" value="55% used" pulse />
      </div>
    </div>
  );
}

function HudChip({
  className = "",
  label,
  value,
  pulse = false,
}: {
  className?: string;
  label: string;
  value: string;
  pulse?: boolean;
}) {
  return (
    <div
      className={`absolute z-20 hidden items-center gap-2 rounded border border-[var(--border)] bg-[var(--bg)]/85 px-2.5 py-1.5 font-mono text-[10px] backdrop-blur-sm lg:flex ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${pulse ? "animate-pulse" : ""}`}
        style={{ background: pulse ? "var(--accent-bright)" : "var(--text-muted)" }}
      />
      <span className="uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</span>
      <span className="font-medium text-[var(--text-c)]">{value}</span>
    </div>
  );
}