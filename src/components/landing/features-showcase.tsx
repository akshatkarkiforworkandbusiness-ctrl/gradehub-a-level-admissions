"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  LineChart,
  Globe,
  BookOpen,
  Building2,
  Search,
  BookmarkPlus,
  FileText,
  Award,
  Calendar,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
  accent: string;
  iconBg: string;
  span?: boolean;
}

const FEATURES: Feature[] = [
  {
    title: "UCAS Points Calculator",
    desc: "Add your A-Levels, AS-Levels and EPQ to get an exact 2026/2027 tariff total in real time.",
    href: "/ucas-calculator",
    icon: Calculator,
    accent: "group-hover:text-sky-500",
    iconBg: "bg-sky-500/10 text-sky-500",
    span: true,
  },
  {
    title: "Grade Predictor & UMS",
    desc: "Work out the exact UMS marks you still need to secure your target grades.",
    href: "/grade-predictor",
    icon: LineChart,
    accent: "group-hover:text-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Global GPA Converter",
    desc: "Convert A-Levels into US 4.0/5.0 GPA, Canadian %, German Bavarian scale and ATAR.",
    href: "/gpa-converter",
    icon: Globe,
    accent: "group-hover:text-indigo-500",
    iconBg: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Degree Subject Matcher",
    desc: "See which degrees your subject combination unlocks with the Informed Choices matrix.",
    href: "/subject-matcher",
    icon: BookOpen,
    accent: "group-hover:text-sky-500",
    iconBg: "bg-sky-500/10 text-sky-500",
  },
  {
    title: "Requirements Checker",
    desc: "Compare your projected grades against real entry requirements for top universities.",
    href: "/requirements-checker",
    icon: Building2,
    accent: "group-hover:text-rose-500",
    iconBg: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "University Draftlist",
    desc: "Shortlist targets into Reach, Match and Safety tiers and track your odds.",
    href: "/university-draftlist",
    icon: BookmarkPlus,
    accent: "group-hover:text-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    span: true,
  },
  {
    title: "Tariff Point Lookup",
    desc: "Search any qualification and grade to find its exact UCAS tariff value.",
    href: "/tariff-search",
    icon: Search,
    accent: "group-hover:text-indigo-500",
    iconBg: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Essay Structure Reviewer",
    desc: "Heuristic diagnostics for UCAS personal statements and US Common App essays.",
    href: "/essay-reviewer",
    icon: FileText,
    accent: "group-hover:text-amber-500",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Activity Advisor",
    desc: "Course-specific super-curricular ideas to strengthen your application.",
    href: "/extracurricular-guide",
    icon: Award,
    accent: "group-hover:text-rose-500",
    iconBg: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Action Plan & Calendar",
    desc: "A personalised timeline of deadlines, exams and admissions milestones.",
    href: "/action-plan",
    icon: Calendar,
    accent: "group-hover:text-sky-500",
    iconBg: "bg-sky-500/10 text-sky-500",
  },
  {
    title: "Results Day Wizard",
    desc: "A decision flowchart for Met, Exceeded or Missed offers — and Clearing.",
    href: "/results-day-guide",
    icon: Zap,
    accent: "group-hover:text-amber-500",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesShowcase() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 max-w-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
          Everything you need
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary text-balance sm:text-4xl">
          One toolkit, from first calculation to results day
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-text-secondary">
          Every tool works together and remembers your profile — so your grades,
          points and shortlist stay in sync across the whole platform.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.06 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={feature.span ? "lg:col-span-1" : ""}
            >
              <Link
                href={feature.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} />
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-500 dark:text-slate-600"
                  />
                </div>
                <h3
                  className={`mb-2 text-lg font-bold text-text-primary transition-colors ${feature.accent}`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
