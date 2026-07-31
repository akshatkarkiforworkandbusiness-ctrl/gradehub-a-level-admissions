"use client";

import { useState, useEffect } from "react";
import { BookmarkPlus, Plus, Trash2, CheckCircle2, AlertCircle, Building2, ExternalLink, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStoredProfile, saveStoredProfile, StudentProfile, UniversityItem } from "@/lib/profile-store";
import { calculateTotalUcasPoints } from "@/lib/calculators";
import { UNIFIED_UNIVERSITY_DATASET, UniversityRecord } from "@/lib/university-data";

export default function UniversityDraftlist() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [userPoints, setUserPoints] = useState<number>(144);
  const [draftlist, setDraftlist] = useState<UniversityItem[]>([]);

  // Form State
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [customName, setCustomName] = useState("");
  const [customCountry, setCustomCountry] = useState("UK");
  const [customOffer, setCustomOffer] = useState("AAB");
  const [customPoints, setCustomPoints] = useState(136);

  useEffect(() => {
    const p = getStoredProfile();
    setProfile(p);
    const calculated = calculateTotalUcasPoints(p.entries || []);
    setUserPoints(calculated > 0 ? calculated : 144);
    setDraftlist(p.draftlist || []);
  }, []);

  const updateDraftlistInProfile = (newList: UniversityItem[]) => {
    setDraftlist(newList);
    saveStoredProfile({ ...profile, draftlist: newList });
  };

  const determineCategory = (reqPts: number, myPts: number): 'Reach' | 'Match' | 'Safety' => {
    const diff = myPts - reqPts;
    if (diff >= 8) return 'Safety';
    if (diff >= -8) return 'Match';
    return 'Reach';
  };

  const addPresetUniversity = (name: string) => {
    const uni = UNIFIED_UNIVERSITY_DATASET.find(u => u.name === name);
    if (!uni) return;
    const cat = determineCategory(uni.ucasPoints, userPoints);
    const item: UniversityItem = {
      id: Date.now().toString(),
      name: uni.name,
      country: uni.country,
      requiredOffer: uni.typicalOffer,
      requiredPoints: uni.ucasPoints,
      myPoints: userPoints,
      category: cat,
      notes: uni.notes || `Requirement: ${uni.typicalOffer}`,
      requiresAdmissionsTest: uni.requiresAdmissionsTest,
      requiresInterview: uni.requiresInterview
    };
    updateDraftlistInProfile([...draftlist, item]);
  };

  const removeUniversity = (id: string) => {
    updateDraftlistInProfile(draftlist.filter(u => u.id !== id));
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookmarkPlus size={14} /> University Shortlist Manager
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">University Draftlist</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Shortlist target universities and categorize them into <strong>Reach</strong>, <strong>Match</strong>, and <strong>Safety</strong> tiers based on your saved profile grades.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Preset Selector */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground border-b border-border pb-3 flex items-center gap-2">
              <Plus size={18} className="text-blue-600" /> Add from Verified Dataset
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-muted-foreground">Select Preset University</label>
              <Select 
                value={selectedPreset} 
                onChange={(e) => {
                  setSelectedPreset(e.target.value);
                  if (e.target.value) {
                    addPresetUniversity(e.target.value);
                    setSelectedPreset("");
                  }
                }}
              >
                <option value="">-- Choose University --</option>
                {UNIFIED_UNIVERSITY_DATASET.map(u => (
                  <option key={u.name} value={u.name}>{u.name} ({u.typicalOffer})</option>
                ))}
              </Select>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Shortlist Grid */}
        <div className="lg:col-span-2 space-y-4">
          {draftlist.length === 0 ? (
            <Card className="p-12 border-border text-center text-muted-foreground">
              No universities shortlisted yet. Select a university from the left panel to build your draftlist.
            </Card>
          ) : (
            <div className="space-y-4">
              {draftlist.map(uni => (
                <Card key={uni.id} className="p-6 border-border shadow-md space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted uppercase text-muted-foreground">{uni.country}</span>
                      <h3 className="font-bold text-lg text-foreground mt-1">{uni.name}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        uni.category === 'Reach' 
                          ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                          : uni.category === 'Match' 
                          ? 'bg-blue-600/10 text-blue-600 border-blue-600/20' 
                          : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      }`}>
                        {uni.category}
                      </span>
                      <button onClick={() => removeUniversity(uni.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1">
                    <span>Typical Offer: <strong className="text-foreground">{uni.requiredOffer}</strong></span>
                    <span>UCAS Points: <strong className="text-foreground">{uni.requiredPoints} pts</strong></span>
                    {uni.requiresAdmissionsTest && (
                      <span className="text-amber-600 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">⚡ Requires Admissions Test</span>
                    )}
                  </div>

                  {uni.notes && (
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-muted/40 p-3 rounded-lg border border-border">
                      {uni.notes}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
