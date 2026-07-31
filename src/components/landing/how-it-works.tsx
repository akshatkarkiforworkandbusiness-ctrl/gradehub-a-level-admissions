"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UserPlus, Calculator, Building2, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Build your profile",
    desc: "Enter your subjects, predicted grades and the course you're aiming for. It's saved locally, no signup required.",
    href: "/profile",
  },
  {
    icon: Calculator,
    title: "Crunch the numbers",
    desc: "Instantly see your UCAS tariff, global GPA equivalents and the UMS marks you still need to hit target.",
    href: "/ucas-calculator",
  },
  {
    icon: Building2,
    title: "Match universities",
    desc: "Check real entry requirements and sort candidates into Reach, Match and Safety tiers in your draftlist.",
    href: "/university-draftlist",
  },
  {
    icon: Rocket,
    title: "Apply with confidence",
    desc: "Sharpen your personal statement, plan your timeline and prepare for every results-day scenario.",
    href: "/results-day-guide",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="border-y border-border bg-bg-surface">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            How it works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary text-balance sm:text-4xl">
            From confused to confident in four steps
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Progress line */}
          <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-sky-500"
            />
          </div>

          <div className="space-y-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    isEven ? "md:ml-auto md:flex-row" : "md:mr-auto md:flex-row-reverse md:text-right"
                  }`}
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-bg-page text-sky-500 shadow-sm">
                    <Icon size={22} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <Link href={step.href} className="group flex-1 rounded-xl p-1">
                    <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-sky-500">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {step.desc}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
