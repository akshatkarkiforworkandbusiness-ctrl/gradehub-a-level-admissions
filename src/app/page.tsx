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
  BookOpen
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
      desc: `Configured for ${profile.level} studying ${profile.courseInterest} with ${profile.entries?.length || 0} subjects enrolled.`,
      href: "/profile",
      badge: profile.level,
      color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20"
    },
    {
      title: "Action Plan & Subject Checklists",
      desc: "Subject revision tabs (Economics, Math, Physics) and university application tracker.",
      href: "/action-plan",
      badge: "Revision & App Tasks",
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
      desc: "Diagnostic structure review for UCAS personal statements and Common App essays.",
      href: "/essay-reviewer",
      badge: "Structure Rubric",
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
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Bright Vibrant Hero Dashboard */}
      <div className="mb-12 p-8 md:p-10 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-blue-500 text-white shadow-xl shadow-indigo-600/15 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={14} /> Student Admissions Dashboard
          </div>
          <span className="text-xs text-indigo-100 font-mono bg-white/10 px-2.5 py-1 rounded-full">{profile.level} Horizon</span>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            Welcome back, {profile.studentName || "Scholar"}!
          </h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Your personalized hub for {profile.courseInterest} admissions. Track subject revision checklists, calculate global GPAs, and shortlist target universities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-white/20">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs">
            <span className="text-xs text-indigo-100 uppercase tracking-wider block mb-1">Enrolled Subjects</span>
            <strong className="text-2xl font-serif text-white">{profile.entries?.length || 0} Subjects Tracked</strong>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs">
            <span className="text-xs text-indigo-100 uppercase tracking-wider block mb-1">Saved Tariff Points</span>
            <strong className="text-2xl font-serif text-white">{totalPoints} UCAS Points</strong>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs">
            <span className="text-xs text-indigo-100 uppercase tracking-wider block mb-1">Shortlisted Universities</span>
            <strong className="text-2xl font-serif text-white">{profile.draftlist?.length || 0} Target Universities</strong>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/action-plan" className="px-6 py-3 bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2">
            <Calendar size={16} /> Open Action Plan Checklists
          </Link>
          <Link href="/profile" className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all border border-white/30 flex items-center gap-2">
            <User size={16} /> Edit Profile & Enrolled Subjects
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <Link 
            href={tool.href} 
            key={tool.title} 
            className="group flex flex-col p-6 bg-card border border-border shadow-xs hover:border-indigo-600 hover:shadow-md transition-all duration-300 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${tool.color}`}>
                {tool.badge}
              </span>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 transition-colors">
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
