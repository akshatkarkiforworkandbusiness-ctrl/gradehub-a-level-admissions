"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, Sparkles } from "lucide-react";
import { CreditType, detectSubjectCredit, QualificationType } from "@/lib/calculators";

const ALL_SUBJECTS = [
  "Accounting", "Afrikaans", "Agriculture", "Ancient History", "Applied ICT", 
  "Arabic", "Archaeology", "Architecture", "Art and Design", "Bengali", 
  "Biblical Hebrew", "Biology", "Business Studies", "Chemistry", 
  "Chinese (Mandarin)", "Classical Civilisation", "Classical Greek", 
  "Classical Studies", "Computer Science", "Criminology", "Dance", 
  "Design and Technology", "Digital Media", "Divinity", "Drama and Theatre Studies", 
  "Economics", "Electronics", "Engineering", "English General Paper", 
  "English Language", "English Language and Literature", "English Literature", 
  "Environmental Science", "Extended Project Qualification (EPQ)", "Film Studies", "Food Preparation and Nutrition", 
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

interface SubjectSearchComboboxProps {
  value: string;
  type?: QualificationType;
  creditType?: CreditType;
  onChange: (subject: string, detectedType?: QualificationType, detectedCredit?: CreditType) => void;
  onCreditToggle?: (creditType: CreditType) => void;
}

export function SubjectSearchCombobox({
  value,
  type = "A-Level",
  creditType = "Full Credit",
  onChange,
  onCreditToggle
}: SubjectSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchQuery(text);
    setIsOpen(true);

    const detected = detectSubjectCredit(text, type);
    onChange(detected.cleanSubject, detected.detectedType, detected.creditType);
  };

  const handleSelectSubject = (subject: string, selectedCredit: CreditType = creditType) => {
    setSearchQuery(subject);
    setIsOpen(false);
    
    // Automatic credit determination
    const isEpq = subject.toLowerCase().includes("epq") || subject.toLowerCase().includes("extended project");
    const finalCredit = isEpq ? "Half Credit" : selectedCredit;
    const finalType = isEpq ? "EPQ" : (finalCredit === "Half Credit" ? "AS-Level" : "A-Level");
    
    onChange(subject, finalType, finalCredit);
  };

  const filteredSubjects = ALL_SUBJECTS.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search A-Level / AS subject..."
          className="w-full h-11 pl-9 pr-24 rounded-xl border border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        
        {/* Instant Credit Badge / Toggle inside input */}
        <div className="absolute right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const newCredit = creditType === "Full Credit" ? "Half Credit" : "Full Credit";
              if (onCreditToggle) {
                onCreditToggle(newCredit);
              } else {
                const newType = newCredit === "Half Credit" ? "AS-Level" : "A-Level";
                onChange(searchQuery, newType, newCredit);
              }
            }}
            title="Click to toggle between Full Credit (1.0) and Half Credit (0.5)"
            className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              creditType === "Full Credit" 
                ? "bg-blue-600/10 text-blue-600 border border-blue-600/20 hover:bg-blue-600/20" 
                : "bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500/20"
            }`}
          >
            <Sparkles size={10} />
            {creditType === "Full Credit" ? "Full Credit (1.0)" : "Half Credit (0.5)"}
          </button>
          <ChevronDown className="w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-card border border-border rounded-xl shadow-xl py-1 text-sm">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((sub) => {
              const isSelected = sub === value;
              const isEpq = sub.toLowerCase().includes("epq");
              
              return (
                <div
                  key={sub}
                  onClick={() => handleSelectSubject(sub)}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-accent/10 transition-colors ${
                    isSelected ? "bg-accent/15 font-semibold text-accent" : "text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected && <Check size={14} className="text-accent" />}
                    <span>{sub}</span>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isEpq 
                      ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                      : "bg-blue-600/10 text-blue-600 border border-blue-600/20"
                  }`}>
                    {isEpq ? "Half Credit (EPQ)" : "Full / AS Available"}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-3 text-muted-foreground text-xs">
              No matching subjects found. Press enter to use "{searchQuery}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}
