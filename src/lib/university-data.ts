export interface UniversityRecord {
  name: string;
  country: string;
  typicalOffer: string;
  ucasPoints: number;
  acceptsTariff: boolean;
  requiresAdmissionsTest: boolean;
  requiresInterview: boolean;
  officialUrl: string;
  notes?: string;
}

export const UNIFIED_UNIVERSITY_DATASET: UniversityRecord[] = [
  { name: "University of Oxford", country: "UK", typicalOffer: "A*A*A", ucasPoints: 160, acceptsTariff: false, requiresAdmissionsTest: true, requiresInterview: true, officialUrl: "https://ox.ac.uk", notes: "Requires subject test (MAT/PAT/TSA) and college interviews." },
  { name: "University of Cambridge", country: "UK", typicalOffer: "A*A*A", ucasPoints: 160, acceptsTariff: false, requiresAdmissionsTest: true, requiresInterview: true, officialUrl: "https://cam.ac.uk", notes: "Requires ESAT/TMUA admissions exam & college interview." },
  { name: "Imperial College London", country: "UK", typicalOffer: "A*AA", ucasPoints: 152, acceptsTariff: false, requiresAdmissionsTest: true, requiresInterview: true, officialUrl: "https://imperial.ac.uk", notes: "Requires MAT/TMUA exam for CS/Maths." },
  { name: "UCL (University College London)", country: "UK", typicalOffer: "AAA", ucasPoints: 144, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://ucl.ac.uk" },
  { name: "University of Edinburgh", country: "UK", typicalOffer: "AAA", ucasPoints: 144, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://ed.ac.uk" },
  { name: "King's College London", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://kcl.ac.uk" },
  { name: "University of Manchester", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://manchester.ac.uk" },
  { name: "University of Warwick", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://warwick.ac.uk" },
  { name: "University of Bristol", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://bristol.ac.uk" },
  { name: "University of Southampton", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://southampton.ac.uk" },
  { name: "University of Exeter", country: "UK", typicalOffer: "AAB", ucasPoints: 136, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://exeter.ac.uk" },
  { name: "University of Birmingham", country: "UK", typicalOffer: "AAA", ucasPoints: 144, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://birmingham.ac.uk" },
  { name: "University of Nottingham", country: "UK", typicalOffer: "ABB", ucasPoints: 128, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://nottingham.ac.uk" },
  { name: "University of Leeds", country: "UK", typicalOffer: "ABB", ucasPoints: 128, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://leeds.ac.uk" },
  { name: "Cardiff University", country: "UK", typicalOffer: "BBB", ucasPoints: 120, acceptsTariff: true, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://cardiff.ac.uk" },
  { name: "University of Toronto", country: "Canada", typicalOffer: "AAA (90%+)", ucasPoints: 144, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://utoronto.ca", notes: "Holistic evaluation based on Top 3 A-Level subjects." },
  { name: "University of British Columbia (UBC)", country: "Canada", typicalOffer: "AAB (85%+)", ucasPoints: 136, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://ubc.ca" },
  { name: "Technical University of Munich (TUM)", country: "Germany", typicalOffer: "3 A-Levels (1.5 Bavarian)", ucasPoints: 144, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://tum.de", notes: "Requires direct university entrance qualification (Anabin)." },
  { name: "University of Melbourne", country: "Australia", typicalOffer: "AAB (89+ ATAR)", ucasPoints: 136, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://unimelb.edu.au" },
  { name: "National University of Singapore (NUS)", country: "Singapore", typicalOffer: "A*A*A", ucasPoints: 160, acceptsTariff: false, requiresAdmissionsTest: false, requiresInterview: false, officialUrl: "https://nus.edu.sg" },
];
