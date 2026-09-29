import type { Citation } from "../Types/Citation";
import type { IngestedFile } from "../Types/IngestedFile";

export const DASHBOARD_CONTENT = {
    title: "Clinical Intelligence Dashboard",
    stats: {
        ledgers: { label: "Longitudinal Patient Ledgers", value: "4,281 Patients", caption: "+24 uploaded today" },
        quota: { label: "Query Token Quota", captionSuffix: "% of limit reached" },
        citations: { label: "Longitudinal Citations Verified", value: "99.87% Accurate", caption: "0 hallucination triggers" },
    },
    recentFiles: {
        heading: "Recently Ingested Patient Files",
        description: "Chronologically synchronized documents within the longitudinal memory bank.",
        uploadNew: "Upload New",
    },
    synthesis: {
        heading: "Active Analysis Synthesis",
        description: "Synthesized heart failure progression from 2021 cardiologist notes.",
    },
    tokens: {
        heading: "Institutional Query Tokens",
        quotaLabel: "Enterprise Quota Used:",
        allocate: "Allocate Query Tokens",
    },
};

export const TOKEN_QUOTA = { used: 14250, total: 25000 };

export const RECENT_FILES: IngestedFile[] = [
    { name: "MS_CardioNotes_Nov_2023.pdf", patientName: "Sarah Jenkins", mrn: "892-019", citedElements: 12, status: "Ingested" },
    { name: "Lab_Panel_Metabolic.pdf", patientName: "Sarah Jenkins", mrn: "892-019", citedElements: 8, status: "Ingested" },
    { name: "DischargeSummary_Wong.pdf", patientName: "Raymond Wong", mrn: "421-992", citedElements: 31, status: "Ingested" },
    { name: "PediatricChart_Adebayo.pdf", patientName: "Amara Adebayo", mrn: "109-881", citedElements: 15, status: "Ingested" },
];

export const ACTIVE_SYNTHESIS: { text: string; highlights: string[]; citations: Citation[] } = {
    text:
        "\"Patient exhibits progressive dyspnea on exertion. Ejection fraction reduced to 42% [1] with mild " +
        "tricuspid regurgitation [2], contrasting with normal ventricular size noted in 2021 [3].\"",
    highlights: ["42%"],
    citations: [
        { marker: 1, source: "MS_CardioNotes_Nov_2023.pdf", detail: "Page 3, Ln 14" },
        { marker: 2, source: "Lab_Panel_Metabolic.pdf", detail: "Section B, Col 2" },
        { marker: 3, source: "DischargeSummary_Wong.pdf", detail: "Ln 41" },
    ],
};
