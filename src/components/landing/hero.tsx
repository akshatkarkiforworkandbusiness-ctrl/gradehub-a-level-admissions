"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Globe,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const HEADLINE = ["Turn", "your", "A-Levels", "into", "an", "offer."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax for the whole hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Mouse parallax for the interactive preview
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetMouse() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900 text-white"
    >
      {/* Animated grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      {/* Soft top glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28">
        {/* Left: copy */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300"
          >
            <Sparkles size={13} /> A-Level → University, decoded
          </motion.div>

          <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
                className={`mr-[0.25em] inline-block ${
                  word === "offer." ? "text-sky-400" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Calculate UCAS points, predict your grades, convert to a global GPA
            and build a data-driven university shortlist — all in one free,
            no-signup toolkit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/profile"
              className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-[0.98]"
            >
              Build my profile
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/ucas-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]"
            >
              <Calculator size={16} /> Calculate UCAS points
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6 text-xs text-slate-400"
          >
            No account needed · UCAS 2026/2027 reference · UK, US, Canada, EU &
            Australia
          </motion.p>
        </motion.div>

        {/* Right: interactive preview card */}
        <motion.div
          style={{ y: previewY }}
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="relative [perspective:1200px]"
          onMouseMove={handleMouse}
          onMouseLeave={resetMouse}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                <GraduationCap size={12} /> Live projection
              </span>
              <span className="font-mono text-[10px] text-slate-400">A2-Level</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <PreviewStat
                icon={<TrendingUp size={14} className="text-sky-400" />}
                label="UCAS Points"
                value="144"
                sub="3 subjects"
              />
              <PreviewStat
                icon={<Globe size={14} className="text-emerald-400" />}
                label="US GPA"
                value="3.7"
                sub="4.0 scale"
              />
            </div>

            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>Draftlist match</span>
                <span>3 universities</span>
              </div>
              <div className="space-y-2.5">
                <PreviewRow name="Imperial College London" tag="Reach" pct={78} tone="amber" />
                <PreviewRow name="UCL" tag="Match" pct={100} tone="sky" />
                <PreviewRow name="Nottingham" tag="Safety" pct={100} tone="emerald" />
              </div>
            </div>
          </motion.div>

          {/* Floating accent chip */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.5 },
              y: { delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -bottom-4 -left-4 hidden rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 shadow-xl sm:block"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Grade predictor
            </div>
            <div className="font-serif text-lg font-bold text-white">
              A*AA <span className="text-sky-400">on track</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative flex justify-center pb-8"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-sky-400"
          />
        </div>
      </motion.div>
    </section>
  );
}

function PreviewStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {icon} {label}
      </div>
      <div className="font-serif text-2xl font-bold text-white">{value}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
    </div>
  );
}

function PreviewRow({
  name,
  tag,
  pct,
  tone,
}: {
  name: string;
  tag: string;
  pct: number;
  tone: "amber" | "sky" | "emerald";
}) {
  const tones = {
    amber: "bg-amber-400",
    sky: "bg-sky-400",
    emerald: "bg-emerald-400",
  } as const;
  const tagTones = {
    amber: "text-amber-300",
    sky: "text-sky-300",
    emerald: "text-emerald-300",
  } as const;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-medium text-slate-200">{name}</span>
        <span className={`font-semibold ${tagTones[tone]}`}>{tag}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${tones[tone]}`}
        />
      </div>
    </div>
  );
}
