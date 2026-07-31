"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowRight, Info, CheckCircle2, BookmarkPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { 
  QualificationEntry, 
  calculateTotalUcasPoints, 
  getExactEquivalentOffer, 
  QualificationType,
  detectSubjectCredit,
  getCreditWeight
} from "@/lib/calculators";
import { getStoredProfile, saveStoredProfile, StudentProfile } from "@/lib/profile-store";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";
import Link from "next/link";

export default function UcasCalculator() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [entries, setEntries] = useState<QualificationEntry[]>([]);

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    setEntries(prof.entries || []);
  }, []);

  const saveEntriesToProfile = (newEntries: QualificationEntry[]) => {
    setEntries(newEntries);
    saveStoredProfile({ ...profile, entries: newEntries });
  };

  const addEntry = (subjectQuery: string) => {
    const { creditType, detectedType, cleanSubject } = detectSubjectCredit(subjectQuery, 'A-Level');
    const newEntry: QualificationEntry = {
      id: Date.now().toString(),
      type: detectedType,
      subject: cleanSubject || "New Subject",
      grade: detectedType === 'AS-Level' ? 'a' : 'A',
      creditType
    };
    saveEntriesToProfile([...entries, newEntry]);
  };

  const updateEntry = (id: string, field: keyof QualificationEntry, value: any) => {
    const updated = entries.map(e => e.id === id ? { ...e, [field]: value } : e);
    saveEntriesToProfile(updated);
  };

  const removeEntry = (id: string) => {
    saveEntriesToProfile(entries.filter(e => e.id !== id));
  };

  const totalPoints = calculateTotalUcasPoints(entries);
  const aLevelCount = entries.filter(e => e.type === 'A-Level').length || 3;
  const equivalentOffer = getExactEquivalentOffer(totalPoints, aLevelCount);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          UCAS 2026/2027 Tariff Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">UCAS Points Calculator</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Calculate total UCAS tariff points for A-Levels, AS-Levels, EPQ, IB, BTECs, and T-Levels with automatic credit weighting.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Add Qualifications */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 border-border shadow-md space-y-6">
            <h3 className="font-bold text-base text-foreground border-b border-border pb-3">Search & Add Qualification</h3>
            
            <SubjectSearchCombobox onSelectSubject={(subject) => addEntry(subject)} />

            <div className="space-y-4 pt-4 border-t border-border">
              {entries.map((entry, index) => (
                <div key={entry.id} className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{entry.subject}</span>
                    <button onClick={() => removeEntry(entry.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Qualification Type</label>
                      <Select value={entry.type} onChange={e => updateEntry(entry.id, "type", e.target.value)}>
                        <option value="A-Level">A-Level (Full Credit)</option>
                        <option value="AS-Level">AS-Level (Half Credit)</option>
                        <option value="EPQ">EPQ (Half Credit)</option>
                        <option value="IB-HL">IB Higher Level</option>
                        <option value="IB-SL">IB Standard Level</option>
                        <option value="IB-Tok-EE">IB ToK / EE</option>
                        <option value="BTEC-Ext-Dip">BTEC Ext Diploma</option>
                        <option value="BTEC-Dip">BTEC Diploma</option>
                        <option value="BTEC-Ext-Cert">BTEC Ext Certificate</option>
                        <option value="T-Level">T-Level</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Grade Achieved</label>
                      <Select value={entry.grade} onChange={e => updateEntry(entry.id, "grade", e.target.value)}>
                        {entry.type === 'AS-Level' ? (
                          ["a", "b", "c", "d", "e", "u"].map(g => <option key={g} value={g}>{g}</option>)
                        ) : entry.type === 'T-Level' ? (
                          ["Distinction*", "Distinction", "Merit", "Pass (C+)", "Pass (D/E)"].map(g => <option key={g} value={g}>{g}</option>)
                        ) : (
                          ["A*", "A", "B", "C", "D", "E", "U"].map(g => <option key={g} value={g}>{g}</option>)
                        )}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Credit Weight</label>
                      <Select value={entry.creditType || 'Full Credit'} onChange={e => updateEntry(entry.id, "creditType", e.target.value)}>
                        <option value="Full Credit">Full Credit (1.0)</option>
                        <option value="Half Credit">Half Credit (0.5)</option>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Total UCAS Points Display */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md bg-slate-900 text-white">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">Total UCAS Tariff Points</div>
            <div className="text-6xl font-serif font-bold mb-3">{totalPoints} <span className="text-lg font-sans font-normal opacity-80">Points</span></div>
            
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-1">
              <div>Equivalent Grade Offer: <strong className="text-white">{equivalentOffer}</strong></div>
              <div>Subject Count Evaluated: <strong className="text-white">{aLevelCount} A-Levels</strong></div>
            </div>
          </Card>

          <Card className="p-6 border-border shadow-md space-y-3">
            <h4 className="font-bold text-sm text-foreground">Next Admissions Steps:</h4>
            <div className="space-y-2 text-xs">
              <Link href="/gpa-converter" className="flex items-center justify-between p-2.5 rounded-lg bg-muted hover:bg-blue-600/10 hover:text-blue-600 transition-colors">
                Convert to US / International GPA <ArrowRight size={14} />
              </Link>
              <Link href="/university-draftlist" className="flex items-center justify-between p-2.5 rounded-lg bg-muted hover:bg-blue-600/10 hover:text-blue-600 transition-colors">
                Shortlist Target Universities <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
