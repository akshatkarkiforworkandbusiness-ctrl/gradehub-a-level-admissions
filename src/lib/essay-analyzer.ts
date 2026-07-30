export interface JohnsHopkinsBenchmark {
  overallScore: number;
  hookScore: number;
  showTellScore: number;
  depthScore: number;
  conclusionScore: number;
  hookFeedback: string;
  showTellFeedback: string;
  depthFeedback: string;
  conclusionFeedback: string;
  exemplarTip: string;
}

export interface EssayDiagnostic {
  wordCount: number;
  charCount: number;
  lineCount: number;
  readabilityScore: number;
  readabilityLevel: string;
  type: 'ucas' | 'commonapp';
  status: 'valid' | 'warning' | 'error';
  limitMessage: string;
  clicheWarnings: string[];
  powerVerbsFound: string[];
  recommendations: string[];
  jhuBenchmark: JohnsHopkinsBenchmark;
}

const COMMON_CLICHES = [
  "since a young age",
  "from an early age",
  "always had a passion",
  "passion for",
  "ever since I was",
  "in conclusion",
  "webster's dictionary defines",
  "since the dawn of time",
  "as a child",
  "it goes without saying",
  "at the end of the day",
  "last but not least"
];

const ACTION_VERBS = [
  "analyzed", "architected", "championed", "collaborated", "constructed", 
  "co-ordinated", "designed", "developed", "engineered", "formulated", 
  "implemented", "initiated", "investigated", "optimized", "orchestrated", 
  "pioneered", "researched", "spearheaded", "synthesized", "transformed"
];

export function evaluateJohnsHopkinsBenchmark(text: string, type: 'ucas' | 'commonapp'): JohnsHopkinsBenchmark {
  const trimmed = text.trim();
  const lower = text.toLowerCase();
  
  // 1. Hook Score (0-25)
  let hookScore = 18;
  let hookFeedback = "Solid opening.";
  const hasGenericStart = /since a young age|ever since|dictionary defines|passion for/i.test(lower.slice(0, 100));
  if (hasGenericStart) {
    hookScore = 10;
    hookFeedback = "Opening contains generic cliché ('since a young age' / 'passion for'). Replace with an active micro-scene or specific question.";
  } else if (trimmed.length > 50) {
    hookScore = 24;
    hookFeedback = "Strong narrative hook. Starts with a specific active scene or intellectual spark.";
  }

  // 2. Show, Don't Tell Score (0-25)
  let showTellScore = 15;
  let showTellFeedback = "Contains basic descriptions.";
  const hasSpecificDetails = /\d+|algorithm|microscope|equation|quantum|framework|hypothesis|protocol|data/i.test(lower);
  if (hasSpecificDetails) {
    showTellScore = 23;
    showTellFeedback = "Excellent 'Show, Don't Tell' details. Includes technical/sensory specifics of your work.";
  } else {
    showTellScore = 12;
    showTellFeedback = "Relies on telling ('I worked hard') rather than showing specific project details or code/lab mechanics.";
  }

  // 3. Depth Score (0-25)
  let depthScore = 16;
  let depthFeedback = "Decent analytical depth.";
  const hasReflection = /learned|realized|transformed|questioned|challenged|discovered/i.test(lower);
  if (hasReflection) {
    depthScore = 22;
    depthFeedback = "Strong intellectual reflection. Shows how your thinking evolved through academic exploration.";
  } else {
    depthScore = 14;
    depthFeedback = "Lacks deep self-reflection. Add what you learned or questioned during the process.";
  }

  // 4. Conclusion Score (0-25)
  let conclusionScore = 15;
  let conclusionFeedback = "Standard summary conclusion.";
  const hasWeakEnding = /in conclusion|to conclude|lastly|summarize/i.test(lower.slice(-150));
  if (hasWeakEnding) {
    conclusionScore = 10;
    conclusionFeedback = "Conclusion uses formal summary transitions ('in conclusion'). End with a forward-looking vision or full-circle reflection.";
  } else {
    conclusionScore = 21;
    conclusionFeedback = "Resonant conclusion connecting your academic drive to future university impact.";
  }

  const overallScore = Math.min(100, Math.round(hookScore + showTellScore + depthScore + conclusionScore));

  const exemplarTip = type === 'ucas'
    ? "Johns Hopkins Exemplar Rule: 75% of your statement should focus on academic engagement (super-curricular reading, lab work, research papers) and 25% on personal reflection & transferable skills."
    : "Johns Hopkins 'Essays That Worked' Rule: Focus on a small, specific moment (a single experiment, coding bug, or community interaction) and reveal how your problem-solving mindset operates.";

  return {
    overallScore,
    hookScore,
    showTellScore,
    depthScore,
    conclusionScore,
    hookFeedback,
    showTellFeedback,
    depthFeedback,
    conclusionFeedback,
    exemplarTip
  };
}

