"use client";

import { useState } from "react";
import { Plus, X, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  QualificationEntry, 
  calculateAverageGpa,
  A_LEVEL_POINTS
} from "@/lib/calculators";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const GRADES = Object.keys(A_LEVEL_POINTS);

export default function GpaConverter() {
  const [entries, setEntries] = useState<QualificationEntry[]>([
    { id: "1", type: "A-Level", subject: "Mathematics", grade: "A" },
    { id: "2", type: "A-Level", subject: "Physics", grade: "A" },
    { id: "3", type: "A-Level", subject: "Chemistry", grade: "B" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), type: "A-Level", subject: "", grade: "A" }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof QualificationEntry, value: string) => {
    setEntries(entries.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  const gpa = calculateAverageGpa(entries);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          US Applications
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">A-Level to US GPA Converter</h1>
        <p className="text-muted-foreground text-lg">Convert your British A-Levels into the standard unweighted 4.0 GPA scale used by American universities.</p>
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
                    {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
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
            Add Subject
          </button>
        </div>

        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden">
              <div className="bg-ink-navy text-[#FAFAF6] p-6 md:p-8">
                <div className="opacity-80 text-sm font-medium uppercase tracking-wider mb-2">Unweighted GPA</div>
                <div className="text-6xl font-serif mb-4">{gpa !== null ? gpa.toFixed(2) : "0.00"}</div>
                <div className="opacity-80 text-sm">
                  On a standard 4.0 scale
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> US universities evaluate A-Levels holistically. This calculator uses the most common conversion standard (A*=4.0, A=4.0, B=3.3, C=2.7, D=2.0, E=1.0), but some colleges may have proprietary weighting systems.
                </p>
                <div className="pt-4 border-t border-border mt-4 flex flex-col gap-3">
                  <h3 className="font-semibold text-lg text-foreground">Next Steps</h3>
                  <Link href={`/requirements-checker?gpa=${gpa !== null ? gpa : 0}`} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent group transition-colors bg-card">
                    <div>
                      <div className="font-medium text-foreground">US University Matcher</div>
                      <div className="text-xs text-muted-foreground mt-1">See which US Universities you qualify for.</div>
                    </div>
                    <ArrowRight size={20} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
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
