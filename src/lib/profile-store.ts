export type StudentLevel = 'AS-Level' | 'A2-Level';

export interface StudentProfile {
  studentName: string;
  level: StudentLevel;
  courseInterest: string; // e.g. "Computer Science", "Medicine", "Engineering", "Law", "Economics"
  targetCountries: string[]; // e.g. ["UK", "US", "Canada"]
  targetUniversities: string[];
  examTargetDate?: string;
}

export const DEFAULT_PROFILE: StudentProfile = {
  studentName: "A-Level Scholar",
  level: "A2-Level",
  courseInterest: "Computer Science",
  targetCountries: ["UK", "US"],
  targetUniversities: ["Imperial College London", "UCL", "Harvard University"],
  examTargetDate: "2026-05-15"
};

const STORAGE_KEY = "gradehub_student_profile";

export function getStoredProfile(): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return DEFAULT_PROFILE;
  try {
    return JSON.parse(saved);
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
