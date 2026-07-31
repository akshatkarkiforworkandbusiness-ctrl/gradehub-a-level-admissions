"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  User, 
  Calendar, 
  Award, 
  FileText, 
  BookmarkPlus, 
  Globe, 
  Calculator, 
  LineChart, 
  Zap, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";
import { calculateTotalUcasPoints } from "@/lib/calculators";

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const totalPoints = calculateTotalUcasPoints(profile.entries || []);

  const TOOLS = [
    {
      title: "Student Admissions Profile",
      desc: `Configured for ${profile.level} studying ${profile.courseInterest}.`,
      href: "/profile",
      badge: profile.level,
      color: "bg-blue-600/10 text-blue-600 border-blue-600/20"
    },
    {
      title: "UCAS Points Calculator",
      desc: `Current total: ${totalPoints} tariff points across ${profile.entries?.length || 0} subjects.`,
      href: "/ucas-calculator",
      badge: "UCAS 2026/2027 Reference",
      color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20"
    },
    {
      title: "Global Grade & GPA Converter",
      desc: "Convert A-Levels into US GPA (4.0/5.0), Canada %, Germany Bavarian Scale & ATAR.",
      href: "/gpa-converter",
      badge: "International Estimates",
      color: "bg-purple-600/10 text-purple-600 border-purple-600/20"
    },
    {
      title: "University Draftlist Builder",
      desc: `${profile.draftlist?.length || 0} target universities shortlisted in your draftlist.`,
      href: "/university-draftlist",
      badge: "Shortlist Manager",
      color: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20"
    },
    {
      title: "Essay Structure Reviewer",
      desc: "Heuristic diagnostic review for UCAS statements and US Common App essays.",
      href: "/essay-reviewer",
      badge: "Heuristic Structure Rubric",
      color: "bg-amber-600/10 text-amber-600 border-amber-600/20"
    },
    {
      title: "Activity Heuristic Advisor",
      desc: `Tailored super-curricular suggestions for ${profile.courseInterest} majors.`,
      href: "/extracurricular-guide",
      badge: "Course-Specific Guide",
      color: "bg-rose-600/10 text-rose-600 border-rose-600/20"
    },
    {
      title: "Degree Subject Matcher",
      desc: "Russell Group Informed Choices subject requirement eligibility matrix.",
      href: "/subject-matcher",
      badge: "Informed Choices Matrix",
      color: "bg-blue-600/10 text-blue-600 border-blue-600/20"
    },
    {
      title: "A-Level Grade Predictor",
      desc: "Calculate required remaining UMS using official dual 90% A2 UMS rules.",
      href: "/grade-predictor",
      badge: "Modular UMS Math",
      color: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20"
    },
    {
      title: "August Results Day Wizard",
      desc: "Actionable decision flowchart for Met Offer, Exceeded Offer, or Clearing.",
      href: "/results-day-guide",
      badge: "Results Day Strategy",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20"
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Real Computed Student Status Dashboard Banner */}
      <div className="mb-12 p-8 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-600/30">
            <User size={14} /> Student Admissions Dashboard
          </div>
          <span className="text-xs text-slate-400 font-mono">Profile Status: Active</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-2 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Student Level & Course</span>
            <strong className="text-xl font-serif text-white">{profile.level} • {profile.courseInterest}</strong>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Saved UCAS Points</span>
            <strong className="text-xl font-serif text-blue-400">{totalPoints} Points ({profile.entries?.length || 0} Subjects)</strong>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Shortlisted Universities</span>
            <strong className="text-xl font-serif text-emerald-400">{profile.draftlist?.length || 0} Universities Saved</strong>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/profile" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors">
            Edit Student Profile
          </Link>
          <Link href="/action-plan" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-colors border border-slate-700">
            View Action Plan Calendar
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {TOOLS.map((tool) => (
          <Link 
            href={tool.href} 
            key={tool.title} 
            className="group flex flex-col p-6 bg-card border border-border shadow-sm hover:border-blue-600 hover:shadow-lg transition-all duration-300 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${tool.color}`}>
                {tool.badge}
              </span>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors">
              {tool.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
