"use client";

import { useState } from "react";
import { Plus, X, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SubjectSearchCombobox } from "@/components/ui/subject-search-combobox";
import { CreditType, detectSubjectCredit } from "@/lib/calculators";
import { motion, AnimatePresence } from "framer-motion";

interface SelectedSubject {
  name: string;
  creditType: CreditType;
}

const DEGREE_REQUIREMENTS = [
  {
    name: "Medicine & Surgery (MBBS)",
    requires: ["Chemistry", "Biology"],
    niceToHave: ["Mathematics", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Dentistry (BDS)",
    requires: ["Chemistry", "Biology"],
    niceToHave: ["Mathematics", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Veterinary Science",
    requires: ["Chemistry", "Biology"],
    niceToHave: ["Mathematics", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Engineering (General / Mechanical / Civil)",
    requires: ["Mathematics", "Physics"],
    niceToHave: ["Further Mathematics", "Chemistry"],
    tier: "Competitive"
  },
  {
    name: "Chemical Engineering",
    requires: ["Mathematics", "Chemistry"],
    niceToHave: ["Physics", "Further Mathematics"],
    tier: "Competitive"
  },
  {
    name: "Computer Science & AI",
    requires: ["Mathematics"],
    niceToHave: ["Further Mathematics", "Computer Science", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Mathematics & Statistics",
    requires: ["Mathematics"],
    niceToHave: ["Further Mathematics", "Physics"],
    tier: "Competitive"
  },
  {
    name: "Physics & Astrophysics",
    requires: ["Mathematics", "Physics"],
    niceToHave: ["Further Mathematics"],
    tier: "Competitive"
  },
  {
    name: "Chemistry",
    requires: ["Chemistry", "Mathematics"],
    niceToHave: ["Physics", "Biology"],
    tier: "Standard"
  },
  {
    name: "Biological & Biomedical Sciences",
    requires: ["Biology", "Chemistry"],
    niceToHave: ["Mathematics", "Physics"],
    tier: "Standard"
  },
  {
    name: "Economics & Econometrics",
    requires: ["Mathematics"],
    niceToHave: ["Economics", "Further Mathematics"],
    tier: "Competitive"
  },
  {
    name: "Finance, Accounting & Business",
    requires: [],
    niceToHave: ["Mathematics", "Economics", "Accounting"],
    tier: "Standard"
  },
  {
    name: "Law (LLB)",
    requires: [],
    niceToHave: ["History", "English Literature", "Law"],
    tier: "Competitive"
  },
  {
    name: "Psychology (BSc)",
    requires: ["A Science Subject"],
    niceToHave: ["Psychology", "Mathematics", "Biology"],
    tier: "Standard"
  },
  {
    name: "Architecture (BA/BSc)",
    requires: [],
    niceToHave: ["Art and Design", "Mathematics", "Physics"],
    tier: "Standard"
  },
  {
    name: "History & International History",
    requires: [],
    niceToHave: ["History", "English Literature", "Politics"],
    tier: "Standard"
  },
  {
    name: "English Literature & Creative Writing",
    requires: ["English Literature"],
    niceToHave: ["History", "French", "German", "Spanish"],
    tier: "Standard"
  },
  {
    name: "Politics & International Relations",
    requires: [],
    niceToHave: ["Politics", "History", "Economics"],
    tier: "Standard"
  },
  {
    name: "Geography & Environmental Science",
    requires: [],
    niceToHave: ["Geography", "Biology", "Environmental Science"],
    tier: "Standard"
  },
  {
    name: "Modern Languages & Linguistics",
    requires: [],
    niceToHave: ["French", "German", "Spanish", "English Language"],
    tier: "Standard"
  }
];

export default function SubjectMatcher() {
  const [subjects, setSubjects] = useState<SelectedSubject[]>([
    { name: "Mathematics", creditType: "Full Credit" },
    { name: "Physics", creditType: "Full Credit" },
    { name: "Chemistry", creditType: "Full Credit" }
  ]);

  const addSubject = () => {
    if (subjects.length < 5) {
      setSubjects([...subjects, { name: "Biology", creditType: "Full Credit" }]);
    }
  };

  const removeSubject = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  const updateSubject = (idx: number, name: string, creditType?: CreditType) => {
    const newSubs = [...subjects];
    const detected = detectSubjectCredit(name);
    newSubs[idx] = { 
      name: detected.cleanSubject, 
      creditType: creditType || detected.creditType 
    };
    setSubjects(newSubs);
  };

  const isScience = (sub: string) => ["Biology", "Chemistry", "Physics", "Mathematics", "Psychology", "Further Mathematics"].includes(sub);

  const getMatches = () => {
    const fullCreditNames = subjects.filter(s => s.creditType === "Full Credit").map(s => s.name);
    const allNames = subjects.map(s => s.name);

    return DEGREE_REQUIREMENTS.map(degree => {
      let isMatch = true;
      let missingReqs: string[] = [];

      degree.requires.forEach(req => {
        if (req === "A Science Subject") {
          if (!fullCreditNames.some(s => isScience(s))) {
            isMatch = false;
            missingReqs.push("Science Subject (Full A-Level)");
          }
        } else if (!fullCreditNames.includes(req)) {
          // Check if user has it only as half credit (AS-Level)
          if (allNames.includes(req)) {
            isMatch = false;
            missingReqs.push(`${req} (Requires Full A-Level, not AS)`);
          } else {
            isMatch = false;
            missingReqs.push(req);
          }
        }
      });

      return { ...degree, isMatch, missingReqs };
    });
  };

  const matches = getMatches();
  const successfulMatches = matches.filter(m => m.isMatch);
  const missedMatches = matches.filter(m => !m.isMatch);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
          Russell Group "Informed Choices" Standard
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Degree Subject Matcher</h1>
        <p className="text-muted-foreground text-lg">Search subjects and select Full Credit (Full A-Level) or Half Credit (AS-Level) to see which degrees unlock.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-foreground">Your Subjects</h3>
            <div className="space-y-4">
              <AnimatePresence>
                {subjects.map((sub, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-1">
                      <SubjectSearchCombobox
                        value={sub.name}
                        creditType={sub.creditType}
                        onChange={(name, _, detectedCredit) => updateSubject(idx, name, detectedCredit)}
                        onCreditToggle={(newCredit) => updateSubject(idx, sub.name, newCredit)}
                      />
                    </div>
                    <button onClick={() => removeSubject(idx)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                      <X size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {subjects.length < 5 && (
              <button 
                onClick={addSubject}
                className="mt-4 w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-accent hover:border-accent flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={16} /> Add Subject
              </button>
            )}
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-serif mb-4 flex items-center gap-2 text-foreground">
              <CheckCircle2 className="text-green-500" />
              You qualify for ({successfulMatches.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {successfulMatches.map(match => (
                <Card key={match.name} className="p-5 border-border hover:border-ink-navy transition-colors cursor-default shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">{match.name}</h4>
                  <div className="text-xs text-muted-foreground">Tier: {match.tier}</div>
                </Card>
              ))}
              {successfulMatches.length === 0 && (
                <p className="text-muted-foreground text-sm p-4">Add Full Credit A-Level subjects like Maths or Sciences to see degree paths open up.</p>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-serif mb-4 flex items-center gap-2 text-muted-foreground">
              <AlertCircle size={20} />
              Currently Locked ({missedMatches.length})
            </h2>
            <div className="space-y-3">
              {missedMatches.map(match => (
                <div key={match.name} className="bg-muted p-4 rounded-xl border border-border flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{match.name}</h4>
                    <p className="text-xs text-ink-red-text mt-1">Missing: {match.missingReqs.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border mt-8 flex flex-col gap-3">
            <h3 className="font-semibold text-lg text-foreground">Next Steps</h3>
            <Link href="/requirements-checker" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent group transition-colors bg-card">
              <div>
                <div className="font-medium text-foreground">Global University Matcher</div>
                <div className="text-xs text-muted-foreground mt-1">Check admission requirements for your target degree across the UK, US, and Europe.</div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
