"use client";

import { useState } from "react";
import { Plus, X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { 
  QualificationType, 
  QualificationEntry, 
  calculateTotalUcasPoints,
  getExactEquivalentOffer,
  getCreditLabel,
  getCreditWeight,
  A_LEVEL_POINTS,
  AS_LEVEL_POINTS,
  EPQ_POINTS,
  IB_HL_POINTS,
  IB_SL_POINTS,
  IB_TOK_EE_POINTS,
  BTEC_EXT_POINTS,
  BTEC_DIP_POINTS,
  BTEC_EXT_CERT_POINTS,
  T_LEVEL_POINTS
} from "@/lib/calculators";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const QUAL_OPTIONS: Record<QualificationType, string[]> = {
  "A-Level": Object.keys(A_LEVEL_POINTS),
  "AS-Level": Object.keys(AS_LEVEL_POINTS),
  "EPQ": Object.keys(EPQ_POINTS),
  "IB-HL": Object.keys(IB_HL_POINTS),
  "IB-SL": Object.keys(IB_SL_POINTS),
  "IB-Tok-EE": Object.keys(IB_TOK_EE_POINTS),
  "BTEC-Ext-Dip": Object.keys(BTEC_EXT_POINTS),
  "BTEC-Dip": Object.keys(BTEC_DIP_POINTS),
  "BTEC-Ext-Cert": Object.keys(BTEC_EXT_CERT_POINTS),
  "T-Level": Object.keys(T_LEVEL_POINTS),
};

const QUAL_LABELS: Record<QualificationType, string> = {
  "A-Level": "A-Level (Full Credit)",
  "AS-Level": "AS-Level (Half Credit)",
  "EPQ": "EPQ (Half Credit)",
  "IB-HL": "IB Higher Level",
  "IB-SL": "IB Standard Level",
  "IB-Tok-EE": "IB Theory of Knowledge / EE",
  "BTEC-Ext-Dip": "BTEC Extended Diploma",
  "BTEC-Dip": "BTEC Diploma",
  "BTEC-Ext-Cert": "BTEC Extended Certificate",
  "T-Level": "T-Level Qualification"
};

export default function UcasCalculator() {
  const [entries, setEntries] = useState<QualificationEntry[]>([
    { id: "1", type: "A-Level", subject: "Mathematics", grade: "A", creditType: "Full Credit" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), type: "A-Level", subject: "", grade: "A", creditType: "Full Credit" }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, updates: Partial<QualificationEntry>) => {
    setEntries(entries.map((e) => {
      if (e.id === id) {
        const updated = { ...e, ...updates };
        if (updates.type && QUAL_OPTIONS[updates.type]) {
          if (!QUAL_OPTIONS[updates.type].includes(updated.grade)) {
            updated.grade = QUAL_OPTIONS[updates.type][0];
          }
        }
        return updated;
      }
      return e;
    }));
  };

  const totalPoints = calculateTotalUcasPoints(entries);
  const equivalentOffer = getExactEquivalentOffer(totalPoints);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
          Official UCAS 2026/2027 Tariff
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Calculate UCAS Points</h1>
        <p className="text-muted-foreground text-lg">Search any A-Level or AS subject below. The system automatically detects Full Credit vs. Half Credit qualifications.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence>
            {entries.map((entry) => {
              const creditLabel = getCreditLabel(entry);
              const creditWeight = getCreditWeight(entry);

              return (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-wrap sm:flex-nowrap items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
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
                        updateEntry(entry.id, {
                          subject: subj,
                          type: detectedType || entry.type,
                          creditType: detectedCredit || entry.creditType
                        });
                      }}
                      onCreditToggle={(newCredit) => {
                        const newType = newCredit === "Half Credit" ? "AS-Level" : "A-Level";
                        updateEntry(entry.id, {
                          creditType: newCredit,
                          type: newType
                        });
                      }}
                    />
                  </div>

                  <div className="w-28 shrink-0">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Grade</label>
                    <Select 
                      value={entry.grade} 
                      onChange={(e) => updateEntry(entry.id, { grade: e.target.value })} 
                      className="font-semibold text-accent"
                    >
                      {QUAL_OPTIONS[entry.type]?.map(g => <option key={g} value={g}>{g}</option>)}
                    </Select>
                  </div>

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
            className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-medium hover:border-accent hover:text-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Another Qualification
          </button>
        </div>

        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden">
              <div className="bg-ink-navy text-[#FAFAF6] p-6 md:p-8">
                <div className="opacity-80 text-sm font-medium uppercase tracking-wider mb-2">Total UCAS Points</div>
                <div className="text-6xl font-serif mb-4">{totalPoints}</div>
                <div className="opacity-90 text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Equivalent Offer Profile: <span className="text-accent-foreground font-bold">{equivalentOffer}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h4 className="font-semibold text-sm text-foreground">Next Steps</h4>
                <Link href="/requirements-checker" className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent group transition-colors">
                  Check university requirements
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
                <Link href="/gpa-converter" className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent group transition-colors">
                  Convert to US GPA
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
