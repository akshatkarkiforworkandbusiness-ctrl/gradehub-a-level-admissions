"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Target, FileText, Plus, Trash2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { predictRequiredUms, UMS_BOUNDARIES, QualificationEntry } from "@/lib/calculators";
import { getStoredProfile, saveStoredProfile, StudentProfile } from "@/lib/profile-store";
import Link from "next/link";

interface SubjectEntry {
  name: string;
  asGrade: string;
  predictedGrade: string;
  isAsOnly?: boolean;
}

export default function GradePredictor() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());

  // Calculator State
  const [currentUms, setCurrentUms] = useState<string>("160");
  const [maxUms, setMaxUms] = useState<string>("200");
  const [totalA2Ums, setTotalA2Ums] = useState<string>("400");
  const [targetGrade, setTargetGrade] = useState<string>("A*");

  // Report Form State (Simplified for Personal Student Planning)
  const [studentName, setStudentName] = useState(profile.studentName || "A-Level Scholar");
  const [teacherEval, setTeacherEval] = useState("");
  
  // Report Type Toggle
  const [reportType, setReportType] = useState<"ums" | "subject">("subject");
  
  // Subjects State initialized from shared profile entries if present
  const [subjects, setSubjects] = useState<SubjectEntry[]>(() => {
    const p = getStoredProfile();
    if (p.entries && p.entries.length > 0) {
      return p.entries.map(e => ({
        name: e.subject || "Subject",
        asGrade: "a",
        predictedGrade: e.grade || "A"
      }));
    }
    return [
      { name: "Mathematics", asGrade: "a", predictedGrade: "A*" },
      { name: "Physics", asGrade: "b", predictedGrade: "A" }
    ];
  });

  useEffect(() => {
    const p = getStoredProfile();
    setProfile(p);
    setStudentName(p.studentName || "A-Level Scholar");
  }, []);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", asGrade: "c", predictedGrade: "B" }]);
  };

  const updateSubject = (index: number, field: keyof SubjectEntry, value: string | boolean) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    
    if (field === 'isAsOnly' && value === true) {
      newSubjects[index].predictedGrade = "N/A (AS Level)";
    } else if (field === 'isAsOnly' && value === false && newSubjects[index].predictedGrade === "N/A (AS Level)") {
      newSubjects[index].predictedGrade = "B";
    }
    
    setSubjects(newSubjects);

    // Save back to profile store
    const updatedEntries: QualificationEntry[] = newSubjects.map((s, idx) => ({
      id: (idx + 1).toString(),
      type: s.isAsOnly ? 'AS-Level' : 'A-Level',
      subject: s.name,
      grade: s.predictedGrade === "N/A (AS Level)" ? "a" : s.predictedGrade
    }));
    saveStoredProfile({ ...profile, entries: updatedEntries });
  };

  const removeSubject = (index: number) => {
    const newSubs = subjects.filter((_, i) => i !== index);
    setSubjects(newSubs);
    const updatedEntries: QualificationEntry[] = newSubs.map((s, idx) => ({
      id: (idx + 1).toString(),
      type: s.isAsOnly ? 'AS-Level' : 'A-Level',
      subject: s.name,
      grade: s.predictedGrade === "N/A (AS Level)" ? "a" : s.predictedGrade
    }));
    saveStoredProfile({ ...profile, entries: updatedEntries });
  };

  const currentUmsNum = parseFloat(currentUms) || 0;
  const maxUmsNum = parseFloat(maxUms) || 0;
  const totalA2UmsNum = parseFloat(totalA2Ums) || 0;

  const prediction = predictRequiredUms(currentUmsNum, maxUmsNum, totalA2UmsNum, targetGrade);
  const remainingAvailable = Math.max(0, totalA2UmsNum - maxUmsNum);

  const generateReport = () => {
    const reportData = {
      reportType,
      studentName,
      teacherEval,
      currentUms,
      maxUms,
      totalA2Ums,
      targetGrade,
      requiredRemaining: prediction.requiredRemainingUms?.toFixed(1) || "N/A",
      isPossible: prediction.isPossible,
      subjects
    };
    sessionStorage.setItem("predictedReportData", JSON.stringify(reportData));
    window.open("/report", "_blank");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
          Modular A-Level UMS Math Rules
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">A-Level Grade Predictor</h1>
        <p className="text-muted-foreground text-lg">Calculate remaining UMS marks needed in A2 exams using modular awarding body mechanics (including the 90% A2 rule for A*).</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 border-border">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 text-foreground">
              <Target size={20} className="text-blue-600" />
              Your Current UMS Status
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Total UMS achieved so far (AS Level marks)</label>
                <Input 
                  type="number" 
                  value={currentUms} 
                  onChange={(e) => setCurrentUms(e.target.value)} 
                  className="max-w-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max UMS for exams taken so far (AS Level max UMS)</label>
                <Input 
                  type="number" 
                  value={maxUms} 
                  onChange={(e) => setMaxUms(e.target.value)} 
                  className="max-w-xs"
                />
              </div>

              <div className="pt-6 border-t border-border">
                <label className="block text-sm font-medium text-foreground mb-2">Total UMS for Full A-Level</label>
                <Select value={totalA2Ums} onChange={(e) => setTotalA2Ums(e.target.value)} className="max-w-xs">
                  <option value="400">400 UMS (4-Unit Course e.g. IAL Maths, Physics)</option>
                  <option value="600">600 UMS (6-Unit Course e.g. IAL Chemistry, Biology)</option>
                  <option value="200">200 UMS (2-Unit AS Course)</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Target Final Grade</label>
                <Select value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} className="max-w-xs font-bold text-blue-600">
                  {Object.keys(UMS_BOUNDARIES).map(g => <option key={g} value={g}>{g}</option>)}
                </Select>
              </div>

              {targetGrade === 'A*' && (
                <div className="p-4 bg-muted/60 border border-border rounded-xl text-xs text-muted-foreground space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                    <Info size={16} className="text-blue-600" />
                    Modular A* Calculation Rule:
                  </div>
                  <p>1. <strong>Overall Grade A:</strong> Must achieve at least 80% total UMS across full A-Level.</p>
                  <p>2. <strong>A2 Unit Mastery:</strong> Must achieve at least 90% in A2 units specifically.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Student Study Summary Generator Section */}
          <div className="pt-8">
            <Card className="p-6 md:p-8 border-border bg-muted/20">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-foreground">
                <FileText size={20} className="text-blue-600" />
                Personal Grade Tracking Summary
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Generate a clean PDF summary for your personal study tracking and university planning.
              </p>

              <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
                <button 
                  onClick={() => setReportType("subject")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${reportType === "subject" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Subject-Wise Projection
                </button>
                <button 
                  onClick={() => setReportType("ums")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${reportType === "ums" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  UMS-Based Projection
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-foreground mb-1">Student Name (Optional)</label>
                <Input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g. John Doe" className="max-w-md" />
              </div>

              {reportType === "subject" && (
                <div className="my-8 p-4 border border-border bg-background rounded-lg">
                  <h4 className="font-medium text-sm mb-4">Subjects & Predictions</h4>
                  <div className="space-y-3">
                    {subjects.map((sub, i) => (
                      <div key={i} className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
                        <Input 
                          placeholder="Subject Name (e.g. Mathematics)" 
                          value={sub.name} 
                          onChange={e => updateSubject(i, "name", e.target.value)}
                          className="flex-1 min-w-[200px]"
                        />
                        <div className="flex items-center gap-2 w-[70px]">
                          <label className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={!!sub.isAsOnly} 
                              onChange={e => updateSubject(i, "isAsOnly", e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            AS Only
                          </label>
                        </div>
                        <div className="w-24">
                          <Select value={sub.asGrade} onChange={e => updateSubject(i, "asGrade", e.target.value)}>
                            {["a", "b", "c", "d", "e", "u"].map(g => <option key={g} value={g}>{g}</option>)}
                          </Select>
                        </div>
                        <div className="w-24">
                          <Select 
                            value={sub.predictedGrade} 
                            onChange={e => updateSubject(i, "predictedGrade", e.target.value)}
                            disabled={!!sub.isAsOnly}
                          >
                            {!!sub.isAsOnly ? (
                              <option value="N/A (AS Level)">N/A</option>
                            ) : (
                              ["A*", "A", "B", "C", "D", "E", "U"].map(g => <option key={g} value={g}>{g}</option>)
                            )}
                          </Select>
                        </div>
                        <button onClick={() => removeSubject(i)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addSubject} className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                    <Plus size={16} /> Add Subject
                  </button>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-xs font-medium text-foreground mb-1">Personal Study Notes (Optional)</label>
                <textarea 
                  value={teacherEval} 
                  onChange={e => setTeacherEval(e.target.value)}
                  placeholder="Notes on mock exam targets, revision priorities, or course targets."
                  className="w-full min-h-[90px] p-3 rounded-md border border-border bg-background focus:ring-1 focus:ring-blue-600 text-sm text-foreground"
                />
              </div>

              <button 
                onClick={generateReport}
                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
              >
                <FileText size={18} />
                Generate & Download PDF Summary
              </button>
            </Card>
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden border-border">
              <div className={`p-6 md:p-8 ${prediction.isPossible ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'}`}>
                <div className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">Required A2 UMS</div>
                <div className="text-6xl font-serif mb-2">
                  {prediction.requiredRemainingUms !== null && prediction.isPossible ? prediction.requiredRemainingUms.toFixed(0) : "N/A"}
                </div>
                <div className="text-sm opacity-90">
                  / {remainingAvailable} remaining A2 UMS
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className={`text-sm leading-relaxed ${prediction.isPossible ? 'text-muted-foreground' : 'text-red-500 font-medium'}`}>
                  {prediction.message}
                </p>

                {prediction.breakdown && (
                  <div className="pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                    <div className="font-semibold text-foreground">Dual-Rule Breakdown:</div>
                    <div>• For 80% Overall (Grade A): {prediction.breakdown.overallA2NeededFor80} A2 UMS</div>
                    <div>• For 90% A2 Rule: {prediction.breakdown.a2NeededFor90Rule} A2 UMS</div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <Link href="/ucas-calculator" className="flex items-center justify-between text-sm text-muted-foreground hover:text-blue-600 group transition-colors">
                    Calculate total UCAS Points
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
