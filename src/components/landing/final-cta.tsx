"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center text-white sm:px-12"
      >
        {/* Grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 100%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[100px]"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-5xl">
            Your offer starts with the right numbers
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-slate-300">
            Join students planning smarter applications. Free, private and no
            account required — start in seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/profile"
              className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-[0.98]"
            >
              Get started free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ucas-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]"
            >
              <Calculator size={16} /> Try the calculator
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
