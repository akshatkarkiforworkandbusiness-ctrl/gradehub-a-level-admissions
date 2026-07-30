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
  Sparkles
} from "lucide-react";

const TOOLS = [
  {
    title: "Student Admissions Profile",
    desc: "Set AS-Level vs A2-Level status, intended course major & target universities.",
    href: "/profile",
    badge: "AS & A2 Level Onboarding",
    color: "bg-blue-600/10 text-blue-600 border-blue-600/20"
  },
  {
    title: "AI Activity Evaluator & Recommender",
    desc: "Get AI strength scores (0-100), improvement tips & course-tailored activity suggestions.",
    href: "/extracurricular-guide",
    badge: "AI Strength Score & Suggestions",
    color: "bg-purple-600/10 text-purple-600 border-purple-600/20"
  },
  {
    title: "Johns Hopkins Essay Reviewer",
    desc: "AI benchmark review modeled on Johns Hopkins 'Essays That Worked' & UCAS exemplars.",
    href: "/essay-reviewer",
    badge: "Johns Hopkins AI Benchmark",
    color: "bg-amber-600/10 text-amber-600 border-amber-600/20"
  },
  {
    title: "Admissions & Exam Action Plan",
    desc: "Stage-aware task checklist (AS vs A2), target exam scheduler & live countdown timers.",
    href: "/action-plan",
    badge: "Interactive Exam Calendar",
    color: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20"
  },
  {
    title: "Global Grade & GPA Converter",
    desc: "Convert A-Levels into US GPA (4.0/5.0), Canada %, Germany Bavarian Scale & Australia ATAR.",
    href: "/gpa-converter",
    badge: "US, Canada, Germany, ATAR",
    color: "bg-indigo-600/10 text-indigo-600 border-indigo-600/20"
  },
  {
    title: "University Draftlist Builder",
    desc: "Build your college shortlist with automatic Reach, Match, and Safety categorizations.",
    href: "/university-draftlist",
    badge: "Common App Portal Format",
    color: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20"
  },
  {
    title: "UCAS Tariff Points",
    desc: "Calculate official UCAS points for A-Levels, AS, EPQ, IB & BTECs.",
    href: "/ucas-calculator",
    badge: "Official 2026/2027 Tariff",
    color: "bg-blue-600/10 text-blue-600 border-blue-600/20"
  },
  {
    title: "A-Level Grade Predictor",
    desc: "Calculate required remaining UMS using official dual A2 90% rules for A*.",
    href: "/grade-predictor",
    badge: "Official Edexcel & CAIE UMS",
    color: "bg-rose-600/10 text-rose-600 border-rose-600/20"
  },
  {
    title: "August Results Day Wizard",
    desc: "Actionable decision flowchart for Met Offer, Exceeded Offer, or Clearing.",
    href: "/results-day-guide",
    badge: "Clearing & Results Day Strategy",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  }
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-16 pb-32">
      {/* Hero Section */}
      <div className="max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-600/20">
          <Sparkles size={14} /> The Ultimate A-Level Admissions & AI Guidance Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] mb-6">
          Complete help for your A-Level grades, essays & college applications.
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mb-8">
          Personalized student onboarding (AS vs A2 level), Johns Hopkins 'Essays That Worked' AI reviewer, course-based activity advisor, and exam action planner.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/profile" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3.5 font-semibold text-sm transition-all shadow-md flex items-center gap-2">
            <User size={18} /> Setup My Profile
          </Link>
          <Link href="/action-plan" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3.5 font-semibold text-sm transition-all shadow-md flex items-center gap-2">
            <Calendar size={18} /> View Action Plan
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 border-t border-border">
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
