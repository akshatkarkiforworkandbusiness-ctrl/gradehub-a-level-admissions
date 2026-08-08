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
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="ftGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#4F46E5'}}/>
                      <stop offset="100%" style={{stopColor:'#2563EB'}}/>
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="23" fill="url(#ftGlobeGrad)"/>
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
              <span className="font-bold tracking-tight text-text-primary text-lg leading-none font-serif">
                Grade<span className="text-indigo-600">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-6">
              The ultimate global admissions toolkit for A-Level students. Calculate UCAS points, predict grades, convert to US GPA, and explore university requirements worldwide.
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
            &copy; {currentYear} GradeHub. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary/70 text-center md:text-right max-w-md">
            Disclaimer: We are an independent educational tool. Our calculations provide estimates and are not affiliated with or endorsed by UCAS or any university.
          </p>
        </div>
      </div>
    </footer>
  );
}
