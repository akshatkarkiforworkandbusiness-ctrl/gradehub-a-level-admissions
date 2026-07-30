"use client";

import { useState, useEffect } from "react";
import { User, Sparkles, BookOpen, GraduationCap, Target, Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStoredProfile, saveStoredProfile, StudentProfile } from "@/lib/profile-store";

const POPULAR_COURSES = [
  "Computer Science",
  "Medicine",
  "Engineering",
  "Law",
  "Economics",
  "Business & Finance",
  "Psychology",
  "Architecture",
  "Biological & Biomedical Sciences",
  "Mathematics & Statistics"
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const handleSave = () => {
    saveStoredProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <User size={14} /> Student Admissions Profile
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Student Profile & Goal Setup</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Configure your student level (AS vs. A2), course interest, and target universities to personalize your AI activity advisor and exam action plan.</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 md:p-8 border-border shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">1. Academic Level & Stage</h3>
              <p className="text-xs text-muted-foreground">Select your current stage to tailor your application timeline and strategy.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setProfile({ ...profile, level: 'AS-Level' })}
              className={`p-5 rounded-2xl border text-left transition-all ${
                profile.level === 'AS-Level' 
                  ? "bg-blue-600/10 border-blue-600 text-foreground shadow-sm" 
                  : "bg-card border-border hover:border-blue-600/40 text-muted-foreground"
              }`}
            >
              <div className="font-bold text-base text-foreground mb-1">AS-Level (Year 12)</div>
              <p className="text-xs text-muted-foreground leading-relaxed">12-18 month horizon. Focus on building super-curriculars, summer research, and preparing AS exams.</p>
            </button>

            <button
              type="button"
              onClick={() => setProfile({ ...profile, level: 'A2-Level' })}
              className={`p-5 rounded-2xl border text-left transition-all ${
                profile.level === 'A2-Level' 
                  ? "bg-blue-600/10 border-blue-600 text-foreground shadow-sm" 
                  : "bg-card border-border hover:border-blue-600/40 text-muted-foreground"
              }`}
            >
              <div className="font-bold text-base text-foreground mb-1">A2-Level (Year 13)</div>
              <p className="text-xs text-muted-foreground leading-relaxed">3-6 month horizon. Focus on UCAS/Common App essays, admissions tests, and final A2 exam prep.</p>
            </button>
          </div>
        </Card>

        <Card className="p-6 md:p-8 border-border shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <BookOpen size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">2. Course Interest & Career Field</h3>
              <p className="text-xs text-muted-foreground">Used by the AI Activity Advisor to generate tailored super-curricular recommendations.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Intended Degree Course</label>
              <Select 
                value={profile.courseInterest} 
                onChange={e => setProfile({ ...profile, courseInterest: e.target.value })}
                className="max-w-md font-semibold text-blue-600"
              >
                {POPULAR_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 border-border shadow-md space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Calendar size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">3. Target Exam & Application Deadline</h3>
              <p className="text-xs text-muted-foreground">Sets live countdown timers in your Action Plan Calendar.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Target Exam Date</label>
              <Input 
                type="date" 
                value={profile.examTargetDate || "2026-05-15"} 
                onChange={e => setProfile({ ...profile, examTargetDate: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles size={18} /> Save Student Profile
          </button>
          {savedSuccess && (
            <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 size={16} /> Profile Saved Successfully!
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
