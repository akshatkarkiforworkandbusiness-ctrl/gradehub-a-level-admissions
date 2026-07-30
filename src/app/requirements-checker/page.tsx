"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExternalLink, Globe, Search, Loader2, Info } from "lucide-react";

const UK_UNIVERSITIES = [
  { name: "University of Oxford", offer: "A*A*A", pts: 160, acceptsTariff: false, url: "https://ox.ac.uk" },
  { name: "University of Cambridge", offer: "A*A*A", pts: 160, acceptsTariff: false, url: "https://cam.ac.uk" },
  { name: "Imperial College London", offer: "A*AA", pts: 152, acceptsTariff: false, url: "https://imperial.ac.uk" },
  { name: "UCL (University College London)", offer: "AAA", pts: 144, acceptsTariff: false, url: "https://ucl.ac.uk" },
  { name: "University of Edinburgh", offer: "AAA", pts: 144, acceptsTariff: true, url: "https://ed.ac.uk" },
  { name: "King's College London", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://kcl.ac.uk" },
  { name: "University of Manchester", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://manchester.ac.uk" },
  { name: "University of Warwick", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://warwick.ac.uk" },
  { name: "University of Bristol", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://bristol.ac.uk" },
  { name: "University of Nottingham", offer: "ABB", pts: 128, acceptsTariff: true, url: "https://nottingham.ac.uk" },
  { name: "University of Leeds", offer: "ABB", pts: 128, acceptsTariff: true, url: "https://leeds.ac.uk" },
  { name: "Cardiff University", offer: "BBB", pts: 120, acceptsTariff: true, url: "https://cardiff.ac.uk" },
  { name: "University of Exeter", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://exeter.ac.uk" },
  { name: "University of Southampton", offer: "AAB", pts: 136, acceptsTariff: true, url: "https://southampton.ac.uk" },
  { name: "University of Birmingham", offer: "AAA", pts: 144, acceptsTariff: true, url: "https://birmingham.ac.uk" },
];

const US_UNIVERSITIES = [
  { name: "Ivy League & Elite (Harvard, MIT, Stanford, Yale)", gpa: 3.9, url: "https://commonapp.org" },
  { name: "Top Tier Publics (UCLA, UC Berkeley, UMich)", gpa: 3.7, url: "https://commonapp.org" },
  { name: "Highly Competitive State Schools (UIUC, UNC, UW)", gpa: 3.5, url: "https://commonapp.org" },
  { name: "Standard State Universities & Colleges", gpa: 3.0, url: "https://commonapp.org" },
];

const POPULAR_DESTINATIONS = [
  "Canada", "Germany", "Netherlands", "Australia", "New Zealand", 
  "Singapore", "Ireland", "Hong Kong", "United Arab Emirates", 
  "Malaysia", "France", "Spain", "Italy", "Sweden"
];

type Region = "UK" | "US" | "Global Explorer";

interface ApiUniversity {
  name: string;
  web_pages: string[];
  country: string;
}

function RequirementsContent() {
  const searchParams = useSearchParams();
  const initialGpa = searchParams.get("gpa");
  
  const [activeRegion, setActiveRegion] = useState<Region>(initialGpa ? "US" : "UK");
  const [ucasPts, setUcasPts] = useState("136");
  const [gpa, setGpa] = useState(initialGpa || "3.5");

  // Global Explorer State
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState<ApiUniversity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pts = parseInt(ucasPts) || 0;
  const gpaNum = parseFloat(gpa) || 0;

  useEffect(() => {
    if (activeRegion !== "Global Explorer") return;

    let isMounted = true;
    setLoading(true);
    setError("");

    // Secure HTTPS endpoint
    fetch(`https://universities.hipolabs.com/search?country=${encodeURIComponent(selectedCountry)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch universities");
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          // Remove exact duplicates
          const unique = Array.from(new Set(data.map((u: ApiUniversity) => u.name)))
            .map(name => data.find((u: ApiUniversity) => u.name === name));
          setUniversities(unique);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [activeRegion, selectedCountry]);

  const filteredUniversities = universities.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
        {(["UK", "US", "Global Explorer"] as Region[]).map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeRegion === region 
                ? "bg-accent text-accent-foreground shadow-sm" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {region === "UK" && "UK Universities"}
            {region === "US" && "US Universities (GPA)"}
            {region === "Global Explorer" && "Global Explorer (All Countries)"}
          </button>
        ))}
      </div>

      <div className="mb-8 max-w-sm">
        {activeRegion === "UK" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Total UCAS Points</label>
            <Input type="number" value={ucasPts} onChange={(e) => setUcasPts(e.target.value)} className="text-lg font-bold" />
          </div>
        )}
        {activeRegion === "US" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Unweighted GPA</label>
            <Input type="number" step="0.1" value={gpa} onChange={(e) => setGpa(e.target.value)} className="text-lg font-bold" />
          </div>
        )}
      </div>

      <div className="space-y-8">
        {activeRegion === "UK" && (
          <>
            <div className="bg-muted p-4 rounded-xl border border-border flex items-start gap-3 text-xs text-muted-foreground mb-6">
              <Info size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Official Entry Guidance:</strong> Highly selective UK universities (e.g. Oxford, Cambridge, Imperial, UCL) demand <em>exact grade profiles</em> (e.g. A*A*A) rather than total UCAS tariff points alone.
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-ink-navy">Likely Eligible (Meets Typical Offer Points)</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {UK_UNIVERSITIES.filter(u => pts >= u.pts).map(u => (
                  <Card key={u.name} className="p-5 border-border hover:border-ink-navy transition-colors">
                    <h4 className="font-semibold text-foreground mb-1">{u.name}</h4>
                    <div className="text-xs text-muted-foreground mb-1">Typical Offer: <strong className="text-foreground">{u.offer}</strong> ({u.pts} pts)</div>
                    <div className="text-[10px] text-muted-foreground mb-3">
                      {u.acceptsTariff ? "Accepts UCAS Tariff Points" : "Requires Exact Grade Profile"}
                    </div>
                    <a href={u.url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1">
                      Visit Official Site <ExternalLink size={12} />
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="font-semibold text-lg mb-4 text-muted-foreground">Aspirational (Below Typical Offer Points)</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 opacity-75">
                {UK_UNIVERSITIES.filter(u => pts < u.pts).map(u => (
                  <Card key={u.name} className="p-5 bg-muted/50 border-border shadow-none">
                    <h4 className="font-medium text-foreground mb-1">{u.name}</h4>
                    <div className="text-xs text-ink-red-text">Requires {u.offer} ({u.pts} pts)</div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeRegion === "US" && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Target US Universities by GPA</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {US_UNIVERSITIES.map(u => (
                <Card key={u.name} className={`p-5 ${gpaNum >= u.gpa ? "border-border hover:border-ink-navy transition-colors" : "opacity-75 bg-bg-page border-border"}`}>
                  <h4 className="font-semibold text-foreground mb-1">{u.name}</h4>
                  <div className={`text-xs mb-3 font-medium ${gpaNum >= u.gpa ? "text-ink-navy" : "text-ink-red-text"}`}>
                    Typical minimum GPA: {u.gpa.toFixed(1)}
                  </div>
                  <a href={u.url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1">
                    Apply via CommonApp <ExternalLink size={12} />
                  </a>
                </Card>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">US Universities evaluate applications holistically (GPA, SAT/ACT, essays, and extracurriculars).</p>
          </div>
        )}

        {activeRegion === "Global Explorer" && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Official Global Database:</strong> Browse accredited universities across all major international study destinations. Check course-specific entry requirements directly on official university web pages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Select Country</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {POPULAR_DESTINATIONS.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="flex-[2]">
                <label className="block text-sm font-medium text-foreground mb-2">Search University</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder={`Search within ${selectedCountry}...`} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="animate-spin mb-4" size={32} />
                  <p>Fetching universities for {selectedCountry}...</p>
                </div>
              ) : error ? (
                <div className="text-ink-red-text py-8 text-center bg-bg-surface rounded-xl border border-ink-red text-sm">
                  Failed to load universities: {error}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-semibold text-lg">Universities in {selectedCountry}</h3>
                    <span className="text-sm text-muted-foreground">{filteredUniversities.length} found</span>
                  </div>
                  
                  {filteredUniversities.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                      No universities found matching "{searchQuery}" in {selectedCountry}.
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredUniversities.map(u => (
                        <Card key={u.name} className="p-5 flex flex-col hover:border-accent transition-colors">
                          <h4 className="font-medium text-foreground mb-3 text-sm line-clamp-2" title={u.name}>{u.name}</h4>
                          <a href={u.web_pages[0]} target="_blank" rel="noreferrer" className="mt-auto text-xs text-accent hover:underline flex items-center gap-1 w-fit">
                            Check Course Requirements <ExternalLink size={12} />
                          </a>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function RequirementsChecker() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 flex items-center gap-3">
          <Globe className="text-accent" size={36} /> Global Matcher
        </h1>
        <p className="text-muted-foreground text-lg">Check your eligibility and search admission requirements globally.</p>
      </div>

      <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading options...</div>}>
        <RequirementsContent />
      </Suspense>
    </main>
  );
}
