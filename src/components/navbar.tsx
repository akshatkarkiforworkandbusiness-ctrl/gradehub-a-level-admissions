"use client"

import * as React from "react"
import { Moon, Sun, Calculator } from "lucide-react"
import { useTheme } from "next-themes"
import Link from 'next/link';

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  // Ensure hydration match
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg border border-border bg-bg-surface"></div>
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-lg border border-border bg-bg-surface text-ink-navy hover:bg-border/50 transition-colors flex items-center justify-center w-9 h-9"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 w-full border-b border-border bg-bg-page/80 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ink-red to-blue-600 text-white flex items-center justify-center shadow-md shadow-ink-red/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="5" r="2" />
              <path d="M10.5 6.5L4 19" />
              <path d="M13.5 6.5L20 19" />
              <path d="M8.5 14h7" opacity="0.6" />
            </svg>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-bold text-xl tracking-tight text-ink-navy leading-none mt-1 flex items-baseline">After<span className="text-ink-red">A</span>Level<span className="text-ink-red/80 font-semibold ml-[1px]">.com</span></span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-secondary leading-none mt-[2px]">Assessment Tools</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <Link href="/ucas-calculator" className="hover:text-text-primary transition-colors">UCAS Points</Link>
          <Link href="/gpa-converter" className="hover:text-text-primary transition-colors">GPA Converter</Link>
          <Link href="/grade-predictor" className="hover:text-text-primary transition-colors">Grade Predictor</Link>
          <Link href="/subject-matcher" className="hover:text-text-primary transition-colors">Subject Matcher</Link>
          <Link href="/requirements-checker" className="hover:text-text-primary transition-colors">Requirements</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
