import type { Citation } from "./Citation";

export type Condition = {
    name: string;
    diagnosed: string;
    severity: "high" | "moderate";
};

export type Medication = {
    name: string;
    refilled: string;
};

export type SourceDocument = {
    name: string;
    category: string;
    source: string;
    sizeMb: number;
    uploaded: string;
    relevance: { level: "High" | "Med" | "Low"; score: number };
    status: "PHI Redacted" | "OCR Transcribed";
};

export type ClinicalSummary = {
    title: string;
    generated: string;
    model: string;
    text: string;
    highlights: string[];
    citations: Citation[];
    discrepancy: string;
    nextSteps: string[];
};

export type Patient = {
    mrn: string;
    name: string;
    sex: string;
    age: number;
    dob: string;
    email: string;
    address: string;
    emergencyContact: string;
    efRatio?: number;
    riskFlag: string;
    conditions: Condition[];
    medications: Medication[];
    allergies: string[];
    risk: { label: string; level: string; score: number };
    careTeam: string[];
    deidentificationBypass: boolean;
    summary: ClinicalSummary;
    documents: SourceDocument[];
};
