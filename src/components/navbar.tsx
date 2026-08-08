"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, BookmarkPlus, User, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-xs font-semibold"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-blue-400" />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/profile", label: "My Profile" },
    { href: "/action-plan", label: "Action Plan" },
    { href: "/ucas-calculator", label: "UCAS Points" },
    { href: "/gpa-converter", label: "Global GPA" },
    { href: "/grade-predictor", label: "Grade Predictor" },
    { href: "/university-draftlist", label: "Draftlist" },
    { href: "/essay-reviewer", label: "Essay Reviewer" },
    { href: "/extracurricular-guide", label: "AI Activities" },
    { href: "/results-day-guide", label: "Results Day" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 backdrop-blur-md bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="nbGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#4F46E5'}}/>
                  <stop offset="100%" style={{stopColor:'#2563EB'}}/>
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="23" fill="url(#nbGlobeGrad)"/>
              <circle cx="24" cy="24" r="16" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9"/>
              <ellipse cx="24" cy="24" rx="8" ry="16" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
              <ellipse cx="24" cy="24" rx="16" ry="8" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
              <g transform="translate(16, 14)">
                <polygon points="8,2 16,6 8,10 0,6" fill="white"/>
                <polygon points="8,0 11,2 8,4 5,2" fill="white" opacity="0.8"/>
                <line x1="14" y1="6" x2="18" y2="12" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="18" cy="13" r="1.5" fill="#F59E0B"/>
              </g>
              <polygon points="24,8 28,16 20,16" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-white leading-none">Grade<span className="text-blue-400">Hub</span></span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-400 leading-none mt-1">Global Admissions</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/profile"
            className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <User size={14} /> My Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
