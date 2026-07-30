"use client";

import { useState } from "react";
import { FileText, AlertTriangle, CheckCircle2, Sparkles, AlertCircle, Info, RefreshCw, Award, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { analyzeEssay, EssayDiagnostic } from "@/lib/essay-analyzer";

const SAMPLE_UCAS = `Ever since I was young, I have had a passion for Mathematics and Physics. Reading 'The Elegant Universe' inspired me to investigate quantum mechanics deeper. In school, I spearheaded our physics Olympiad club and analyzed mathematical proofs. I am confident that my strong work ethic and enthusiasm make me a dedicated applicant for your university degree course.`;

const SAMPLE_COMMON_APP = `Growing up between two cultures taught me how to embrace ambiguity. When I engineered our robotics team's autonomous algorithm, we faced repeated system crashes during regional finals. Instead of giving up, I collaborated with our team to redesign the feedback loop, transforming our approach to fault-tolerant software.`;

export default function EssayReviewer() {
  const [essayType, setEssayType] = useState<'ucas' | 'commonapp'>('ucas');
  const [essayText, setEssayText] = useState(SAMPLE_UCAS);

  const diagnostic: EssayDiagnostic = analyzeEssay(essayText, essayType);
  const { jhuBenchmark } = diagnostic;

  const handleTypeChange = (type: 'ucas' | 'commonapp') => {
    setEssayType(type);
    if (type === 'ucas' && essayText === SAMPLE_COMMON_APP) {
      setEssayText(SAMPLE_UCAS);
    } else if (type === 'commonapp' && essayText === SAMPLE_UCAS) {
      setEssayText(SAMPLE_COMMON_APP);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award size={14} /> Johns Hopkins "Essays That Worked" AI Benchmark
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Essay & Personal Statement AI Reviewer</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Analyze your essay against official elite admissions benchmarks (Johns Hopkins "Essays That Worked", Harvard/MIT admissions, and UCAS exemplars).</p>
      </div>

      {/* Essay Type Selector */}
      <div className="mb-8 p-1.5 bg-muted rounded-xl border border-border flex gap-2 max-w-md">
        <button
          onClick={() => handleTypeChange('ucas')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all ${
            essayType === 'ucas' 
              ? "bg-slate-900 text-white shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🇬🇧 UCAS Statement (4,000 Chars / 47 Lines)
        </button>
        <button
          onClick={() => handleTypeChange('commonapp')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all ${
            essayType === 'commonapp' 
              ? "bg-slate-900 text-white shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🇺🇸 Common App (250 - 650 Words)
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Text Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border-border shadow-md">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                {essayType === 'ucas' ? 'UCAS Personal Statement Draft' : 'Common App Main Essay Draft'}
              </label>
              <button 
                onClick={() => setEssayText("")}
                className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={12} /> Clear Text
              </button>
            </div>

            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Paste your personal statement or essay here..."
              className="w-full min-h-[380px] p-4 rounded-xl border border-border bg-background text-sm leading-relaxed focus:ring-2 focus:ring-blue-600 focus:outline-none font-sans text-foreground"
            />

            {/* Live Counter Bar */}
            <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-4">
              <div className="flex items-center gap-4">
                <span>Words: <strong className="text-foreground font-semibold">{diagnostic.wordCount}</strong></span>
                <span>Characters: <strong className="text-foreground font-semibold">{diagnostic.charCount}</strong></span>
                {essayType === 'ucas' && <span>Lines: <strong className="text-foreground font-semibold">{diagnostic.lineCount}</strong></span>}
              </div>

              <div className={`font-semibold flex items-center gap-1.5 ${
                diagnostic.status === 'error' ? 'text-red-500' : (diagnostic.status === 'warning' ? 'text-amber-500' : 'text-emerald-500')
              }`}>
                {diagnostic.status === 'error' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                {diagnostic.limitMessage}
              </div>
            </div>
          </Card>

          {/* Johns Hopkins Exemplar Tip Banner */}
          <Card className="p-5 bg-blue-600/10 border border-blue-600/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-3">
            <BookOpen size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-600 block mb-1">Johns Hopkins "Essays That Worked" Rule:</strong>
              {jhuBenchmark.exemplarTip}
            </div>
          </Card>
        </div>

        {/* Right Column: Johns Hopkins Benchmark Panel */}
        <div className="space-y-6">
          {/* JHU Benchmark Score Card */}
          <Card className="p-6 border-border shadow-md">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-foreground flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600" /> JHU Benchmark Score
              </h3>
              <span className="text-xl font-bold font-serif text-blue-600">{jhuBenchmark.overallScore} / 100</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>1. Narrative Hook</span>
                  <span className="text-blue-600">{jhuBenchmark.hookScore} / 25</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{jhuBenchmark.hookFeedback}</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>2. Show, Don't Tell Impact</span>
                  <span className="text-blue-600">{jhuBenchmark.showTellScore} / 25</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{jhuBenchmark.showTellFeedback}</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>3. Intellectual & Reflection Depth</span>
                  <span className="text-blue-600">{jhuBenchmark.depthScore} / 25</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{jhuBenchmark.depthFeedback}</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>4. Conclusion Resonance</span>
                  <span className="text-blue-600">{jhuBenchmark.conclusionScore} / 25</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{jhuBenchmark.conclusionFeedback}</p>
              </div>
            </div>
          </Card>

          {/* Cliché Warning Card */}
          <Card className="p-6 border-border shadow-md">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" /> Overused Clichés Flagged
            </h3>
            {diagnostic.clicheWarnings.length > 0 ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {diagnostic.clicheWarnings.map((cliche, idx) => (
                    <span key={idx} className="text-xs bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                      "{cliche}"
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-emerald-600 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 size={14} /> Great job! No common overused clichés found.
              </div>
            )}
          </Card>

          {/* Recommendations */}
          <Card className="p-6 border-border shadow-md">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Line-by-Line Rewrite Tips</h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {diagnostic.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
