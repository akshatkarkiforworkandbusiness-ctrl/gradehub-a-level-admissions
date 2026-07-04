import Link from "next/link";
import { Calculator, LineChart, ArrowRightLeft, Map, CheckCircle, BookOpen } from "lucide-react";

const TOOLS = [
  {
    title: "UCAS Points",
    desc: "Calculate your UCAS tariff points for UK university entry.",
    href: "/ucas-calculator",
    icon: "/ucas_calculator_icon_1782106713853.png",
  },
  {
    title: "Grade Predictor",
    desc: "Find out what UMS marks you need for your target grade.",
    href: "/grade-predictor",
    icon: "/grade_predictor_icon_1782106725337.png",
  },
  {
    title: "GPA Converter",
    desc: "Translate A-Levels into the standard US 4.0 GPA scale.",
    href: "/gpa-converter",
    icon: "/gpa_converter_icon_1782106741045.png",
    scale: 1.85,
  },
  {
    title: "Subject Matcher",
    desc: "See which university degree paths your subjects unlock.",
    href: "/subject-matcher",
    icon: "/subject_matcher_icon_1782106750207.png",
    scale: 1.85,
  },
  {
    title: "Requirements",
    desc: "Check which top universities you are eligible for globally.",
    href: "/requirements-checker",
    icon: "/requirements_checker_icon_v2_1782107340011.png",
  },
  {
    title: "Tariff Directory",
    desc: "Searchable database of all qualifications and points.",
    href: "/tariff-search",
    icon: "/tariff_directory_icon_1782106768063.png",
  }
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
      <div className="max-w-3xl mb-24">
        <div className="inline-flex items-center gap-3 px-1 py-1 rounded mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ink-red to-blue-600 text-white flex items-center justify-center shadow-lg shadow-ink-red/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <circle cx="12" cy="5" r="2" />
              <path d="M10.5 6.5L4 19" />
              <path d="M13.5 6.5L20 19" />
              <path d="M8.5 14h7" opacity="0.6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tight text-ink-navy leading-none flex items-baseline">After<span className="text-ink-red">A</span>Level<span className="text-ink-red/80 font-semibold ml-[1px]">.com</span></span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-text-secondary leading-none mt-1">Assessment Tools</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-8 text-text-primary leading-tight">
          Know exactly where your<br />grades can take you.
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl mb-12">
          A-Level conversions, predictions and university<br />matching, built for students who want a straight answer.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/ucas-calculator" className="bg-ink-red text-[#FAFAF6] rounded-md px-6 py-3 font-medium hover:brightness-110 transition-colors shadow-sm">
            Convert my grades
          </Link>
          <Link href="#tools" className="text-ink-navy font-medium hover:underline decoration-2 underline-offset-4">
            See how it works
          </Link>
        </div>
      </div>

      <div id="tools" className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-16 border-t border-border">
        {TOOLS.map((tool) => (
          <Link href={tool.href} key={tool.title} className="group flex flex-col p-6 bg-bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ink-navy">
            <div className="w-14 h-14 mb-4 rounded-xl overflow-hidden flex items-center justify-center group-hover:-translate-y-1 transition-transform shadow-sm">
              <img src={tool.icon} alt={tool.title} className="w-full h-full object-cover" style={{ transform: `scale(${tool.scale || 1.65})` }} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-ink-navy transition-colors">{tool.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <section className="mt-32 max-w-4xl mx-auto border-t border-border pt-16">
        <div className="prose prose-slate dark:prose-invert prose-p:text-text-secondary prose-headings:text-text-primary max-w-none">
          <h2 className="text-3xl font-serif mb-6">Your Ultimate Guide to A-Level Conversions, UCAS Points, and University Requirements</h2>
          <p>Navigating the transition from high school to university can be overwhelming, especially when trying to understand how your A-Level grades translate into UCAS tariff points or a US-style GPA. Whether you're a domestic student applying through UCAS or an international student exploring global opportunities, understanding your academic standing is the first step to securing a spot at your dream university. That’s where <strong>AfterALevel.com</strong> comes in.</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">What is the UCAS Points Calculator?</h3>
          <p>The UCAS (Universities and Colleges Admissions Service) tariff system is a way of standardizing qualifications so that UK universities can easily compare applicants. Not all universities use the tariff system—some prefer to ask for specific grades (like AAB)—but for those that do, knowing your UCAS points is crucial. Our highly accurate <strong>UCAS Points Calculator</strong> allows you to input your A-Level, AS-Level, and BTEC grades to instantly see your total points. For example, an A* at A-Level is worth 56 points, an A is 48 points, and a B is 40 points. Simply plug in your predicted or achieved grades, and the calculator does the rest.</p>

          <h3 className="text-xl font-bold mt-8 mb-4">A-Level to US GPA Converter</h3>
          <p>If you're considering applying to universities in the United States, you will quickly notice that they do not use the A-Level grading system. Instead, they use a Grade Point Average (GPA) out of 4.0. Translating A-Level grades to a 4.0 GPA can be confusing because the systems evaluate students differently. Our <strong>GPA Converter</strong> handles this translation using widely accepted international conversion standards. Generally, an A* or A is considered a 4.0, a B is a 3.0, and a C is a 2.0. Having an accurate GPA estimate is essential when applying through the Common App or submitting transcripts to US admissions boards.</p>

          <h3 className="text-xl font-bold mt-8 mb-4">Predicting Your Grades with UMS Marks</h3>
          <p>Are you worried about whether you'll hit that A* in your final exams? The <strong>Grade Predictor</strong> tool takes your current Uniform Mark Scale (UMS) scores or mock exam results and projects what you need in your remaining papers to achieve your target grade. This helps you focus your revision exactly where it counts, removing the guesswork from your exam strategy.</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">Discover Your Path with the Subject Matcher</h3>
          <p>Choosing the right A-Levels can dictate your future degree options. If you're unsure what you can study at university, our <strong>Subject Matcher</strong> analyzes your subject combination and suggests potential degree paths. For instance, if you study Mathematics and Physics, Engineering and Computer Science are highly recommended paths. If you take Biology and Chemistry, Medicine or Biomedical Sciences become accessible. This tool ensures you aren't closing doors to your preferred career.</p>

          <h3 className="text-xl font-bold mt-8 mb-4">Global University Requirements Checker</h3>
          <p>Top universities have strict entry requirements. Instead of scouring hundreds of individual university websites, our <strong>Requirements Checker</strong> aggregates the typical A-Level requirements for top universities globally. Whether you're aiming for Oxford, Cambridge, Ivy League schools in the US, or top institutions in Australia and Canada, you can instantly see if your grades make you a competitive applicant.</p>

          <p className="mt-8">At AfterALevel.com, we are committed to providing free, accurate, and lightning-fast assessment tools for students. By using our calculators, you can take control of your academic journey and make informed decisions about your future.</p>
        </div>
      </section>

      <section className="mt-24 max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-serif mb-8 text-text-primary text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group border border-border bg-bg-surface rounded-lg [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-medium text-text-primary">
              How accurate is the UCAS points calculator?
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </span>
            </summary>
            <p className="p-4 pt-0 text-text-secondary leading-relaxed">
              Our calculator uses the official UCAS tariff tables for the current academic year. It is 100% accurate for standard A-Level and AS-Level qualifications. However, always double-check with your target university, as some courses require specific grades rather than total tariff points.
            </p>
          </details>

          <details className="group border border-border bg-bg-surface rounded-lg [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-medium text-text-primary">
              How do US universities view A-Level grades?
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </span>
            </summary>
            <p className="p-4 pt-0 text-text-secondary leading-relaxed">
              US universities highly respect A-Levels because of their rigorous depth. Generally, an A or A* is considered equivalent to a 4.0 GPA. Furthermore, many US colleges offer college credit for A-Level exams passed with a C or higher, allowing you to skip introductory classes.
            </p>
          </details>

          <details className="group border border-border bg-bg-surface rounded-lg [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-medium text-text-primary">
              Can I calculate points for BTECs or T-Levels?
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </span>
            </summary>
            <p className="p-4 pt-0 text-text-secondary leading-relaxed">
              Yes! While our main tool focuses on A-Levels, you can look up BTECs, T-Levels, and the International Baccalaureate (IB) in our complete Tariff Directory to find their exact UCAS point equivalents.
            </p>
          </details>

          <details className="group border border-border bg-bg-surface rounded-lg [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-medium text-text-primary">
              What is the difference between AS and A2?
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </span>
            </summary>
            <p className="p-4 pt-0 text-text-secondary leading-relaxed">
              AS-Levels are typically taken in the first year of sixth form and represent half of a full A-Level. They are worth approximately 40% of the UCAS points of a full A-Level. A2 refers to the second year of study. Note that if you complete a full A-Level, you cannot count the AS-Level points for the same subject twice.
            </p>
          </details>
        </div>
      </section>

      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate is the UCAS points calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our calculator uses the official UCAS tariff tables for the current academic year. It is 100% accurate for standard A-Level and AS-Level qualifications."
                }
              },
              {
                "@type": "Question",
                "name": "How do US universities view A-Level grades?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "US universities highly respect A-Levels because of their rigorous depth. Generally, an A or A* is considered equivalent to a 4.0 GPA."
                }
              },
              {
                "@type": "Question",
                "name": "Can I calculate points for BTECs or T-Levels?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! While our main tool focuses on A-Levels, you can look up BTECs, T-Levels, and the International Baccalaureate (IB) in our complete Tariff Directory to find their exact UCAS point equivalents."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between AS and A2?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AS-Levels are typically taken in the first year of sixth form and represent half of a full A-Level. They are worth approximately 40% of the UCAS points of a full A-Level."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
