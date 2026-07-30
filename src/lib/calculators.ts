export type Grade = 'A*' | 'A' | 'B' | 'C' | 'D' | 'E' | 'U';
export type ASGrade = 'a' | 'b' | 'c' | 'd' | 'e' | 'u';
export type IBGrade = '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type IBTokEeGrade = 'A' | 'B' | 'C' | 'D' | 'E';
export type BTECExtGrade = 'D*D*D*' | 'D*D*D' | 'D*DD' | 'DDD' | 'DDM' | 'DMM' | 'MMM' | 'MMP' | 'MPP' | 'PPP';
export type BTECDipGrade = 'D*D*' | 'D*D' | 'DD' | 'DM' | 'MM' | 'MP' | 'PP';
export type BTECExtCertGrade = 'D*' | 'D' | 'M' | 'P';
export type TLevelGrade = 'Distinction*' | 'Distinction' | 'Merit' | 'Pass (C+)' | 'Pass (D/E)';

export type CreditType = 'Full Credit' | 'Half Credit';

export const A_LEVEL_POINTS: Record<string, number> = { 'A*': 56, 'A': 48, 'B': 40, 'C': 32, 'D': 24, 'E': 16, 'U': 0 };
export const AS_LEVEL_POINTS: Record<string, number> = { 'a': 20, 'b': 16, 'c': 12, 'd': 10, 'e': 6, 'u': 0 };
export const EPQ_POINTS: Record<string, number> = { 'A*': 28, 'A': 24, 'B': 20, 'C': 16, 'D': 12, 'E': 8, 'U': 0 };

// Official UCAS Tariff for IB
export const IB_HL_POINTS: Record<string, number> = { '7': 56, '6': 48, '5': 32, '4': 24, '3': 12, '2': 0, '1': 0 };
export const IB_SL_POINTS: Record<string, number> = { '7': 28, '6': 24, '5': 16, '4': 12, '3': 6, '2': 0, '1': 0 };
export const IB_TOK_EE_POINTS: Record<string, number> = { 'A': 12, 'B': 10, 'C': 8, 'D': 6, 'E': 4 };

// Official UCAS Tariff for BTECs
export const BTEC_EXT_POINTS: Record<string, number> = { 
  'D*D*D*': 168, 'D*D*D': 160, 'D*DD': 152, 'DDD': 144, 'DDM': 128, 'DMM': 112, 'MMM': 96, 'MMP': 80, 'MPP': 64, 'PPP': 48 
};
export const BTEC_DIP_POINTS: Record<string, number> = {
  'D*D*': 112, 'D*D': 104, 'DD': 96, 'DM': 80, 'MM': 64, 'MP': 48, 'PP': 32
};
export const BTEC_EXT_CERT_POINTS: Record<string, number> = {
  'D*': 56, 'D': 48, 'M': 32, 'P': 16
};

// Official UCAS Tariff for T-Levels
export const T_LEVEL_POINTS: Record<string, number> = {
  'Distinction*': 168, 'Distinction': 144, 'Merit': 120, 'Pass (C+)': 96, 'Pass (D/E)': 72
};

// Official US WES & Fulbright Credential Evaluation Scales for A-Levels
export const GPA_SCALES = {
  unweighted: {
    name: "US Unweighted (WES Standard)",
    desc: "Official WES / Fulbright 4.0 Scale",
    values: { 'A*': 4.0, 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'E': 1.0, 'U': 0.0, 'a': 4.0, 'b': 3.0, 'c': 2.0, 'd': 1.0, 'e': 1.0, 'u': 0.0 }
  },
  weighted: {
    name: "US Weighted (AP / Honors Equivalent)",
    desc: "Adds +1.0 AP Rigor Boost (5.0 Max)",
    values: { 'A*': 5.0, 'A': 5.0, 'B': 4.0, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'U': 0.0, 'a': 4.5, 'b': 3.5, 'c': 2.5, 'd': 1.5, 'e': 1.0, 'u': 0.0 }
  },
  plusMinus: {
    name: "US Plus / Minus Scale",
    desc: "Differentiates B+ (3.3) and C+ (2.7) grades",
    values: { 'A*': 4.0, 'A': 4.0, 'B': 3.3, 'C': 2.7, 'D': 2.0, 'E': 1.0, 'U': 0.0, 'a': 4.0, 'b': 3.3, 'c': 2.7, 'd': 2.0, 'e': 1.0, 'u': 0.0 }
  }
};

