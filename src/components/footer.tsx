import Link from "next/link";
import { ThemeToggle } from "./navbar";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-bg-surface mt-auto pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-ink-red to-blue-600 text-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <circle cx="12" cy="5" r="2" />
                  <path d="M10.5 6.5L4 19" />
                  <path d="M13.5 6.5L20 19" />
                  <path d="M8.5 14h7" opacity="0.6" />
                </svg>
              </div>
              <span className="font-bold tracking-tight text-ink-navy text-lg leading-none">
                After<span className="text-ink-red">A</span>Level<span className="text-ink-red/80 font-semibold ml-[1px]">.com</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-6">
              The ultimate toolkit for A-Level students. Calculate UCAS points, predict grades, convert to US GPA, and explore university requirements globally.
            </p>
            <ThemeToggle />
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-4">Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/ucas-calculator" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">UCAS Points Calculator</Link></li>
              <li><Link href="/gpa-converter" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">GPA Converter</Link></li>
              <li><Link href="/grade-predictor" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Grade Predictor</Link></li>
              <li><Link href="/subject-matcher" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Subject Matcher</Link></li>
              <li><Link href="/requirements-checker" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">University Requirements</Link></li>
              <li><Link href="/tariff-search" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Tariff Directory</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-sm text-text-secondary hover:text-ink-navy transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {currentYear} AfterALevel.com. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary/70 text-center md:text-right max-w-md">
            Disclaimer: We are an independent educational tool. Our calculations provide estimates and are not affiliated with or endorsed by UCAS or any university.
          </p>
        </div>
      </div>
    </footer>
  );
}
