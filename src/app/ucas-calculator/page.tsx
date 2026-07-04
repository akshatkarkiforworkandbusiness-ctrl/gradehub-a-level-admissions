"use client";

import { useState } from "react";
import { Plus, X, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  QualificationType, 
  QualificationEntry, 
  calculateTotalUcasPoints,
  A_LEVEL_POINTS,
  AS_LEVEL_POINTS,
  EPQ_POINTS,
  IB_HL_POINTS,
  BTEC_EXT_POINTS
} from "@/lib/calculators";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const QUAL_OPTIONS: Record<QualificationType, string[]> = {
  "A-Level": Object.keys(A_LEVEL_POINTS),
  "AS-Level": Object.keys(AS_LEVEL_POINTS),
  "EPQ": Object.keys(EPQ_POINTS),
  "IB-HL": Object.keys(IB_HL_POINTS),
  "BTEC-Ext-Dip": Object.keys(BTEC_EXT_POINTS),
};

export default function UcasCalculator() {
  const [entries, setEntries] = useState<QualificationEntry[]>([
    { id: "1", type: "A-Level", subject: "Mathematics", grade: "A" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), type: "A-Level", subject: "", grade: "A" }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof QualificationEntry, value: string) => {
    setEntries(entries.map((e) => {
      if (e.id === id) {
        const updated = { ...e, [field]: value };
        if (field === "type") {
          updated.grade = QUAL_OPTIONS[value as QualificationType][0];
        }
        return updated;
      }
      return e;
    }));
  };

  const totalPoints = calculateTotalUcasPoints(entries);

  const getEquivalentOffer = (pts: number) => {
    if (pts >= 168) return "A*A*A*";
    if (pts >= 152) return "A*AA";
    if (pts >= 144) return "AAA";
    if (pts >= 128) return "ABB";
    if (pts >= 112) return "BBC";
    if (pts >= 96) return "CCC";
    return "Below CCC";
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Calculate UCAS Points</h1>
        <p className="text-muted-foreground text-lg">Add your qualifications below to instantly see your total tariff points for UK university entry.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-wrap sm:flex-nowrap items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="w-full sm:flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Qualification</label>
                  <Select value={entry.type} onChange={(e) => updateEntry(entry.id, "type", e.target.value)}>
                    {Object.keys(QUAL_OPTIONS).map(q => <option key={q} value={q}>{q}</option>)}
                  </Select>
                </div>
                
                <div className="w-full sm:w-40 min-w-[120px]">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Subject</label>
                  <Input 
                    value={entry.subject} 
                    onChange={(e) => updateEntry(entry.id, "subject", e.target.value)} 
                    placeholder="e.g. History"
                    className="bg-transparent border-none shadow-none px-0 font-medium text-foreground focus:ring-0"
                  />
                </div>

                <div className="w-24 shrink-0">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Grade</label>
                  <Select value={entry.grade} onChange={(e) => updateEntry(entry.id, "grade", e.target.value)} className="font-semibold text-accent">
                    {QUAL_OPTIONS[entry.type].map(g => <option key={g} value={g}>{g}</option>)}
                  </Select>
                </div>

                <button 
                  onClick={() => removeEntry(entry.id)}
                  className="shrink-0 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-5 sm:mt-0"
                >
                  <X size={20} />
                </button>
              </motion.div>
            ))}
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
                <div className="opacity-80 text-sm">
                  Equivalent to <span className="text-accent-foreground font-semibold">{getEquivalentOffer(totalPoints)}</span> at A-Level
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
