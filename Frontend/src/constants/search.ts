import type { PatientMatch } from "../Types/PatientMatch";

export const SEARCH_CONTENT = {
    title: "Clinical Patient Search Index",
    finder: {
        heading: "Natural-Language Cohort & Patient Finder",
        label: "Natural-language patient query",
        placeholder: "Patients with congestive heart failure and ejection fraction < 45% admitted in 2023...",
        badge: "Semantic Active",
        hint: "Query searches patient charts, clinician notes, discharge papers, and medical ledgers dynamically.",
    },
    results: {
        heading: (count: number) => `Patient Match Results (${count} patients identified)`,
        sortedBy: "Sorted by: Relevance Confidence",
        efRatio: "EF Ratio",
        admitDate: "Admit Date",
        reduced: "(Reduced)",
        match: "Match",
    },
};

export const SEARCH_FILTERS = {
    facility: { id: "facility-source", label: "Facility Source", options: ["Mount Sinai (All Nodes)", "Sinai Cardiology Clinic", "Mount Sinai Radiology"] },
    risk: { id: "risk-classification", label: "Risk Classification", options: ["High Risk / Escalated", "Moderate Risk", "Low Risk", "All Classifications"] },
    status: { id: "ledger-status", label: "Ledger Status", options: ["Active & Verified", "Pending Verification", "Archived"] },
};

export const PATIENT_MATCHES: PatientMatch[] = [
    { mrn: "892-019", name: "Sarah Jenkins", dob: "11/12/1982", age: 41, efRatio: 42, efReduced: true, admitDate: "11/04/2023", matchScore: 98 },
    { mrn: "421-992", name: "Raymond Wong", dob: "05/23/1965", age: 68, efRatio: 44, efReduced: false, admitDate: "09/12/2023", matchScore: 85 },
];
