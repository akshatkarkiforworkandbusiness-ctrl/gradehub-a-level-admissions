"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  A_LEVEL_POINTS, 
  AS_LEVEL_POINTS, 
  EPQ_POINTS, 
  IB_HL_POINTS, 
  IB_SL_POINTS,
  IB_TOK_EE_POINTS,
  BTEC_EXT_POINTS,
  BTEC_DIP_POINTS,
  BTEC_EXT_CERT_POINTS,
  T_LEVEL_POINTS
} from "@/lib/calculators";

const DIRECTORY = [
  ...Object.entries(A_LEVEL_POINTS).map(([grade, pts]) => ({ qual: "A-Level", grade, pts })),
  ...Object.entries(AS_LEVEL_POINTS).map(([grade, pts]) => ({ qual: "AS-Level", grade, pts })),
  ...Object.entries(EPQ_POINTS).map(([grade, pts]) => ({ qual: "EPQ (Extended Project)", grade, pts })),
  ...Object.entries(IB_HL_POINTS).map(([grade, pts]) => ({ qual: "IB Higher Level (HL)", grade, pts })),
  ...Object.entries(IB_SL_POINTS).map(([grade, pts]) => ({ qual: "IB Standard Level (SL)", grade, pts })),
  ...Object.entries(IB_TOK_EE_POINTS).map(([grade, pts]) => ({ qual: "IB Theory of Knowledge / EE", grade, pts })),
  ...Object.entries(BTEC_EXT_POINTS).map(([grade, pts]) => ({ qual: "BTEC Extended Diploma (180)", grade, pts })),
  ...Object.entries(BTEC_DIP_POINTS).map(([grade, pts]) => ({ qual: "BTEC Diploma (120)", grade, pts })),
  ...Object.entries(BTEC_EXT_CERT_POINTS).map(([grade, pts]) => ({ qual: "BTEC Extended Cert (60)", grade, pts })),
  ...Object.entries(T_LEVEL_POINTS).map(([grade, pts]) => ({ qual: "T-Level", grade, pts })),
];

export default function TariffSearch() {
  const [query, setQuery] = useState("");

  const results = DIRECTORY.filter(item => 
    item.qual.toLowerCase().includes(query.toLowerCase()) || 
    item.grade.toLowerCase().includes(query.toLowerCase()) ||
    item.pts.toString().includes(query)
  ).sort((a, b) => b.pts - a.pts);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
          Official UCAS 2026/2027 Database
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">UCAS Tariff Directory</h1>
        <p className="text-muted-foreground text-lg">Search the complete directory of official UK qualification grades and their exact UCAS point values.</p>
      </div>

      <div className="relative mb-8 max-w-xl flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by qualification, grade, or points..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11 h-12 text-base rounded-xl shadow-sm"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium text-muted-foreground">Qualification</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Grade</th>
              <th className="px-6 py-4 font-medium text-muted-foreground text-right">UCAS Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.map((res, i) => (
              <tr key={i} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{res.qual}</td>
                <td className="px-6 py-4 text-accent font-semibold">{res.grade}</td>
                <td className="px-6 py-4 text-right font-serif text-lg text-foreground">{res.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {results.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">No matching qualifications found.</div>
        )}
      </div>
    </main>
  );
}
