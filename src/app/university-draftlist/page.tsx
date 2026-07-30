"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Building2, ExternalLink, ShieldAlert, CheckCircle2, BookmarkPlus, Sparkles, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Link from "next/link";

interface UniversityItem {
  id: string;
  name: string;
  country: string;
  requiredOffer: string; // e.g. A*AA or 152
  requiredPoints: number;
  myPoints: number;
  category: 'Reach' | 'Match' | 'Safety';
  notes: string;
}

const PRESET_UNIVERSITIES = [
  { name: "University of Oxford", country: "UK", offer: "A*A*A", pts: 160 },
  { name: "University of Cambridge", country: "UK", offer: "A*A*A", pts: 160 },
  { name: "Imperial College London", country: "UK", offer: "A*AA", pts: 152 },
  { name: "Harvard University", country: "US", offer: "4.0 GPA / A*A*A*", pts: 168 },
  { name: "University of Toronto", country: "Canada", offer: "AAA (90%+)", pts: 144 },
  { name: "UCL (University College London)", country: "UK", offer: "AAA", pts: 144 },
  { name: "University of Edinburgh", country: "UK", offer: "AAA", pts: 144 },
  { name: "King's College London", country: "UK", offer: "AAB", pts: 136 },
  { name: "University of Manchester", offer: "AAB", country: "UK", pts: 136 },
  { name: "University of Melbourne", country: "Australia", offer: "AAB (89+ ATAR)", pts: 136 },
  { name: "University of Nottingham", country: "UK", offer: "ABB", pts: 128 },
  { name: "Cardiff University", country: "UK", offer: "BBB", pts: 120 },
];

