export type Grade = 'A*' | 'A' | 'B' | 'C' | 'D' | 'E' | 'U';
export type IBGrade = '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type BTECExtGrade = 'D*D*D*' | 'D*D*D' | 'D*DD' | 'DDD' | 'DDM' | 'DMM' | 'MMM' | 'MMP' | 'MPP' | 'PPP';

export const A_LEVEL_POINTS: Record<string, number> = { 'A*': 56, 'A': 48, 'B': 40, 'C': 32, 'D': 24, 'E': 16, 'U': 0 };
export const AS_LEVEL_POINTS: Record<string, number> = { 'a': 20, 'b': 16, 'c': 12, 'd': 10, 'e': 6, 'u': 0 };
export const EPQ_POINTS: Record<string, number> = { 'A*': 28, 'A': 24, 'B': 20, 'C': 16, 'D': 12, 'E': 8, 'U': 0 };
export const IB_HL_POINTS: Record<string, number> = { '7': 56, '6': 48, '5': 32, '4': 24, '3': 12, '2': 0, '1': 0 };
export const BTEC_EXT_POINTS: Record<string, number> = { 'D*D*D*': 168, 'D*D*D': 160, 'D*DD': 152, 'DDD': 144, 'DDM': 128, 'DMM': 112, 'MMM': 96, 'MMP': 80, 'MPP': 64, 'PPP': 48 };

// Based on standard unofficial conversions for international apps
export const A_LEVEL_TO_GPA: Record<string, number> = {
  'A*': 4.0, 'A': 4.0, 'B': 3.3, 'C': 2.7, 'D': 2.0, 'E': 1.0, 'U': 0.0,
};

// UMS Boundaries (percentage of total UMS)
export const UMS_BOUNDARIES: Record<string, number> = {
  'A*': 90, 'A': 80, 'B': 70, 'C': 60, 'D': 50, 'E': 40,
};

export type QualificationType = 'A-Level' | 'AS-Level' | 'EPQ' | 'IB-HL' | 'BTEC-Ext-Dip';

export interface QualificationEntry {
  id: string;
  type: QualificationType;
  subject: string;
  grade: string;
}

export function calculateTotalUcasPoints(entries: QualificationEntry[]): number {
  return entries.reduce((total, entry) => {
    switch (entry.type) {
      case 'A-Level': return total + (A_LEVEL_POINTS[entry.grade] || 0);
      case 'AS-Level': return total + (AS_LEVEL_POINTS[entry.grade] || 0);
      case 'EPQ': return total + (EPQ_POINTS[entry.grade] || 0);
      case 'IB-HL': return total + (IB_HL_POINTS[entry.grade] || 0);
      case 'BTEC-Ext-Dip': return total + (BTEC_EXT_POINTS[entry.grade] || 0);
      default: return total;
    }
  }, 0);
}

export function calculateAverageGpa(entries: QualificationEntry[]): number | null {
  const aLevels = entries.filter((e) => e.type === 'A-Level');
  if (aLevels.length === 0) return null;

  const totalGpa = aLevels.reduce((total, entry) => total + (A_LEVEL_TO_GPA[entry.grade] || 0), 0);
  return Number((totalGpa / aLevels.length).toFixed(2));
}

export function predictRequiredUms(currentUms: number, totalMaxUms: number, targetGrade: string): number | null {
  const targetPercentage = UMS_BOUNDARIES[targetGrade];
  if (!targetPercentage) return null;

  const requiredTotalUms = (targetPercentage / 100) * totalMaxUms;
  const remainingUmsNeeded = requiredTotalUms - currentUms;

  return remainingUmsNeeded > 0 ? remainingUmsNeeded : 0;
}
