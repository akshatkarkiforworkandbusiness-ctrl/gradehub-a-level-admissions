"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 12, suffix: "+", label: "Admissions tools" },
  { value: 168, label: "Max UCAS tariff points" },
  { value: 5, label: "Global grading systems" },
  { value: 0, prefix: "£", label: "Cost — free forever" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-border bg-bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <div className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
              <AnimatedNumber {...stat} />
            </div>
            <div className="mt-1 text-xs font-medium text-text-secondary sm:text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