export default function UniversityDraftlist() {
  const [studentPoints, setStudentPoints] = useState<string>("144");
  const [draftlist, setDraftlist] = useState<UniversityItem[]>([]);

  // Form State
  const [customName, setCustomName] = useState("");
  const [customCountry, setCustomCountry] = useState("UK");
  const [customOffer, setCustomOffer] = useState("AAB");
  const [customPts, setCustomPts] = useState("136");
  const [customNotes, setCustomNotes] = useState("");

  const ptsNum = parseInt(studentPoints) || 0;

  // Load saved draftlist from local storage
  useEffect(() => {
    const saved = localStorage.getItem("gradehub_university_draftlist");
    if (saved) {
      try {
        setDraftlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draftlist", e);
      }
    } else {
      // Default demo list
      setDraftlist([
        { id: "1", name: "Imperial College London", country: "UK", requiredOffer: "A*AA", requiredPoints: 152, myPoints: 144, category: "Reach", notes: "Dream choice for Computer Science." },
        { id: "2", name: "UCL (University College London)", country: "UK", requiredOffer: "AAA", requiredPoints: 144, myPoints: 144, category: "Match", notes: "Solid target alignment." },
        { id: "3", name: "University of Nottingham", country: "UK", requiredOffer: "ABB", requiredPoints: 128, myPoints: 144, category: "Safety", notes: "High probability safety option." }
      ]);
    }
  }, []);

  // Save changes to local storage
  useEffect(() => {
    if (draftlist.length > 0) {
      localStorage.setItem("gradehub_university_draftlist", JSON.stringify(draftlist));
    }
  }, [draftlist]);

  const categorizeTier = (reqPts: number, userPts: number): 'Reach' | 'Match' | 'Safety' => {
    const diff = userPts - reqPts;
    if (diff < -8) return 'Reach';
    if (diff >= 8) return 'Safety';
    return 'Match';
  };

  const addPreset = (preset: typeof PRESET_UNIVERSITIES[0]) => {
    const cat = categorizeTier(preset.pts, ptsNum);
    const newItem: UniversityItem = {
      id: Date.now().toString(),
      name: preset.name,
      country: preset.country,
      requiredOffer: preset.offer,
      requiredPoints: preset.pts,
      myPoints: ptsNum,
      category: cat,
      notes: `Preset added (${preset.country})`
    };
    setDraftlist([...draftlist, newItem]);
  };

  const addCustom = () => {
    if (!customName.trim()) return;
    const reqPts = parseInt(customPts) || 120;
    const cat = categorizeTier(reqPts, ptsNum);
    const newItem: UniversityItem = {
      id: Date.now().toString(),
      name: customName,
      country: customCountry,
      requiredOffer: customOffer,
      requiredPoints: reqPts,
      myPoints: ptsNum,
      category: cat,
      notes: customNotes || "Custom university choice"
    };
    setDraftlist([...draftlist, newItem]);
    setCustomName("");
    setCustomNotes("");
  };

  const removeItem = (id: string) => {
    const updated = draftlist.filter(item => item.id !== id);
    setDraftlist(updated);
    localStorage.setItem("gradehub_university_draftlist", JSON.stringify(updated));
  };

  const reachItems = draftlist.filter(i => i.category === 'Reach');
  const matchItems = draftlist.filter(i => i.category === 'Match');
  const safetyItems = draftlist.filter(i => i.category === 'Safety');

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookmarkPlus size={14} /> College Application Shortlist Manager
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">University Draftlist Builder</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Organize your post-results university applications into Reach, Match, and Safety categories. Modeled after Common App college list tools.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Grade input & Add Form */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md">
            <h3 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600" /> Your Academic Standing
            </h3>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Your Total UCAS Points / Profile</label>
            <Input 
              type="number" 
              value={studentPoints} 
              onChange={e => setStudentPoints(e.target.value)} 
              className="text-xl font-bold font-serif mb-3 text-blue-600"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Updating your points dynamically recalculates whether your saved universities are <strong>Reach</strong>, <strong>Match</strong>, or <strong>Safety</strong> choices.
            </p>
          </Card>

          <Card className="p-6 border-border shadow-md">
            <h3 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
              <Building2 size={18} className="text-blue-600" /> Add Custom University
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">University Name</label>
                <Input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="e.g. King's College London" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Country</label>
                  <Select value={customCountry} onChange={e => setCustomCountry(e.target.value)}>
                    <option value="UK">UK</option>
                    <option value="US">US</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Europe">Europe</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Grade Offer</label>
                  <Input value={customOffer} onChange={e => setCustomOffer(e.target.value)} placeholder="e.g. AAB" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Offer UCAS Points Equivalent</label>
                <Input type="number" value={customPts} onChange={e => setCustomPts(e.target.value)} placeholder="136" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Personal Notes</label>
                <Input value={customNotes} onChange={e => setCustomNotes(e.target.value)} placeholder="e.g. Requires MAT exam" />
              </div>
              <button 
                onClick={addCustom}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add to Draftlist
              </button>
            </div>
          </Card>

          {/* Presets */}
          <Card className="p-6 border-border shadow-md">
            <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Quick Presets</h3>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {PRESET_UNIVERSITIES.map(p => (
                <button
                  key={p.name}
                  onClick={() => addPreset(p)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-border hover:border-blue-600 hover:text-blue-600 transition-colors text-left bg-muted/40 flex items-center gap-1.5"
                >
                  <Plus size={12} /> {p.name} ({p.offer})
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Draftlist Columns (Reach, Match, Safety) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Metric Strip */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Reach ({reachItems.length})</div>
              <div className="text-sm text-muted-foreground mt-1">High Dream Target</div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Match ({matchItems.length})</div>
              <div className="text-sm text-muted-foreground mt-1">Grade Aligned</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Safety ({safetyItems.length})</div>
              <div className="text-sm text-muted-foreground mt-1">High Probability</div>
            </div>
          </div>

          {/* Draftlist Tiers */}
          <div className="space-y-6">
            {/* Reach Section */}
            <div>
              <h2 className="text-lg font-serif font-bold mb-3 flex items-center gap-2 text-amber-600">
                <ShieldAlert size={20} /> Reach Colleges ({reachItems.length})
              </h2>
              <div className="space-y-3">
                {reachItems.map(item => (
                  <Card key={item.id} className="p-4 border-l-4 border-l-amber-500 border-border hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold text-muted-foreground">{item.country}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Typical Offer: <strong className="text-foreground">{item.requiredOffer}</strong> ({item.requiredPoints} pts)
                      </div>
                      <p className="text-xs italic text-muted-foreground mt-1">{item.notes}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </Card>
                ))}
                {reachItems.length === 0 && (
                  <div className="p-4 text-xs text-muted-foreground border border-dashed border-border rounded-xl text-center">No Reach universities added yet.</div>
                )}
              </div>
            </div>

            {/* Match Section */}
            <div>
              <h2 className="text-lg font-serif font-bold mb-3 flex items-center gap-2 text-blue-600">
                <CheckCircle2 size={20} /> Match Colleges ({matchItems.length})
              </h2>
              <div className="space-y-3">
                {matchItems.map(item => (
                  <Card key={item.id} className="p-4 border-l-4 border-l-blue-600 border-border hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold text-muted-foreground">{item.country}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Typical Offer: <strong className="text-foreground">{item.requiredOffer}</strong> ({item.requiredPoints} pts)
                      </div>
                      <p className="text-xs italic text-muted-foreground mt-1">{item.notes}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </Card>
                ))}
                {matchItems.length === 0 && (
                  <div className="p-4 text-xs text-muted-foreground border border-dashed border-border rounded-xl text-center">No Match universities added yet.</div>
                )}
              </div>
            </div>

            {/* Safety Section */}
            <div>
              <h2 className="text-lg font-serif font-bold mb-3 flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={20} /> Safety Colleges ({safetyItems.length})
              </h2>
              <div className="space-y-3">
                {safetyItems.map(item => (
                  <Card key={item.id} className="p-4 border-l-4 border-l-emerald-500 border-border hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold text-muted-foreground">{item.country}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Typical Offer: <strong className="text-foreground">{item.requiredOffer}</strong> ({item.requiredPoints} pts)
                      </div>
                      <p className="text-xs italic text-muted-foreground mt-1">{item.notes}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </Card>
                ))}
                {safetyItems.length === 0 && (
                  <div className="p-4 text-xs text-muted-foreground border border-dashed border-border rounded-xl text-center">No Safety universities added yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