// International Grade Mappings
export const CANADA_PERCENTAGE_SCALE: Record<string, number> = {
  'A*': 95, 'A': 86, 'B': 76, 'C': 66, 'D': 56, 'E': 50, 'U': 0
};

// German Bavarian Formula Scale (1.0 Best - 4.0 Passing)
export const GERMAN_SCALE: Record<string, number> = {
  'A*': 1.0, 'A': 1.3, 'B': 2.0, 'C': 3.0, 'D': 3.7, 'E': 4.0, 'U': 5.0
};

// Australian Estimated ATAR Percentile Range for A-Levels Profile (3 A-Levels)
export function calculateEstimatedAtar(entries: QualificationEntry[]): { atar: string; band: string } {
  const points = calculateTotalUcasPoints(entries);
  if (points >= 168) return { atar: "99.50+", band: "Top 0.5% (Elite Sandstone / Group of Eight)" };
  if (points >= 160) return { atar: "98.50+", band: "Top 1.5% (Group of Eight High Honors)" };
  if (points >= 152) return { atar: "96.00+", band: "Top 4.0% (Group of Eight Unconditional)" };
  if (points >= 144) return { atar: "93.00+", band: "Top 7.0% (Top Tier Australian Univs)" };
  if (points >= 136) return { atar: "89.00+", band: "Top 11.0% (Competitive Degree Target)" };
  if (points >= 128) return { atar: "84.00+", band: "Top 16.0% (Standard Degree Target)" };
  if (points >= 112) return { atar: "78.00+", band: "Top 22.0% (Broad Entry Target)" };
  return { atar: "< 75.00", band: "Foundation / Diploma Pathway" };
}

// Hong Kong & Singapore Direct University Conversion Points
export function calculateHkSgPoints(entries: QualificationEntry[]): number {
  return entries.reduce((total, entry) => {
    if (entry.type === 'A-Level') {
      const map: Record<string, number> = { 'A*': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'U': 0 };
      return total + (map[entry.grade] || 0);
    }
    return total;
  }, 0);
}

export const UMS_BOUNDARIES: Record<string, number> = {
  'A*': 90, 'A': 80, 'B': 70, 'C': 60, 'D': 50, 'E': 40
};

export type QualificationType = 
  | 'A-Level' 
  | 'AS-Level' 
  | 'EPQ' 
  | 'IB-HL' 
  | 'IB-SL' 
  | 'IB-Tok-EE'
  | 'BTEC-Ext-Dip' 
  | 'BTEC-Dip' 
  | 'BTEC-Ext-Cert'
  | 'T-Level';

export interface QualificationEntry {
  id: string;
  type: QualificationType;
  subject: string;
  grade: string;
  creditType?: CreditType;
}

export function getCreditWeight(entry: QualificationEntry): number {
  if (entry.creditType) {
    return entry.creditType === 'Full Credit' ? 1.0 : 0.5;
  }
  switch (entry.type) {
    case 'A-Level':
    case 'IB-HL':
    case 'BTEC-Ext-Dip':
    case 'T-Level':
      return 1.0;
    case 'AS-Level':
    case 'EPQ':
    case 'IB-SL':
    case 'IB-Tok-EE':
    case 'BTEC-Ext-Cert':
      return 0.5;
    case 'BTEC-Dip':
      return 0.75;
    default:
      return 1.0;
  }
}

export function getCreditLabel(entry: QualificationEntry): CreditType {
  const weight = getCreditWeight(entry);
  return weight >= 1.0 ? 'Full Credit' : 'Half Credit';
}

