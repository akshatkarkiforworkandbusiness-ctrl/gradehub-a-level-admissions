"use client";

import { useState, useEffect } from "react";
import { User, Sparkles, BookOpen, GraduationCap, Target, Calendar, CheckCircle2, Plus, Trash2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStoredProfile, saveStoredProfile, StudentProfile } from "@/lib/profile-store";
import { QualificationEntry, ExamStatus } from "@/lib/calculators";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";

const POPULAR_COURSES = [
  "Computer Science",
  "Medicine",
  "Engineering",
  "Law",
  "Economics",
  "Business & Management",
  "Psychology",
  "Architecture",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biological & Biomedical Sciences",
  "History",
  "Politics & International Relations",
  "Geography & Environmental Science",
  "English Literature",
  "Languages & Linguistics"
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [entries, setEntries] = useState<QualificationEntry[]>([]);

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    setEntries(prof.entries || []);
  }, []);

  const handleSave = () => {
    const updated = { ...profile, entries };
    saveStoredProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addSubject = (subjectName: string = "Economics") => {
    const newEntry: QualificationEntry = {
      id: Date.now().toString(),
      type: "A-Level",
      subject: subjectName,
      grade: "A",
      creditType: "Full Credit",
      examStatus: "Preparing"
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    saveStoredProfile({ ...profile, entries: updated });
  };

  const updateSubject = (id: string, field: keyof QualificationEntry, value: any) => {
    const updated = entries.map(e => e.id === id ? { ...e, [field]: value } : e);
    setEntries(updated);
    saveStoredProfile({ ...profile, entries: updated });
  };

  const removeSubject = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveStoredProfile({ ...profile, entries: updated });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <User size={14} /> Student Admissions Profile
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Student Profile & Subject Enrollment</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Manage your enrolled A-Level/AS subjects, exam status (Completed vs Preparing), course major, and target universities.</p>
      </div>

      <div className="space-y-6">
        {/* Academic Level */}
        <Card className="p-6 md:p-8 border-border shadow-sm space-y-6 bg-card">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
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
                  ? "bg-indigo-600/10 border-indigo-600 text-foreground shadow-sm" 
                  : "bg-card border-border hover:border-indigo-600/40 text-muted-foreground"
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
                  ? "bg-indigo-600/10 border-indigo-600 text-foreground shadow-sm" 
                  : "bg-card border-border hover:border-indigo-600/40 text-muted-foreground"
              }`}
            >
              <div className="font-bold text-base text-foreground mb-1">A2-Level (Year 13)</div>
              <p className="text-xs text-muted-foreground leading-relaxed">3-6 month horizon. Focus on UCAS/Common App essays, admissions tests, and final A2 exam prep.</p>
            </button>
          </div>
        </Card>

        {/* Enrolled Subjects Manager */}
        <Card className="p-6 md:p-8 border-border shadow-sm space-y-6 bg-card">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">2. Enrolled Subjects & Exam Status</h3>
                <p className="text-xs text-muted-foreground">Add all your subjects (3, 4, 5+) and mark whether exams are Completed or Preparing.</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-indigo-600/10 text-indigo-600 rounded-full border border-indigo-600/20">
              {entries.length} Subjects Enrolled
            </span>
          </div>

          <div className="space-y-4">
            <div className="max-w-md">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Search & Add Subject</label>
              <SubjectSearchCombobox onSelectSubject={(sub) => addSubject(sub)} />
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              {entries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-xl border border-border bg-background flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0"></span>
                    <div>
                      <strong className="text-sm text-foreground block">{entry.subject}</strong>
                      <span className="text-[11px] text-muted-foreground">{entry.type} ({entry.creditType || 'Full Credit'})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {/* Exam Status Toggle */}
                    <div className="w-36">
                      <Select value={entry.examStatus || 'Preparing'} onChange={e => updateSubject(entry.id, 'examStatus', e.target.value)}>
                        <option value="Preparing">⏳ Exam Preparing</option>
                        <option value="Completed">✓ Exam Completed</option>
                      </Select>
                    </div>

                    {/* Grade Target */}
                    <div className="w-24">
                      <Select value={entry.grade} onChange={e => updateSubject(entry.id, 'grade', e.target.value)}>
                        {["A*", "A", "B", "C", "D", "E", "U"].map(g => <option key={g} value={g}>{g}</option>)}
                      </Select>
                    </div>

                    <button onClick={() => removeSubject(entry.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Course Interest */}
        <Card className="p-6 md:p-8 border-border shadow-sm space-y-6 bg-card">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Target size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">3. Intended Major & Target Exam Date</h3>
              <p className="text-xs text-muted-foreground">Generates tailored super-curricular suggestions and Action Plan deadlines.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Intended Degree Course Major</label>
              <Select 
                value={profile.courseInterest} 
                onChange={e => setProfile({ ...profile, courseInterest: e.target.value })}
                className="font-semibold text-indigo-600"
              >
                {POPULAR_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>

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
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles size={18} /> Save Student Profile & Enrolled Subjects
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
