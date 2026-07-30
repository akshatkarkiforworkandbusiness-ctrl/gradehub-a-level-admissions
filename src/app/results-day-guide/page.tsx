"use client";

import { useState } from "react";
import { Zap, CheckCircle2, AlertTriangle, HelpCircle, PhoneCall, RefreshCw, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type ResultsScenario = 'met' | 'exceeded' | 'missed';

export default function ResultsDayGuide() {
  const [scenario, setScenario] = useState<ResultsScenario>('met');

  return (
    <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Zap size={14} /> August Results Day Command Center
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">August Results Day & Clearing Wizard</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Strategic decision framework for A-Level students on results day. Whether you met, exceeded, or missed your firm offer, get instant actionable pathways.</p>
      </div>

      {/* Scenario Selection Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <button
          onClick={() => setScenario('met')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            scenario === 'met' 
              ? "bg-emerald-500/10 border-emerald-500 text-foreground shadow-md" 
              : "bg-card border-border hover:border-emerald-500/50 text-muted-foreground"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-3">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Scenario 1: Met Firm Offer</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Achieved or matched required entry grades (e.g. firm offer AAA, achieved AAA).</p>
        </button>

        <button
          onClick={() => setScenario('exceeded')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            scenario === 'exceeded' 
              ? "bg-blue-600/10 border-blue-600 text-foreground shadow-md" 
              : "bg-card border-border hover:border-blue-600/50 text-muted-foreground"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
            <Flame size={24} />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Scenario 2: Exceeded Offer</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Outperformed offer (e.g. firm offer AAB, achieved A*A*A).</p>
        </button>

        <button
          onClick={() => setScenario('missed')}
          className={`p-6 rounded-2xl border text-left transition-all ${
            scenario === 'missed' 
              ? "bg-amber-500/10 border-amber-500 text-foreground shadow-md" 
              : "bg-card border-border hover:border-amber-500/50 text-muted-foreground"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
            <AlertTriangle size={24} />
          </div>
          <h3 className="font-bold text-base text-foreground mb-1">Scenario 3: Missed Offer</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Missed firm or insurance entry grades (Clearing / Remarking / Retakes).</p>
        </button>
      </div>

      {/* Decision Strategy Content */}
      <div className="space-y-8">
        {scenario === 'met' && (
          <Card className="p-8 border-l-4 border-l-emerald-500 border-border shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-emerald-500" />
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">Congratulations! Firm Unconditional Confirmed</h2>
                <p className="text-sm text-muted-foreground">Your place has been automatically confirmed on UCAS Hub.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <h4 className="font-bold text-sm text-foreground mb-2">1. Check Accommodation & Financial Aid</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Confirm your housing deposit with your university accommodation portal and finalize your student loan application.</p>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <h4 className="font-bold text-sm text-foreground mb-2">2. Official Transcript Submission</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">For international / US colleges, request your examination board (Edexcel / CAIE / AQA) to send official certificates directly.</p>
              </div>
            </div>
          </Card>
        )}

        {scenario === 'exceeded' && (
          <Card className="p-8 border-l-4 border-l-blue-600 border-border shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Flame size={28} className="text-blue-600" />
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">Exceeded Grades: UCAS Clearing & Upgrade Strategy</h2>
                <p className="text-sm text-muted-foreground">You can hold your current firm place while exploring higher-ranked courses via UCAS Clearing.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border text-sm">
              <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                <h4 className="font-bold text-blue-600 mb-1">Step 1: Keep Your Current Firm Safe</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300">Do NOT decline your firm offer on UCAS Hub yet. You retain your firm place automatically while making phone inquiries to higher universities.</p>
              </div>

              <div className="p-4 bg-muted/40 rounded-xl border border-border">
                <h4 className="font-bold text-foreground mb-1">Step 2: Call Higher University Clearing Hotlines</h4>
                <p className="text-xs text-muted-foreground">Have your UCAS ID, A-Level grades, and GCSE breakdown ready. Ask if they have open vacancies for students with your exceeded grades.</p>
              </div>
            </div>
          </Card>
        )}

        {scenario === 'missed' && (
          <div className="space-y-6">
            <Card className="p-8 border-l-4 border-l-amber-500 border-border shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle size={28} className="text-amber-500" />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">Missed Offer Action Plan (Clearing & Options)</h2>
                  <p className="text-sm text-muted-foreground">Don't panic. Tens of thousands of students secure top university spots through Clearing every August.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                  <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-1.5">
                    <PhoneCall size={16} className="text-blue-600" /> 1. UCAS Clearing
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Search open Clearing courses matching your grades on UCAS & call university hotlines directly.</p>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                  <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-1.5">
                    <RefreshCw size={16} className="text-amber-500" /> 2. Grade Remarking
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">If you missed a grade boundary by 1-2 raw marks, request a Priority Review of Marking through your school.</p>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl border border-border">
                  <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-1.5">
                    <ArrowRight size={16} className="text-emerald-500" /> 3. Gap Year / Retakes
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Retake exams in autumn/summer and reapply with higher predicted grades for top universities.</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
