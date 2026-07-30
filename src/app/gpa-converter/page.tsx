"use client";

import { useState } from "react";
import { Plus, X, ArrowRight, Info, Globe, CheckCircle2, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { 
  QualificationEntry, 
  calculateAverageGpa,
  calculateCanadaPercentage,
  calculateGermanBavarianGrade,
  calculateEstimatedAtar,
  calculateHkSgPoints,
  getCreditLabel,
  getCreditWeight,
  GPA_SCALES,
  A_LEVEL_POINTS,
  AS_LEVEL_POINTS
} from "@/lib/calculators";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type DestinationCountry = 'US' | 'Canada' | 'Germany' | 'Australia' | 'HKSG';
type ScaleMode = 'unweighted' | 'weighted' | 'plusMinus';

export default function GpaConverter() {
  const [activeCountry, setActiveCountry] = useState<DestinationCountry>('US');
  const [scaleMode, setScaleMode] = useState<ScaleMode>('unweighted');
  
  const [entries, setEntries] = useState<QualificationEntry[]>([
    { id: "1", type: "A-Level", subject: "Mathematics", grade: "A*", creditType: "Full Credit" },
    { id: "2", type: "A-Level", subject: "Physics", grade: "A", creditType: "Full Credit" },
    { id: "3", type: "A-Level", subject: "Chemistry", grade: "B", creditType: "Full Credit" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), type: "A-Level", subject: "", grade: "A", creditType: "Full Credit" }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, updates: Partial<QualificationEntry>) => {
    setEntries(entries.map((e) => e.id === id ? { ...e, ...updates } : e));
  };

  const usGpa = calculateAverageGpa(entries, scaleMode);
  const canadaPct = calculateCanadaPercentage(entries);
  const germanGrade = calculateGermanBavarianGrade(entries);
  const australiaAtar = calculateEstimatedAtar(entries);
  const hkSgPts = calculateHkSgPoints(entries);

  const activeScale = GPA_SCALES[scaleMode];

  return (
    <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header Styling */}
      <div className="mb-8 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Globe size={14} /> Global Admissions Portal
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-3 text-slate-900 dark:text-slate-100">Global Grade & GPA Converter</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Convert your A-Level & AS-Level grades into official admission metrics for the US, Canada, Germany & Europe, Australia, Hong Kong, and Singapore.</p>
      </div>

      {/* Target Country Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCountry('US')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
            activeCountry === 'US' 
              ? "bg-slate-900 text-white border-slate-900 shadow-md" 
              : "bg-card text-slate-600 hover:text-slate-900 border-border"
          }`}
        >
          🇺🇸 United States (GPA)
        </button>
        <button
          onClick={() => setActiveCountry('Canada')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
            activeCountry === 'Canada' 
              ? "bg-slate-900 text-white border-slate-900 shadow-md" 
              : "bg-card text-slate-600 hover:text-slate-900 border-border"
          }`}
        >
          🇨🇦 Canada (%)
        </button>
        <button
          onClick={() => setActiveCountry('Germany')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
            activeCountry === 'Germany' 
              ? "bg-slate-900 text-white border-slate-900 shadow-md" 
              : "bg-card text-slate-600 hover:text-slate-900 border-border"
          }`}
        >
          🇩🇪 Germany / Europe (1.0-4.0)
        </button>
        <button
          onClick={() => setActiveCountry('Australia')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
            activeCountry === 'Australia' 
              ? "bg-slate-900 text-white border-slate-900 shadow-md" 
              : "bg-card text-slate-600 hover:text-slate-900 border-border"
          }`}
        >
          🇦🇺 Australia (ATAR)
        </button>
        <button
          onClick={() => setActiveCountry('HKSG')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
            activeCountry === 'HKSG' 
              ? "bg-slate-900 text-white border-slate-900 shadow-md" 
              : "bg-card text-slate-600 hover:text-slate-900 border-border"
          }`}
        >
          🇭🇰🇸🇬 Hong Kong / Singapore
        </button>
      </div>

      {activeCountry === 'US' && (
        <div className="mb-8 p-1.5 bg-muted rounded-xl border border-border flex flex-wrap gap-2 max-w-2xl">
          {(Object.keys(GPA_SCALES) as ScaleMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setScaleMode(mode)}
              className={`flex-1 min-w-[160px] py-2.5 px-4 text-xs font-semibold rounded-lg transition-all ${
                scaleMode === mode 
                  ? "bg-background text-foreground shadow-sm border border-border" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {GPA_SCALES[mode].name}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Subject Inputs Column */}
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence>
            {entries.map((entry) => {
              const creditLabel = getCreditLabel(entry);
              const creditWeight = getCreditWeight(entry);
              const isHalf = creditLabel === "Half Credit";
              const gradeList = isHalf ? Object.keys(AS_LEVEL_POINTS) : Object.keys(A_LEVEL_POINTS);
              const pointValue = (activeScale.values as Record<string, number>)[entry.grade] ?? 0;

              return (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-wrap sm:flex-nowrap items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm transition-all hover:border-blue-600/40 hover:shadow-md"
                >
                  <div className="w-full sm:flex-1 min-w-[200px]">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Search Subject</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        creditLabel === "Full Credit" ? "bg-blue-600/10 text-blue-600" : "bg-amber-500/10 text-amber-600"
                      }`}>
                        {creditLabel} ({creditWeight} Credit)
                      </span>
                    </label>
                    <SubjectSearchCombobox
                      value={entry.subject}
                      type={entry.type}
                      creditType={entry.creditType || creditLabel}
                      onChange={(subj, detectedType, detectedCredit) => {
                        const newIsHalf = detectedCredit === "Half Credit";
                        const defaultGrade = newIsHalf ? "a" : "A";
                        updateEntry(entry.id, {
                          subject: subj,
                          type: detectedType || entry.type,
                          creditType: detectedCredit || entry.creditType,
                          grade: defaultGrade
                        });
                      }}
                      onCreditToggle={(newCredit) => {
                        const newIsHalf = newCredit === "Half Credit";
                        const newType = newIsHalf ? "AS-Level" : "A-Level";
                        const newGrade = newIsHalf ? "a" : "A";
                        updateEntry(entry.id, {
                          creditType: newCredit,
                          type: newType,
                          grade: newGrade
                        });
                      }}
                    />
                  </div>

                  <div className="w-24 shrink-0">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Grade</label>
                    <Select 
                      value={entry.grade} 
                      onChange={(e) => updateEntry(entry.id, { grade: e.target.value })} 
                      className="font-semibold text-blue-600"
                    >
                      {gradeList.map(g => <option key={g} value={g}>{g}</option>)}
                    </Select>
                  </div>

                  {activeCountry === 'US' && (
                    <div className="w-20 text-right shrink-0">
                      <label className="block text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Pts</label>
                      <span className="text-sm font-bold text-foreground">
                        {(pointValue * creditWeight).toFixed(1)}
                      </span>
                    </div>
                  )}

                  <button 
                    onClick={() => removeEntry(entry.id)}
                    className="shrink-0 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-5 sm:mt-0"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button 
            onClick={addEntry}
            className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/5 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Subject Qualification
          </button>
        </div>

        {/* Output Conversion Card (Common App Portal Styling) */}
        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden border-border shadow-xl">
              <div className="bg-slate-900 text-white p-6 md:p-8">
                <div className="opacity-80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Building2 size={16} className="text-blue-400" />
                  {activeCountry === 'US' && "Converted US GPA"}
                  {activeCountry === 'Canada' && "Canadian Average %"}
                  {activeCountry === 'Germany' && "German Bavarian Grade"}
                  {activeCountry === 'Australia' && "Estimated ATAR Percentile"}
                  {activeCountry === 'HKSG' && "HKU / NUS Admission Points"}
                </div>
                
                <div className="text-6xl font-serif font-bold mb-3 text-white">
                  {activeCountry === 'US' && (usGpa !== null ? usGpa.toFixed(2) : "0.00")}
                  {activeCountry === 'Canada' && (canadaPct !== null ? `${canadaPct}%` : "0%")}
                  {activeCountry === 'Germany' && (germanGrade !== null ? germanGrade.toFixed(2) : "1.00")}
                  {activeCountry === 'Australia' && australiaAtar.atar}
                  {activeCountry === 'HKSG' && `${hkSgPts} pts`}
                </div>

                <div className="opacity-80 text-xs leading-relaxed">
                  {activeCountry === 'US' && activeScale.desc}
                  {activeCountry === 'Canada' && "Used by U of Toronto, UBC, McGill & Waterloo."}
                  {activeCountry === 'Germany' && "Bavarian Formula scale (1.0 Best to 4.0 Passing) for TUM, LMU & EU."}
                  {activeCountry === 'Australia' && australiaAtar.band}
                  {activeCountry === 'HKSG' && "Based on 6-5-4-3-2-1 scale for HKU, HKUST, NUS & NTU."}
                </div>
              </div>

              <div className="p-6 space-y-4 bg-card">
                <div className="flex gap-2 text-xs text-muted-foreground leading-relaxed bg-muted p-3 rounded-lg border border-border">
                  <Info size={16} className="shrink-0 text-blue-600 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Official Metric:</strong> Evaluated according to official international admissions standards. Full Credit subjects carry weight 1.0; Half Credit carries weight 0.5.
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <h3 className="font-semibold text-sm text-foreground">Next Steps</h3>
                  <Link href="/university-draftlist" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-blue-600 group transition-colors bg-background">
                    <div>
                      <div className="font-semibold text-sm text-foreground">Build University Draftlist</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Categorize your targets into Reach, Match & Safety.</div>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
