export interface ActivityEvaluation {
  score: number;
  ratingTier: 'Tier 1 (National/Elite)' | 'Tier 2 (Regional Leader)' | 'Tier 3 (School Leader)' | 'Tier 4 (Participant)';
  strengths: string[];
  improvements: string[];
}

export interface CourseRecommendation {
  title: string;
  category: 'Super-Curricular Research' | 'Competition / Olympiad' | 'Project / Project Building' | 'Volunteering / Leadership';
  description: string;
  impactLevel: 'High Impact' | 'Essential';
}

export const COURSE_RECOMMENDATIONS_DATABASE: Record<string, CourseRecommendation[]> = {
  "Computer Science": [
    { title: "USACO / Bebras Computing Challenge", category: "Competition / Olympiad", description: "Compete in algorithmic problem solving and data structure challenges to showcase problem-solving rigor.", impactLevel: "High Impact" },
    { title: "Open-Source Full-Stack / AI Project", category: "Project / Project Building", description: "Build and publish a web app or AI model on GitHub with unit tests, README documentation, and deployed live link.", impactLevel: "Essential" },
    { title: "Research Paper on Quantum / ML", category: "Super-Curricular Research", description: "Read foundational papers (e.g. Attention Is All You Need) and write a 1,500-word review paper for student science journals.", impactLevel: "High Impact" }
  ],
  "Medicine": [
    { title: "Care Home / Hospice Clinical Volunteering", category: "Volunteering / Leadership", description: "Commit to 6 months of weekly care volunteering to demonstrate long-term empathy and patient communication skills.", impactLevel: "Essential" },
    { title: "BSMS / RCGP Virtual Medical Work Experience", category: "Super-Curricular Research", description: "Complete Royal College of General Practitioners virtual shadowing modules to gain primary care insights.", impactLevel: "Essential" },
    { title: "Medical Ethics Essay Competition (St John's / Cambridge)", category: "Competition / Olympiad", description: "Write a essay exploring bioethical dilemmas such as organ allocation or gene editing.", impactLevel: "High Impact" }
  ],
  "Engineering": [
    { title: "CREST Gold Award Project", category: "Project / Project Building", description: "Design, build, and test a physical prototype (e.g., automated solar tracker or CAD structure) following 70+ hours of engineering.", impactLevel: "High Impact" },
    { title: "Physics / Senior Mathematical Challenge", category: "Competition / Olympiad", description: "Achieve Gold in UKMT Senior Math Challenge or British Physics Olympiad to demonstrate quantitative mastery.", impactLevel: "Essential" },
    { title: "Mechanical Teardown & Analysis Log", category: "Super-Curricular Research", description: "Disassemble an engine or circuit board, document component physics, and write a technical failure-analysis report.", impactLevel: "High Impact" }
  ],
  "Law": [
    { title: "National High School Mock Trial / Mooting", category: "Competition / Olympiad", description: "Participate in simulated appellate advocacy and oral legal argument competitions.", impactLevel: "High Impact" },
    { title: "Courtroom Observation & Case Summary Log", category: "Super-Curricular Research", description: "Attend local Crown Court or Magistrate hearings and write legal analyses on judicial precedent.", impactLevel: "Essential" },
    { title: "Legal Essay Competition (Robson Hall / Cambridge)", category: "Competition / Olympiad", description: "Submit an essay on constitutional law, human rights, or AI copyright liability.", impactLevel: "High Impact" }
  ],
  "Economics": [
    { title: "Royal Economic Society (RES) Essay Competition", category: "Competition / Olympiad", description: "Write an analytical paper on inflation, trade policy, or behavioral economics for RES.", impactLevel: "High Impact" },
    { title: "Stock & Macroeconomic Portfolio Model", category: "Project / Project Building", description: "Build a Python or Excel econometric model assessing central bank interest rate impacts on market volatility.", impactLevel: "Essential" },
    { title: "Economics Book Deep-Dive & Review", category: "Super-Curricular Research", description: "Critique 'Thinking, Fast and Slow' or 'Freakonomics' and relate findings to real-world policy.", impactLevel: "Essential" }
  ]
};

export function evaluateActivity(
  role: string,
  organization: string,
  description: string,
  tier: string
): ActivityEvaluation {
  const desc = description.trim();
  const descLower = desc.toLowerCase();
  
  let score = 50;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Tier base score
  if (tier === 'Tier 1') score += 35;
  else if (tier === 'Tier 2') score += 25;
  else if (tier === 'Tier 3') score += 15;
  else score += 5;

  // Quantitative metrics check
  const hasNumbers = /\d+/.test(desc);
  if (hasNumbers) {
    score += 10;
    strengths.push("Quantifies impact with numerical evidence (e.g. students helped, funds raised, % increase).");
  } else {
    improvements.push("Add quantitative metrics (e.g., 'raised $2,500', 'managed 12 peers', 'reached 500+ users').");
  }

  // Leadership role check
  const isLeader = /founder|president|lead|director|captain|head|editor/i.test(role);
  if (isLeader) {
    score += 10;
    strengths.push("Demonstrates active leadership and organizational ownership.");
  } else {
    improvements.push("Elevate role description (e.g. from 'Member' to 'Lead Organizer' or 'Project Coordinator').");
  }

  // Action verbs check
  const hasActionVerb = /spearheaded|engineered|architected|initiated|transformed|analyzed|organized|co-ordinated/i.test(descLower);
  if (hasActionVerb) {
    score += 5;
    strengths.push("Uses high-impact active verbs to open sentences.");
  } else {
    improvements.push("Start description with strong action verbs (e.g. 'Spearheaded', 'Engineered', 'Initiated').");
  }

  const finalScore = Math.min(100, Math.max(20, score));

  let ratingTier: ActivityEvaluation['ratingTier'] = 'Tier 3 (School Leader)';
  if (finalScore >= 85) ratingTier = 'Tier 1 (National/Elite)';
  else if (finalScore >= 70) ratingTier = 'Tier 2 (Regional Leader)';
  else if (finalScore >= 50) ratingTier = 'Tier 3 (School Leader)';
  else ratingTier = 'Tier 4 (Participant)';

  return {
    score: finalScore,
    ratingTier,
    strengths,
    improvements
  };
}

export function getRecommendationsForCourse(courseInterest: string): CourseRecommendation[] {
  return COURSE_RECOMMENDATIONS_DATABASE[courseInterest] || COURSE_RECOMMENDATIONS_DATABASE["Computer Science"];
}
