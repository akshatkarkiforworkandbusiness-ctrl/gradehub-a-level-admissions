"use client";

import { useState, useEffect } from "react";
import { Search, CheckCircle2, XCircle, Sparkles, ArrowRight, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";
import { getStoredProfile, saveStoredProfile, StudentProfile } from "@/lib/profile-store";
import { QualificationEntry } from "@/lib/calculators";
import Link from "next/link";

interface DegreeProfile {
  title: string;
  category: string;
  essential: string[];
  useful: string[];
  notes: string;
  scienceRequiredCount?: number;
}

const DEGREES: DegreeProfile[] = [
  {
    title: "Computer Science",
    category: "STEM",
    essential: ["Mathematics"],
    useful: ["Further Mathematics", "Computer Science", "Physics"],
    notes: "Oxford, Cambridge, and Imperial strongly prefer or require Further Mathematics."
  },
  {
    title: "Medicine",
    category: "STEM & Healthcare",
    essential: ["Chemistry", "Biology"],
    useful: ["Mathematics", "Physics"],
    notes: "Most medical schools require Chemistry AND Biology at Grade A/A*."
  },
  {
    title: "Engineering (General / Mechanical / Aerospace)",
    category: "STEM",
    essential: ["Mathematics", "Physics"],
    useful: ["Further Mathematics", "Chemistry"],
    notes: "Mathematics and Physics are non-negotiable for all Russell Group engineering degrees."
  },
  {
    title: "Economics",
    category: "Social Sciences & Finance",
    essential: ["Mathematics"],
    useful: ["Further Mathematics", "Economics", "Statistics"],
    notes: "LSE, Cambridge, and UCL treat A-Level Mathematics as essential and Economics as optional."
  },
  {
    title: "Law (LLB)",
    category: "Humanities & Law",
    essential: [],
    useful: ["English Literature", "History", "Law", "Philosophy"],
    notes: "No specific required subjects! Essay-based subjects (History, English) demonstrate analytical writing skills."
  },
  {
    title: "Psychology (BSc)",
    category: "STEM & Social Sciences",
    essential: [],
    scienceRequiredCount: 1,
    useful: ["Psychology", "Biology", "Mathematics", "Sociology"],
    notes: "Requires at least ONE science subject (Biology, Chemistry, Physics, Mathematics, Psychology, Statistics, Computer Science, Environmental Science, or Geology)."
  },
  {
    title: "Architecture",
    category: "Arts & Design",
    essential: [],
    useful: ["Art and Design", "Mathematics", "Physics"],
    notes: "Requires a strong physical or digital portfolio during interview rounds."
  },
  {
    title: "Business & Management",
    category: "Social Sciences & Finance",
    essential: [],
    useful: ["Mathematics", "Business", "Economics"],
    notes: "Broadly accessible. Mathematics is highly useful for quantitative finance tracks."
  }
];

export default function SubjectMatcher() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [userSubjects, setUserSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);
    if (prof.entries && prof.entries.length > 0) {
      setUserSubjects(prof.entries.map(e => e.subject));
    } else {
      setUserSubjects(["Mathematics", "Physics", "Chemistry"]);
    }
  }, []);

  const addSubject = (sub: string) => {
    if (!sub.trim()) return;
    if (!userSubjects.includes(sub)) {
      const updated = [...userSubjects, sub];
      setUserSubjects(updated);
      const entries: QualificationEntry[] = updated.map((s, idx) => ({
        id: (idx + 1).toString(),
        type: 'A-Level',
        subject: s,
        grade: 'A',
        creditType: 'Full Credit'
      }));
      saveStoredProfile({ ...profile, entries });
    }
  };

  const removeSubject = (sub: string) => {
    const updated = userSubjects.filter(s => s !== sub);
    setUserSubjects(updated);
    const entries: QualificationEntry[] = updated.map((s, idx) => ({
      id: (idx + 1).toString(),
      type: 'A-Level',
      subject: s,
      grade: 'A',
      creditType: 'Full Credit'
    }));
    saveStoredProfile({ ...profile, entries });
  };

  const isScience = (subject: string): boolean => {
    const lower = subject.toLowerCase();
    return ["biology", "chemistry", "physics", "mathematics", "psychology", "further mathematics", "statistics", "computer science", "environmental science", "geology"].some(s => lower.includes(s));
  };

  const checkEligibility = (degree: DegreeProfile) => {
    let missingEssential: string[] = [];
    let matchedEssential: string[] = [];
    let matchedUseful: string[] = [];

    degree.essential.forEach(req => {
      const match = userSubjects.find(s => s.toLowerCase().includes(req.toLowerCase()));
      if (match) matchedEssential.push(match);
      else missingEssential.push(req);
    });

    if (degree.scienceRequiredCount) {
      const userScienceCount = userSubjects.filter(isScience).length;
      if (userScienceCount < degree.scienceRequiredCount) {
        missingEssential.push(`At least ${degree.scienceRequiredCount} Science Subject`);
      }
    }

    degree.useful.forEach(use => {
      const match = userSubjects.find(s => s.toLowerCase().includes(use.toLowerCase()));
      if (match) matchedUseful.push(match);
    });

    const isEligible = missingEssential.length === 0;

    return { isEligible, missingEssential, matchedEssential, matchedUseful };
  };

  const filteredDegrees = DEGREES.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || d.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          Russell Group Informed Choices Guidance Matrix
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Degree & Subject Matcher</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Select your A-Level subjects to see which university degree disciplines you meet essential subject requirements for.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Subject Selector */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground border-b border-border pb-3">Your A-Level Subjects</h3>
            
            <SubjectSearchCombobox onSelectSubject={(sub) => addSubject(sub)} />

            <div className="flex flex-wrap gap-2 pt-2">
              {userSubjects.map(sub => (
                <span key={sub} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-600 border border-blue-600/20 text-xs font-bold">
                  {sub}
                  <button onClick={() => removeSubject(sub)} className="hover:text-red-500 transition-colors">×</button>
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Degree Discipline Eligibility Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-3 flex-wrap items-center justify-between mb-2">
            <Input 
              placeholder="Search degrees (e.g. Computer Science, Medicine)..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-4">
            {filteredDegrees.map((degree) => {
              const { isEligible, missingEssential, matchedEssential, matchedUseful } = checkEligibility(degree);

              return (
                <Card key={degree.title} className="p-6 border-border shadow-md space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted uppercase text-muted-foreground">{degree.category}</span>
                      <h3 className="font-bold text-lg text-foreground mt-1">{degree.title}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isEligible ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}>
                      {isEligible ? "Eligible Target" : "Missing Prerequisites"}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{degree.notes}</p>

                  <div className="pt-3 border-t border-border grid sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-foreground block mb-1">Essential Requirements:</span>
                      {degree.essential.length === 0 && !degree.scienceRequiredCount ? (
                        <span className="text-emerald-600">No specific required subjects</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {degree.essential.map(req => {
                            const isMet = matchedEssential.some(m => m.toLowerCase().includes(req.toLowerCase()));
                            return (
                              <span key={req} className={`px-2 py-0.5 rounded text-[11px] font-medium ${isMet ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
                                {isMet ? '✓' : '✗'} {req}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="font-semibold text-foreground block mb-1">Useful / Recommended:</span>
                      <div className="flex flex-wrap gap-1">
                        {degree.useful.map(use => (
                          <span key={use} className="px-2 py-0.5 rounded text-[11px] bg-muted text-muted-foreground">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
