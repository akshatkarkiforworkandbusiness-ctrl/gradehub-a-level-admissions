"use client";

import { useState } from "react";
import { Plus, X, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_SUBJECTS = [
  "Accounting", "Afrikaans", "Agriculture", "Ancient History", "Applied ICT", 
  "Arabic", "Archaeology", "Architecture", "Art and Design", "Bengali", 
  "Biblical Hebrew", "Biology", "Business Studies", "Chemistry", 
  "Chinese (Mandarin)", "Classical Civilisation", "Classical Greek", 
  "Classical Studies", "Computer Science", "Criminology", "Dance", 
  "Design and Technology", "Digital Media", "Divinity", "Drama and Theatre Studies", 
  "Economics", "Electronics", "Engineering", "English General Paper", 
  "English Language", "English Language and Literature", "English Literature", 
  "Environmental Science", "Film Studies", "Food Preparation and Nutrition", 
  "French", "Further Mathematics", "Geography", "Geology", "German", 
  "Global Perspectives and Research", "Gujarati", "Health and Social Care", 
  "Hindi", "Hinduism", "History", "History of Art", "Information Technology", 
  "Islamic Studies", "Italian", "Japanese", "Latin", "Law", 
  "Marine Science", "Mathematics", "Media Studies", "Modern Hebrew", 
  "Music", "Music Technology", "Panjabi", "Persian", "Philosophy", 
  "Photography", "Physical Education", "Physics", "Polish", "Politics", 
  "Portuguese", "Psychology", "Religious Studies", "Russian", "Sociology", 
  "Spanish", "Statistics", "Tamil", "Textiles", "Thinking Skills", 
  "Travel and Tourism", "Turkish", "Urdu"
];

const DEGREE_REQUIREMENTS = [
  {
    name: "Medicine / Dentistry",
    requires: ["Chemistry", "Biology"],
    niceToHave: ["Mathematics", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Engineering (General)",
    requires: ["Mathematics", "Physics"],
    niceToHave: ["Further Mathematics", "Chemistry"],
    tier: "Competitive"
  },
  {
    name: "Computer Science",
    requires: ["Mathematics"],
    niceToHave: ["Further Mathematics", "Computer Science", "Physics"],
    tier: "Highly Competitive"
  },
  {
    name: "Economics",
    requires: ["Mathematics"],
    niceToHave: ["Economics", "Further Mathematics"],
    tier: "Competitive"
  },
  {
    name: "Law",
    requires: [],
    niceToHave: ["History", "English Literature", "Essay Subject"],
    tier: "Competitive"
  },
  {
    name: "Psychology",
    requires: ["A Science Subject"],
    niceToHave: ["Psychology", "Mathematics"],
    tier: "Standard"
  },
  {
    name: "Architecture",
    requires: [],
    niceToHave: ["Art & Design", "Mathematics", "Physics"],
    tier: "Standard"
  }
];

export default function SubjectMatcher() {
  const [subjects, setSubjects] = useState<string[]>(["Mathematics", "Physics", "Chemistry"]);

  const addSubject = () => {
    if (subjects.length < 4) {
      setSubjects([...subjects, "Biology"]);
    }
  };

  const removeSubject = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  const updateSubject = (idx: number, val: string) => {
    const newSubs = [...subjects];
    newSubs[idx] = val;
    setSubjects(newSubs);
  };

  const isScience = (sub: string) => ["Biology", "Chemistry", "Physics", "Mathematics", "Psychology"].includes(sub);

  const getMatches = () => {
    return DEGREE_REQUIREMENTS.map(degree => {
      let isMatch = true;
      let missingReqs: string[] = [];

      degree.requires.forEach(req => {
        if (req === "A Science Subject") {
          if (!subjects.some(s => isScience(s))) {
            isMatch = false;
            missingReqs.push(req);
          }
        } else if (!subjects.includes(req)) {
          isMatch = false;
          missingReqs.push(req);
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          Most Popular Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Subject Matcher</h1>
        <p className="text-muted-foreground text-lg">Enter your A-Level subjects to see which university degree paths are open to you.</p>
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
                    <Select value={sub} onChange={(e) => updateSubject(idx, e.target.value)}>
                      {POPULAR_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <button onClick={() => removeSubject(idx)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {subjects.length < 4 && (
              <button 
                onClick={addSubject}
                className="mt-4 w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-accent hover:border-accent flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={16} /> Add 4th Subject
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
                <p className="text-muted-foreground text-sm p-4">Add some standard subjects like Maths or Sciences to see paths open up.</p>
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
