"use client";

import { useState, useEffect } from "react";
import { Globe, ArrowRight, Info, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { 
  QualificationEntry, 
  calculateAverageGpa, 
  calculateCanadaPercentage, 
  calculateGermanBavarianGrade,
  calculateEstimatedAtar,
  calculateHkSgPoints
} from "@/lib/calculators";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";

export default function GpaConverter() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [entries, setEntries] = useState<QualificationEntry[]>([]);
  const [scaleMode, setScaleMode] = useState<'unweighted' | 'weighted' | 'plusMinus'>('unweighted');

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    setEntries(prof.entries || []);
  }, []);

  const gpa = calculateAverageGpa(entries, scaleMode);
  const canadaPct = calculateCanadaPercentage(entries);
  const germanGrade = calculateGermanBavarianGrade(entries);
  const atarResult = calculateEstimatedAtar(entries);
  const hkSgPoints = calculateHkSgPoints(entries);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          International Grade & GPA Conversion Estimates
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Global Grade & GPA Converter</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Convert your saved A-Level qualifications into US GPA (WES 4.0 & AP Weighted 5.0), Canada %, German Bavarian Scale (1.0-4.0), Australia ATAR, and HK/SG Points.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Saved Profile Subjects & GPA Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground border-b border-border pb-3 flex items-center justify-between">
              <span>Saved Qualifications ({entries.length})</span>
              <span className="text-xs font-normal text-muted-foreground">Auto-synced from your profile</span>
            </h3>

            {entries.length === 0 ? (
              <div className="text-sm text-muted-foreground p-6 text-center">No qualifications saved yet. Add your subjects on the UCAS Points Calculator.</div>
            ) : (
              <div className="space-y-2">
                {entries.map(e => (
                  <div key={e.id} className="p-3 rounded-lg border border-border bg-card flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{e.subject} ({e.type})</span>
                    <span className="font-bold text-blue-600 uppercase bg-blue-600/10 px-2 py-0.5 rounded">Grade {e.grade}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Global Results Cards */}
        <div className="space-y-6">
          {/* US GPA */}
          <Card className="p-6 border-border shadow-md bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-400 font-semibold uppercase tracking-wider">
              <span>US Cumulative GPA</span>
              <Select value={scaleMode} onChange={e => setScaleMode(e.target.value as any)} className="w-32 bg-slate-800 text-white text-xs border-slate-700">
                <option value="unweighted">4.0 WES</option>
                <option value="weighted">5.0 AP</option>
                <option value="plusMinus">Plus/Minus</option>
              </Select>
            </div>

            <div className="text-5xl font-serif font-bold">
              {gpa !== null ? gpa.toFixed(2) : "N/A"} <span className="text-sm font-sans font-normal opacity-80">/ {scaleMode === 'weighted' ? '5.0' : '4.0'}</span>
            </div>
          </Card>

          {/* Canada & Germany */}
          <Card className="p-6 border-border shadow-md space-y-4">
            <h4 className="font-bold text-sm text-foreground border-b border-border pb-2">Canada & Europe Equivalents</h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span>🇨🇦 Canada Percentage:</span>
                <strong className="text-foreground text-sm">{canadaPct !== null ? `${canadaPct}%` : "N/A"}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>🇩🇪 Germany Bavarian Grade:</span>
                <strong className="text-foreground text-sm">{germanGrade !== null ? germanGrade.toFixed(2) : "N/A"} (1.0 Best)</strong>
              </div>
            </div>
          </Card>

          {/* Australia ATAR & HK/SG Disclaimers */}
          <Card className="p-6 border-border shadow-md space-y-3 bg-muted/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <AlertCircle size={14} className="text-amber-500" /> Australia & Asia Heuristic Estimates
            </div>
            <div className="text-xs space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>🇦🇺 Australia ATAR:</span>
                <strong className="text-foreground">{atarResult.atar}</strong>
              </div>
              <div className="flex justify-between">
                <span>🇭🇰/🇸🇬 HK/SG Admission Pts:</span>
                <strong className="text-foreground">{hkSgPoints} pts</strong>
              </div>
              <p className="text-[10px] leading-relaxed pt-1 text-slate-500 border-t border-border">
                *Note: ATAR and HK/SG values are heuristic estimates for planning purposes. Official admissions offices evaluate direct A-Level grade transcripts.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