export function analyzeEssay(text: string, type: 'ucas' | 'commonapp' = 'ucas'): EssayDiagnostic {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text ? text.split('\n').length : 0;

  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = wordCount || 1;
  const avgSentenceLength = words / sentences;
  const readabilityScore = Math.max(0, Math.min(100, Math.round(206.835 - (1.015 * avgSentenceLength))));

  let readabilityLevel = "College Level";
  if (readabilityScore > 70) readabilityLevel = "Easy to read";
  else if (readabilityScore > 50) readabilityLevel = "Standard Academic";
  else readabilityLevel = "Complex Academic";

  let status: 'valid' | 'warning' | 'error' = 'valid';
  let limitMessage = "";

  if (type === 'ucas') {
    if (charCount > 4000 || lineCount > 47) {
      status = 'error';
      limitMessage = `Exceeds UCAS limit! Maximum 4,000 characters (current: ${charCount}) and 47 lines (current: ${lineCount}).`;
    } else if (charCount > 3700) {
      status = 'warning';
      limitMessage = `Approaching UCAS 4,000 character limit (${4000 - charCount} characters remaining).`;
    } else {
      limitMessage = `${4000 - charCount} characters remaining for UCAS Personal Statement limit.`;
    }
  } else {
    if (wordCount > 650) {
      status = 'error';
      limitMessage = `Exceeds Common App limit! Maximum 650 words (current: ${wordCount}).`;
    } else if (wordCount < 250 && wordCount > 0) {
      status = 'warning';
      limitMessage = `Below Common App minimum requirement of 250 words (current: ${wordCount}).`;
    } else {
      limitMessage = `${650 - wordCount} words remaining for Common App Essay limit (250-650 word range).`;
    }
  }

  const lowerText = text.toLowerCase();
  const clicheWarnings = COMMON_CLICHES.filter(c => lowerText.includes(c));
  const powerVerbsFound = ACTION_VERBS.filter(v => lowerText.includes(v));

  const jhuBenchmark = evaluateJohnsHopkinsBenchmark(text, type);

  const recommendations: string[] = [];

  if (clicheWarnings.length > 0) {
    recommendations.push(`Replace cliché phrases like "${clicheWarnings[0]}" with specific academic personal anecdotes.`);
  }

  if (powerVerbsFound.length < 2) {
    recommendations.push("Incorporate more active research verbs (e.g. 'investigated', 'spearheaded', 'analyzed', 'engineered').");
  }

  if (jhuBenchmark.hookScore < 15) {
    recommendations.push("Rewrite opening paragraph to model Johns Hopkins 'micro-scene' hook technique.");
  }

  return {
    wordCount,
    charCount,
    lineCount,
    readabilityScore,
    readabilityLevel,
    type,
    status,
    limitMessage,
    clicheWarnings,
    powerVerbsFound,
    recommendations,
    jhuBenchmark
  };
}
