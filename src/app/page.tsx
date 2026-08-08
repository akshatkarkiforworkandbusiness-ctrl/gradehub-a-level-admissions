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
  BookOpen,
  GraduationCap,
  Target,
  CheckCircle2,
  ArrowUpRight
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
      icon: User,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20"
    },
    {
      title: "UCAS Points Calculator",
      desc: `Current total: ${totalPoints} tariff points across ${profile.entries?.length || 0} subjects.`,
      href: "/ucas-calculator",
      badge: "UCAS 2026/2027",
      icon: Calculator,
      color: "bg-blue-600",
      lightColor: "bg-blue-600/10 text-blue-600 border-blue-600/20"
    },
    {
      title: "Global GPA Converter",
      desc: "Convert A-Levels into US GPA (4.0/5.0), Canada %, Germany Bavarian Scale & ATAR.",
      href: "/gpa-converter",
      badge: "International",
      icon: Globe,
      color: "bg-purple-600",
      lightColor: "bg-purple-600/10 text-purple-600 border-purple-600/20"
    },
    {
      title: "Grade Predictor & UMS",
      desc: "Calculate required remaining UMS using official dual 90% A2 UMS rules.",
      href: "/grade-predictor",
      badge: "Modular UMS",
      icon: LineChart,
      color: "bg-emerald-600",
      lightColor: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20"
    },
    {
      title: "University Draftlist",
      desc: `${profile.draftlist?.length || 0} target universities shortlisted in your draftlist.`,
      href: "/university-draftlist",
      badge: "Shortlist",
      icon: BookmarkPlus,
      color: "bg-rose-600",
      lightColor: "bg-rose-600/10 text-rose-600 border-rose-600/20"
    },
    {
      title: "Essay Structure Reviewer",
      desc: "Diagnostic structure review for UCAS personal statements and Common App essays.",
      href: "/essay-reviewer",
      badge: "AI Rubric",
      icon: FileText,
      color: "bg-amber-600",
      lightColor: "bg-amber-600/10 text-amber-600 border-amber-600/20"
    },
    {
      title: "Activity Heuristic Advisor",
      desc: `Tailored super-curricular suggestions for ${profile.courseInterest} majors.`,
      href: "/extracurricular-guide",
      badge: "Course-Specific",
      icon: Award,
      color: "bg-pink-600",
      lightColor: "bg-pink-600/10 text-pink-600 border-pink-600/20"
    },
    {
      title: "Degree Subject Matcher",
      desc: "Russell Group Informed Choices subject requirement eligibility matrix.",
      href: "/subject-matcher",
      badge: "Eligibility",
      icon: BookOpen,
      color: "bg-cyan-600",
      lightColor: "bg-cyan-600/10 text-cyan-600 border-cyan-600/20"
    },
    {
      title: "Action Plan & Checklists",
      desc: "Subject revision tabs and university application tracker with deadlines.",
      href: "/action-plan",
      badge: "Planner",
      icon: Calendar,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20"
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">
      {/* Common App Style Hero Dashboard */}
      <div className="mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white shadow-2xl shadow-slate-900/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div className="relative p-8 md:p-10 space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
              <GraduationCap size={14} /> Student Dashboard
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-mono bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">{profile.level}</span>
              <span className="text-xs text-indigo-300 font-mono bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20">{profile.courseInterest}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Welcome back, {profile.studentName || "Scholar"}
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
                Your personalized hub for {profile.courseInterest} admissions. Track subjects, calculate global GPAs, and shortlist target universities.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link href="/action-plan" className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2">
                <Calendar size={16} /> Action Plan
              </Link>
              <Link href="/profile" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/20 flex items-center gap-2 backdrop-blur-sm">
                <User size={16} /> Edit Profile
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Enrolled Subjects</span>
              <strong className="text-2xl font-serif text-white">{profile.entries?.length || 0}</strong>
              <span className="text-xs text-slate-400 block">subjects tracked</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">UCAS Points</span>
              <strong className="text-2xl font-serif text-white">{totalPoints}</strong>
              <span className="text-xs text-slate-400 block">tariff points</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Universities</span>
              <strong className="text-2xl font-serif text-white">{profile.draftlist?.length || 0}</strong>
              <span className="text-xs text-slate-400 block">shortlisted</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Target Date</span>
              <strong className="text-lg font-serif text-white">{profile.examTargetDate ? new Date(profile.examTargetDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : "TBD"}</strong>
              <span className="text-xs text-slate-400 block">exam target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header - Common App Style */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">Your Admissions Toolkit</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 ml-5">
          Everything you need to navigate the university admissions process, from grade calculations to application tracking.
        </p>
      </div>

      {/* Tools Grid - Common App Card Style */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link 
              href={tool.href} 
              key={tool.title} 
              className="group relative flex flex-col p-6 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-600/5 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${tool.color} text-white flex items-center justify-center shadow-lg`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${tool.lightColor}`}>
                    {tool.badge}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>

              <h3 className="relative text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h3>
              <p className="relative text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Links Footer - Common App Style */}
      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Target size={20} className="text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quick Access</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/requirements-checker" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              Requirements Checker <ArrowRight size={12} />
            </Link>
            <Link href="/tariff-search" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              Tariff Directory <ArrowRight size={12} />
            </Link>
            <Link href="/results-day-guide" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              Results Day Guide <ArrowRight size={12} />
            </Link>
            <Link href="/about-us" className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              About Us <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