export function detectSubjectCredit(query: string, currentType: QualificationType = 'A-Level'): { creditType: CreditType; detectedType: QualificationType; cleanSubject: string } {
  const lower = query.toLowerCase().trim();

  if (lower.includes('as-level') || lower.includes('as level') || lower.endsWith(' as')) {
    const clean = query.replace(/as-level|as level| as$/i, '').trim();
    return { creditType: 'Half Credit', detectedType: 'AS-Level', cleanSubject: clean || query };
  }

  if (lower.includes('epq') || lower.includes('extended project')) {
    const clean = query.replace(/epq|extended project/i, '').trim();
    return { creditType: 'Half Credit', detectedType: 'EPQ', cleanSubject: clean || 'Extended Project Qualification' };
  }

  if (lower.includes('a-level') || lower.includes('a2 level') || lower.includes('a level') || lower.endsWith(' a2')) {
    const clean = query.replace(/a-level|a2 level|a level| a2$/i, '').trim();
    return { creditType: 'Full Credit', detectedType: 'A-Level', cleanSubject: clean || query };
  }

  const isHalf = ['AS-Level', 'EPQ', 'IB-SL', 'IB-Tok-EE', 'BTEC-Ext-Cert'].includes(currentType);
  return {
    creditType: isHalf ? 'Half Credit' : 'Full Credit',
    detectedType: currentType,
    cleanSubject: query
  };
}

export function calculateTotalUcasPoints(entries: QualificationEntry[]): number {
  return entries.reduce((total, entry) => {
    switch (entry.type) {
      case 'A-Level': return total + (A_LEVEL_POINTS[entry.grade] || 0);
      case 'AS-Level': return total + (AS_LEVEL_POINTS[entry.grade] || 0);
      case 'EPQ': return total + (EPQ_POINTS[entry.grade] || 0);
      case 'IB-HL': return total + (IB_HL_POINTS[entry.grade] || 0);
      case 'IB-SL': return total + (IB_SL_POINTS[entry.grade] || 0);
      case 'IB-Tok-EE': return total + (IB_TOK_EE_POINTS[entry.grade] || 0);
      case 'BTEC-Ext-Dip': return total + (BTEC_EXT_POINTS[entry.grade] || 0);
      case 'BTEC-Dip': return total + (BTEC_DIP_POINTS[entry.grade] || 0);
      case 'BTEC-Ext-Cert': return total + (BTEC_EXT_CERT_POINTS[entry.grade] || 0);
      case 'T-Level': return total + (T_LEVEL_POINTS[entry.grade] || 0);
      default: return total;
    }
  }, 0);
}

export function calculateAverageGpa(
  entries: QualificationEntry[], 
  scaleMode: 'unweighted' | 'weighted' | 'plusMinus' = 'unweighted'
): number | null {
  if (entries.length === 0) return null;

  const scaleMap = GPA_SCALES[scaleMode].values as Record<string, number>;
  let totalWeightedGpa = 0;
  let totalCreditWeight = 0;

  entries.forEach((entry) => {
    const weight = getCreditWeight(entry);
    const pointValue = scaleMap[entry.grade] ?? 0;
    totalWeightedGpa += pointValue * weight;
    totalCreditWeight += weight;
  });

  if (totalCreditWeight === 0) return null;
  return Number((totalWeightedGpa / totalCreditWeight).toFixed(2));
}

export function calculateCanadaPercentage(entries: QualificationEntry[]): number | null {
  const aLevels = entries.filter(e => e.type === 'A-Level');
  if (aLevels.length === 0) return null;
  const total = aLevels.reduce((sum, e) => sum + (CANADA_PERCENTAGE_SCALE[e.grade] || 0), 0);
  return Number((total / aLevels.length).toFixed(1));
}

export function calculateGermanBavarianGrade(entries: QualificationEntry[]): number | null {
  const aLevels = entries.filter(e => e.type === 'A-Level');
  if (aLevels.length === 0) return null;
  const total = aLevels.reduce((sum, e) => sum + (GERMAN_SCALE[e.grade] || 0), 0);
  return Number((total / aLevels.length).toFixed(2));
}

