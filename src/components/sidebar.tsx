"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  User, 
  Calendar, 
  Zap, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";
import { ThemeToggle } from "./navbar";

export function Sidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setProfile(getStoredProfile());
    const handleStorage = () => setProfile(getStoredProfile());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [pathname]);

  const navGroups = [
    {
      groupName: "My Grades & Projections",
      badgeText: `${profile.entries?.length || 0} Subjects`,
      items: [
        { href: "/ucas-calculator", label: "UCAS Points Calculator", icon: Calculator },
        { href: "/grade-predictor", label: "Grade Predictor & UMS", icon: LineChart },
        { href: "/gpa-converter", label: "Global GPA Converter", icon: Globe }
      ]
    },
    {
      groupName: "Find Universities",
      badgeText: `${profile.draftlist?.length || 0} Saved`,
      items: [
        { href: "/subject-matcher", label: "Degree Subject Matcher", icon: BookOpen },
        { href: "/requirements-checker", label: "Requirements Checker", icon: Building2 },
        { href: "/tariff-search", label: "Tariff Point Lookup", icon: Search },
        { href: "/university-draftlist", label: "University Draftlist", icon: BookmarkPlus }
      ]
    },
    {
      groupName: "Application Guidance",
      badgeText: "AI Feedback",
      items: [
        { href: "/essay-reviewer", label: "Essay Structure Reviewer", icon: FileText },
        { href: "/extracurricular-guide", label: "Activity Heuristic Advisor", icon: Award }
      ]
    },
    {
      groupName: "Timeline & Strategy",
      badgeText: profile.level,
      items: [
        { href: "/profile", label: "Student Profile", icon: User },
        { href: "/action-plan", label: "Action Plan & Exam Calendar", icon: Calendar },
        { href: "/results-day-guide", label: "August Results Day Wizard", icon: Zap }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 h-14 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">G</div>
          <span className="font-serif font-bold text-lg text-slate-900 dark:text-white">GradeHub</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 text-slate-600 dark:text-slate-300">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-4 group border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-serif font-bold text-xl group-hover:opacity-95 transition-opacity shadow-md">
              G
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-slate-900 dark:text-white leading-none">GradeHub</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold text-indigo-600 dark:text-indigo-400 mt-1">A-Level Admissions</div>
            </div>
          </Link>

          {/* Navigation Groups */}
          <div className="space-y-6 flex-1">
            {navGroups.map((group) => (
              <div key={group.groupName}>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {group.groupName}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20">
                    {group.badgeText}
                  </span>
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <Icon size={15} className={isActive ? "text-white" : "text-slate-600 dark:text-slate-400"} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Profile Footer */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-semibold text-slate-900 dark:text-slate-200 truncate max-w-[120px]">{profile.studentName || "Scholar"}</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
