"use client";

import { useState } from "react";
import { ArrowRight, Target, FileText, Upload, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { predictRequiredUms, UMS_BOUNDARIES } from "@/lib/calculators";
import Link from "next/link";

interface SubjectEntry {
  name: string;
  asGrade: string;
  predictedGrade: string;
  isAsOnly?: boolean;
}

export default function GradePredictor() {
  // Calculator State
  const [currentUms, setCurrentUms] = useState<string>("160");
  const [maxUms, setMaxUms] = useState<string>("200");
  const [totalA2Ums, setTotalA2Ums] = useState<string>("400");
  const [targetGrade, setTargetGrade] = useState<string>("A");

  // Report Form State
  const [studentName, setStudentName] = useState("");
  const [candidateNumber, setCandidateNumber] = useState("");
  const [centerNumber, setCenterNumber] = useState("");
  const [authPerson, setAuthPerson] = useState("");
  const [authTitle, setAuthTitle] = useState("");
  const [signature, setSignature] = useState<string>("");
  const [teacherEval, setTeacherEval] = useState("");
  
  // Report Type Toggle
  const [reportType, setReportType] = useState<"ums" | "subject">("subject");
  
  // Subjects State
  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    { name: "Mathematics", asGrade: "a", predictedGrade: "A*" },
    { name: "Physics", asGrade: "b", predictedGrade: "A" }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", asGrade: "c", predictedGrade: "B" }]);
  };

  const updateSubject = (index: number, field: keyof SubjectEntry, value: string | boolean) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    
    // Auto-lock predicted grade if AS Only is toggled
    if (field === 'isAsOnly' && value === true) {
      newSubjects[index].predictedGrade = "N/A (AS Level)";
    } else if (field === 'isAsOnly' && value === false && newSubjects[index].predictedGrade === "N/A (AS Level)") {
      newSubjects[index].predictedGrade = "B";
    }
    
    setSubjects(newSubjects);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const currentUmsNum = parseFloat(currentUms) || 0;
  const maxUmsNum = parseFloat(maxUms) || 0;
  const totalA2UmsNum = parseFloat(totalA2Ums) || 0;

  const requiredRemaining = predictRequiredUms(currentUmsNum, totalA2UmsNum, targetGrade);
  const remainingAvailable = totalA2UmsNum - maxUmsNum;
  
  const isPossible = requiredRemaining !== null && requiredRemaining <= remainingAvailable;
  
  let resultMessage = "";
  if (requiredRemaining === null) {
    resultMessage = "Invalid parameters.";
  } else if (!isPossible) {
    resultMessage = "Mathematically impossible. You need more marks than are available in the remaining exams.";
  } else if (requiredRemaining === 0) {
    resultMessage = "You've already secured enough marks for this grade!";
  } else {
    resultMessage = `You need ${requiredRemaining.toFixed(1)} more UMS marks in your remaining exams to achieve a grade ${targetGrade}.`;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateReport = () => {
    const reportData = {
      reportType,
      studentName,
      candidateNumber,
      centerNumber,
      authPerson,
      authTitle,
      signature,
      teacherEval,
      // UMS Specific
      currentUms,
      maxUms,
      totalA2Ums,
      targetGrade,
      requiredRemaining: requiredRemaining?.toFixed(1) || "N/A",
      isPossible,
      // Subject Specific
      subjects
    };
    sessionStorage.setItem("predictedReportData", JSON.stringify(reportData));
    window.open("/report", "_blank");
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">A-Level Grade Predictor</h1>
        <p className="text-muted-foreground text-lg">Using the Uniform Mark Scale (UMS) system for International A-Levels (CAIE/Edexcel). Calculate exactly what you need in your A2 exams.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 md:p-8 border-border">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 text-foreground">
              <Target size={20} className="text-accent" />
              Your Current Status
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Total UMS achieved so far (e.g. your AS marks)</label>
                <Input 
                  type="number" 
                  value={currentUms} 
                  onChange={(e) => setCurrentUms(e.target.value)} 
                  className="max-w-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max UMS for exams taken so far</label>
                <Input 
                  type="number" 
                  value={maxUms} 
                  onChange={(e) => setMaxUms(e.target.value)} 
                  className="max-w-xs"
                />
              </div>

              <div className="pt-6 border-t border-border">
                <label className="block text-sm font-medium text-foreground mb-2">Total UMS for the full A-Level (usually 400 or 600)</label>
                <Select value={totalA2Ums} onChange={(e) => setTotalA2Ums(e.target.value)} className="max-w-xs">
                  <option value="400">400 (4 Units)</option>
                  <option value="600">600 (6 Units)</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Target Final Grade</label>
                <Select value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} className="max-w-xs font-bold text-accent">
                  {Object.keys(UMS_BOUNDARIES).map(g => <option key={g} value={g}>{g}</option>)}
                </Select>
              </div>
            </div>
          </Card>

          {/* Official Report Generator Section */}
          <div className="pt-8">
            <Card className="p-6 md:p-8 border-border bg-muted/20">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-foreground">
                <FileText size={20} className="text-accent" />
                Official Predicted Grades Report
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Generate a printable, professional PDF report to share with universities.
              </p>

              <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg w-fit">
                <button 
                  onClick={() => setReportType("subject")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${reportType === "subject" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Subject-Wise Report
                </button>
                <button 
                  onClick={() => setReportType("ums")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${reportType === "ums" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  UMS-Based Report
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Student Full Name <span className="text-red-500">*</span></label>
                  <Input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Candidate Number <span className="text-red-500">*</span></label>
                  <Input value={candidateNumber} onChange={e => setCandidateNumber(e.target.value)} placeholder="AS Level Candidate No." />
                </div>
              </div>

              {reportType === "subject" && (
                <div className="my-8 p-4 border border-border bg-background rounded-lg">
                  <h4 className="font-medium text-sm mb-4">Subjects & Predictions</h4>
                  <div className="space-y-3">
                    <div className="hidden sm:flex gap-2 items-center text-xs font-medium text-muted-foreground pb-2 border-b border-border/50">
                      <div className="flex-1 min-w-[200px]">Subject Name</div>
                      <div className="w-[70px]"></div>
                      <div className="w-24">AS Grade</div>
                      <div className="w-24">A2 Grade</div>
                      <div className="w-8"></div>
                    </div>
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
                  <button onClick={addSubject} className="mt-4 flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                    <Plus size={16} /> Add Subject
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">School / Center Code <span className="text-red-500">*</span></label>
                  <Input value={centerNumber} onChange={e => setCenterNumber(e.target.value)} placeholder="e.g. PK001" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Authorizing Person Name <span className="text-red-500">*</span></label>
                  <Input value={authPerson} onChange={e => setAuthPerson(e.target.value)} placeholder="e.g. Dr. Sarah Smith" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Authorizing Title <span className="text-red-500">*</span></label>
                  <Input value={authTitle} onChange={e => setAuthTitle(e.target.value)} placeholder="e.g. Principal, Head of Sixth Form" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Digital Signature (Optional)</label>
                  <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg p-2 text-sm justify-center hover:bg-muted/50 transition-colors">
                    <Upload size={16} />
                    {signature ? "Signature Uploaded" : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-foreground mb-1">Teacher Evaluation / Reference (Optional)</label>
                <textarea 
                  value={teacherEval} 
                  onChange={e => setTeacherEval(e.target.value)}
                  placeholder="A brief contextual summary of the student's academic trajectory and work ethic."
                  className="w-full min-h-[100px] p-3 rounded-md border border-border bg-background focus:ring-1 focus:ring-accent focus:border-accent text-sm"
                />
              </div>

              <button 
                onClick={generateReport}
                className="w-full btn-premium py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-accent-foreground bg-accent hover:opacity-90 transition-all shadow-lg shadow-accent/20"
              >
                <FileText size={18} />
                Generate & Download PDF
              </button>
            </Card>
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <Card className="overflow-hidden border-border">
              <div className={`p-6 md:p-8 ${isPossible ? 'bg-ink-navy text-[#FAFAF6]' : 'bg-ink-red text-[#FAFAF6]'}`}>
                <div className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">Required Marks</div>
                <div className="text-6xl font-serif mb-2">
                  {requiredRemaining !== null && isPossible ? requiredRemaining.toFixed(0) : "N/A"}
                </div>
                <div className="text-sm opacity-90">
                  / {remainingAvailable} remaining UMS
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className={`text-sm leading-relaxed ${isPossible ? 'text-muted-foreground' : 'text-red-500 font-medium'}`}>
                  {resultMessage}
                </p>
                <div className="pt-4 border-t border-border">
                  <Link href="/ucas-calculator" className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent group transition-colors">
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
