import { QualificationEntry } from "./calculators";

export type StudentLevel = 'AS-Level' | 'A2-Level';

export interface UniversityItem {
  id: string;
  name: string;
  country: string;
  requiredOffer: string;
  requiredPoints: number;
  myPoints: number;
  category: 'Reach' | 'Match' | 'Safety';
  notes: string;
  requiresAdmissionsTest?: boolean;
  requiresInterview?: boolean;
}

export interface StudentProfile {
  studentName: string;
  level: StudentLevel;
  courseInterest: string;
  targetCountries: string[];
  targetUniversities: string[];
  examTargetDate?: string;
  entries: QualificationEntry[];
  draftlist: UniversityItem[];
}

export const DEFAULT_PROFILE: StudentProfile = {
  studentName: "A-Level Scholar",
  level: "A2-Level",
  courseInterest: "Computer Science",
  targetCountries: ["UK", "US"],
  targetUniversities: ["Imperial College London", "UCL"],
  examTargetDate: "2026-05-15",
  entries: [
    { id: "1", type: "A-Level", subject: "Mathematics", grade: "A*", creditType: "Full Credit" },
    { id: "2", type: "A-Level", subject: "Physics", grade: "A", creditType: "Full Credit" },
    { id: "3", type: "A-Level", subject: "Chemistry", grade: "B", creditType: "Full Credit" }
  ],
  draftlist: [
    { id: "1", name: "Imperial College London", country: "UK", requiredOffer: "A*AA", requiredPoints: 152, myPoints: 144, category: "Reach", notes: "Requires MAT admissions exam.", requiresAdmissionsTest: true },
    { id: "2", name: "UCL (University College London)", country: "UK", requiredOffer: "AAA", requiredPoints: 144, myPoints: 144, category: "Match", notes: "Grade aligned match.", requiresAdmissionsTest: false },
    { id: "3", name: "University of Nottingham", country: "UK", requiredOffer: "ABB", requiredPoints: 128, myPoints: 144, category: "Safety", notes: "High probability safety option.", requiresAdmissionsTest: false }
  ]
};

const STORAGE_KEY = "gradehub_student_profile";

export function getStoredProfile(): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return DEFAULT_PROFILE;
  try {
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      entries: parsed.entries || DEFAULT_PROFILE.entries,
      draftlist: parsed.draftlist || DEFAULT_PROFILE.draftlist
    };
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
