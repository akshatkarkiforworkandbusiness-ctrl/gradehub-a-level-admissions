"use client";

import { useState, useEffect } from "react";
import { Search, ExternalLink, CheckCircle2, AlertCircle, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { UNIFIED_UNIVERSITY_DATASET, UniversityRecord } from "@/lib/university-data";
import { getStoredProfile } from "@/lib/profile-store";
import { calculateTotalUcasPoints } from "@/lib/calculators";

export default function RequirementsChecker() {
  const [userPoints, setUserPoints] = useState<number>(144);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");

  useEffect(() => {
    const p = getStoredProfile();
    const pts = calculateTotalUcasPoints(p.entries || []);
    setUserPoints(pts > 0 ? pts : 144);
  }, []);

  const filteredUnis = UNIFIED_UNIVERSITY_DATASET.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === "All" || u.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Building2 size={14} /> Entry Requirements Matrix
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">University Requirements Checker</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Search verified entry requirements, required admissions tests, and typical grade offers across UK and international universities.</p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <Input
          placeholder="Search university name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />

        <Select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="w-48">
          <option value="All">All Countries</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="Australia">Australia</option>
          <option value="Singapore">Singapore</option>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredUnis.map(uni => {
          const met = userPoints >= uni.ucasPoints;
          return (
            <Card key={uni.name} className="p-6 border-border shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted uppercase text-muted-foreground">{uni.country}</span>
                  <h3 className="font-bold text-lg text-foreground mt-1">{uni.name}</h3>
                </div>

                <a
                  href={uni.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Official Site <ExternalLink size={12} />
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                <span>Typical Grade Offer: <strong className="text-foreground">{uni.typicalOffer}</strong></span>
                <span>UCAS Tariff Equivalent: <strong className="text-foreground">{uni.ucasPoints} pts</strong></span>
                {uni.requiresAdmissionsTest && (
                  <span className="text-amber-600 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">⚡ Requires Admissions Test (MAT/STEP/UCAT)</span>
                )}
                {uni.requiresInterview && (
                  <span className="text-purple-600 font-semibold bg-purple-500/10 px-2 py-0.5 rounded">🎤 Requires Interview</span>
                )}
              </div>

              {uni.notes && (
                <p className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border">
                  {uni.notes}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </main>
  );
}
