"use client";

import { useState, useEffect } from "react";
import { Award, BookOpen, CheckCircle2, Copy, Sparkles, Layers, Target, AlertCircle, TrendingUp, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { evaluateActivity, getRecommendationsForCourse, CourseRecommendation } from "@/lib/activity-ai-evaluator";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";

interface Activity {
  id: string;
  type: string;
  role: string;
  organization: string;
  description: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
}

const TIER_DESCRIPTIONS = {
  'Tier 1': { name: "National / International Recognition", desc: "Rare accomplishments (e.g. National Olympiad Winner, Published Research First Author).", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  'Tier 2': { name: "State / Regional Leadership", desc: "High achievement & leadership (e.g. Head Student, Regional Sports Captain, Founded Registered NGO).", color: "text-blue-600 bg-blue-600/10 border-blue-600/20" },
  'Tier 3': { name: "School / Community Leadership", desc: "Active school leadership (e.g. Club President, Peer Tutor, Debate Team Lead).", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  'Tier 4': { name: "General Participation", desc: "Membership & hobbies (e.g. Club Member, Volunteer, Musical Instrument Learner).", color: "text-slate-600 bg-slate-500/10 border-slate-500/20" }
};

export default function ExtracurricularGuide() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "Academic / Research",
      role: "Lead Student Researcher",
      organization: "School Physics Olympiad Club",
      description: "Spearheaded 12-member research team on quantum optics; published paper in regional youth science journal & won 1st place in National Physics Olympiad.",
      tier: "Tier 1"
    },
    {
      id: "2",
      type: "Community Service",
      role: "Founder & Director",
      organization: "STEM Outreach Initiative",
      description: "Organized weekly peer tutoring sessions for 80+ underprivileged middle school students; raised $2,500 for local science kits.",
      tier: "Tier 2"
    }
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const updateActivity = (id: string, field: keyof Activity, value: string) => {
    setActivities(activities.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const addActivity = () => {
    if (activities.length < 10) {
      setActivities([
        ...activities,
        {
          id: Date.now().toString(),
          type: "Leadership / Club",
          role: "President",
          organization: "Student Club",
          description: "Organized school-wide events...",
          tier: "Tier 3"
        }
      ]);
    }
  };

  const copyCommonAppFormat = (activity: Activity) => {
    const text = `Position/Role: ${activity.role}\nOrganization: ${activity.organization}\nDescription (150 chars max): ${activity.description}`;
    navigator.clipboard.writeText(text);
    setCopiedId(activity.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const recommendations = getRecommendationsForCourse(profile.courseInterest);

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award size={14} /> AI Activity Evaluator & Recommender
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Extracurriculars & AI Advisor</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Get instant AI strength scores (0-100) and actionable improvement feedback for your activities. Personalized for <strong>{profile.courseInterest}</strong> majors.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Activity Builder + AI Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          {activities.map((act, index) => {
            const charCount = act.description.length;
            const isOverLimit = charCount > 150;
            const evaluation = evaluateActivity(act.role, act.organization, act.description, act.tier);

            return (
              <Card key={act.id} className="p-6 border-border shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-base text-foreground">Activity #{index + 1}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-600/10 text-blue-600 border border-blue-600/20 flex items-center gap-1">
                      <Sparkles size={12} /> Score: {evaluation.score}/100
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                    <Select value={act.type} onChange={e => updateActivity(act.id, "type", e.target.value)}>
                      <option value="Academic / Research">Academic / Research</option>
                      <option value="Community Service">Community Service</option>
                      <option value="Leadership / Student Govt">Leadership / Student Govt</option>
                      <option value="Athletics / Sports">Athletics / Sports</option>
                      <option value="Arts / Music / Theater">Arts / Music / Theater</option>
                      <option value="Internship / Work Experience">Internship / Work Experience</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Tier Level</label>
                    <Select value={act.tier} onChange={e => updateActivity(act.id, "tier", e.target.value)}>
                      <option value="Tier 1">Tier 1 (National/International)</option>
                      <option value="Tier 2">Tier 2 (Regional/State Leadership)</option>
                      <option value="Tier 3">Tier 3 (School/Club Officer)</option>
                      <option value="Tier 4">Tier 4 (General Participation)</option>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Position / Role Title (50 chars max)</label>
                    <Input value={act.role} onChange={e => updateActivity(act.id, "role", e.target.value)} placeholder="e.g. Lead Student Researcher" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Organization / School (100 chars max)</label>
                    <Input value={act.organization} onChange={e => updateActivity(act.id, "organization", e.target.value)} placeholder="e.g. School Physics Olympiad Club" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Common App Activity Description (150 chars max)
                    </label>
                    <span className={`text-xs font-bold ${isOverLimit ? 'text-red-500' : 'text-slate-500'}`}>
                      {charCount} / 150
                    </span>
                  </div>
                  <textarea
                    value={act.description}
                    onChange={e => updateActivity(act.id, "description", e.target.value)}
                    rows={2}
                    placeholder="Action verb + role + quantitative impact..."
                    className="w-full p-3 rounded-xl border border-border bg-background text-sm leading-normal focus:ring-2 focus:ring-blue-600 focus:outline-none text-foreground"
                  />
                  {isOverLimit && (
                    <p className="text-xs text-red-500 mt-1 font-medium">Exceeds Common App limit! Trim by {charCount - 150} characters.</p>
                  )}
                </div>

                {/* AI Diagnostic Suggestions Box */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2 text-xs">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-blue-600" /> AI Diagnostic Feedback & Improvements:
                  </div>
                  
                  {evaluation.improvements.length > 0 && (
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {evaluation.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-amber-600 font-medium">
                          <AlertCircle size={12} className="shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {evaluation.strengths.length > 0 && (
                    <ul className="space-y-1 text-emerald-600 font-medium pt-1">
                      {evaluation.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => copyCommonAppFormat(act)}
                    className="px-3 py-1.5 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    {copiedId === act.id ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copiedId === act.id ? "Copied!" : "Copy Common App Format"}
                  </button>
                </div>
              </Card>
            );
          })}

          {activities.length < 10 && (
            <button
              onClick={addActivity}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              + Add Activity ({activities.length} / 10)
            </button>
          )}
        </div>

        {/* Right Column: Recommended Activities for Student's Course */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Lightbulb size={18} className="text-blue-600" /> Tailored for {profile.courseInterest}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recommended super-curricular & extracurricular activities to make your application stand out for top university admissions:
            </p>

            <div className="space-y-3 pt-2">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-border bg-muted/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{rec.title}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600/10 text-blue-600 border border-blue-600/20">{rec.impactLevel}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">{rec.category}</div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