export function getExactEquivalentOffer(points: number): string {
  if (points >= 168) return "A*A*A*";
  if (points >= 160) return "A*A*A";
  if (points >= 152) return "A*AA";
  if (points >= 144) return "AAA";
  if (points >= 136) return "AAB";
  if (points >= 128) return "ABB";
  if (points >= 120) return "BBB";
  if (points >= 112) return "BBC";
  if (points >= 104) return "BCC";
  if (points >= 96) return "CCC";
  if (points >= 88) return "CCD";
  if (points >= 80) return "CDD";
  if (points >= 72) return "DDD";
  if (points >= 64) return "DDE";
  if (points >= 56) return "EEE";
  if (points >= 48) return "EE";
  return "Below EE";
}

export interface UmsPredictionResult {
  requiredRemainingUms: number | null;
  isPossible: boolean;
  message: string;
  breakdown?: {
    overallA2NeededFor80: number;
    a2NeededFor90Rule: number;
  };
}

export function predictRequiredUms(
  currentAsUms: number,
  maxAsUms: number,
  totalA2Ums: number,
  targetGrade: string
): UmsPredictionResult {
  const remainingA2UmsAvailable = totalA2Ums - maxAsUms;
  if (remainingA2UmsAvailable <= 0) {
    return {
      requiredRemainingUms: null,
      isPossible: false,
      message: "Invalid configuration: AS max UMS cannot equal or exceed total A-Level UMS."
    };
  }

  if (targetGrade === 'A*') {
    const requiredTotalForOverallA = 0.80 * totalA2Ums;
    const remainingForOverallA = Math.max(0, requiredTotalForOverallA - currentAsUms);
    const requiredA2For90Rule = 0.90 * remainingA2UmsAvailable;
    const finalRequiredA2Ums = Math.max(remainingForOverallA, requiredA2For90Rule);
    const isPossible = finalRequiredA2Ums <= remainingA2UmsAvailable;

    let message = "";
    if (!isPossible) {
      message = `Mathematically impossible for A*. You need ${finalRequiredA2Ums.toFixed(1)} A2 UMS marks, but only ${remainingA2UmsAvailable} are available.`;
    } else if (finalRequiredA2Ums === 0) {
      message = "You have already secured enough UMS for an A*!";
    } else {
      message = `To achieve an A*, you need at least ${finalRequiredA2Ums.toFixed(1)} UMS marks in your remaining A2 exams (satisfying both 80% overall & 90% A2 rule).`;
    }

    return {
      requiredRemainingUms: finalRequiredA2Ums,
      isPossible,
      message,
      breakdown: {
        overallA2NeededFor80: Number(remainingForOverallA.toFixed(1)),
        a2NeededFor90Rule: Number(requiredA2For90Rule.toFixed(1))
      }
    };
  } else {
    const targetPercentage = UMS_BOUNDARIES[targetGrade];
    if (!targetPercentage) {
      return {
        requiredRemainingUms: null,
        isPossible: false,
        message: "Invalid target grade."
      };
    }

    const requiredTotalUms = (targetPercentage / 100) * totalA2Ums;
    const remainingNeeded = Math.max(0, requiredTotalUms - currentAsUms);
    const isPossible = remainingNeeded <= remainingA2UmsAvailable;

    let message = "";
    if (!isPossible) {
      message = `Mathematically impossible. You need ${remainingNeeded.toFixed(1)} more UMS marks, but only ${remainingA2UmsAvailable} remain.`;
    } else if (remainingNeeded === 0) {
      message = `You've already secured enough UMS marks for Grade ${targetGrade}!`;
    } else {
      message = `You need ${remainingNeeded.toFixed(1)} more UMS marks in your remaining A2 exams to achieve Grade ${targetGrade}.`;
    }

    return {
      requiredRemainingUms: remainingNeeded,
      isPossible,
      message
    };
  }
}
