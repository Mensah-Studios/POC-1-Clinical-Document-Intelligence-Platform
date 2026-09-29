import type { Patient } from "../Types/Patient";

export const PATIENT_VIEW_CONTENT = {
    title: (name: string) => `Longitudinal Overview: ${name}`,
    conditions: "Active Longitudinal Conditions",
    medications: "Active Medications",
    allergies: "Severe Allergies",
    risk: "AI Longitudinal Risk Trajectory",
    careTeam: "Assigned Care Team",
    query: {
        heading: "Clinical LLM Query",
        label: "Clinical question",
        placeholder: (firstName: string) => `Ask about ${firstName}'s cardiac risk timeline or medication compliance...`,
        model: "Uses Mount Sinai BAA Clinical LLM",
        submit: "Synthesize Clinical Summary",
    },
    workspaces: {
        heading: "Access Related Patient Workspaces",
        description:
            "Continue from this overview into downstream clinical review, document management, registry updates, " +
            "and record retention workflows.",
        summary: {
            title: "Health Summary",
            subtitle: "Synthesis · Evidence · Contradictions",
            description: "Review synthesized cardiac progression notes, cited source evidence, and detected clinical discrepancies.",
            badge: "Verified",
            action: "Open Summary",
        },
        documents: {
            title: "Documents",
            subtitle: "Source Files · PHI Redaction",
            description: "Browse ingested records, review relevance scores, and inspect PHI redaction status for the current patient.",
            action: "View Files",
        },
        update: {
            title: "Registry Update",
            subtitle: "Demographics · Consent · Audit",
            description: "Edit registry details, manage consent overrides, and review the audit trail before committing changes.",
            badge: "Edit",
            action: "Edit Registry",
        },
        purge: {
            title: "Record Purge",
            subtitle: "Permanent Deletion · MFA Required",
            description: "Initiate permanent removal of patient records, tokens, and linked clinical embeddings after MFA confirmation.",
            badge: "Delete",
            footnote: "Irreversible action",
            action: "Review Purge",
        },
    },
};

export const PATIENT_SUMMARY_CONTENT = {
    title: "Clinical LLM Synthesis Summary",
    verified: "Verified Evidence",
    citedSources: "Cited Source Material:",
    discrepancy: "AI Detected Clinical Discrepancy",
    nextSteps: "Suggested Clinical Next Steps",
};

export const PATIENT_DOCUMENTS_CONTENT = {
    title: "Longitudinal Patient Memory Bank",
    heading: "Ingested Patient Source Files",
    filterLabel: "Filter by format",
    formats: ["All Formats", "PDF", "TIFF"],
    uploadNew: "Upload New Source",
    relevance: "AI Relevance",
    empty: "No source files match this format.",
};

export const PATIENT_UPDATE_CONTENT = {
    title: "Longitudinal Patient Registry Update",
    notice: "You are currently editing active EHR clinical registry records. Save to finalize BAA Ledger update.",
    heading: (name: string) => `${name} Registry Records`,
    fields: {
        name: "Registry Patient Full Name",
        email: "Patient Authorized Email",
        mrn: "Longitudinal Patient MRN",
        mrnSuffix: "(Read Only Institutional Identifier)",
        emergencyContact: "Emergency Contact Node",
    },
    bypass: {
        label: "Local PHI De-identification Bypass Override",
        description: "Allow research token embeddings to proceed under active IRB protocol consent exemption.",
    },
    auditNote: (clinician: string) =>
        `* This demographic revision will generate a cryptographically signed audit ledger entry mapped to ` +
        `${clinician} credentials on Mount Sinai's compliance node.`,
    discard: "Discard Changes",
    commit: "Commit Changes & Log Audit",
};

export const PATIENT_DELETE_CONTENT = {
    title: "Permanent Patient Records Purge",
    heading: "Permanent Record Destruction Request",
    warning: "WARNING: This action is irreversible and fully deletes patient tokens from clinical ledgers.",
    targeted: "Records targeted for permanent removal",
    retention:
        "Hospital BAA protocols require clinical summaries to be persisted for a minimum of 7 years. Purging " +
        "clinical records from CuraClinics LLM indices bypasses standard active-access pools but remains recorded " +
        "in off-site physical ledger archives.",
    mrnLabel: (mrn: string) => `Type the Patient MRN (${mrn}) to authorize`,
    mfaLabel: "Enterprise MFA Code challenge",
    cancel: "Cancel purge",
    submit: "Purge Patient Records",
};

export const PATIENT_NOT_FOUND_CONTENT = {
    title: "Patient Not Found",
    description: (mrn: string) => `No longitudinal ledger exists for MRN ${mrn}.`,
    back: "Back to Patient Search",
};

export const MFA_CODE_LENGTH = 6;

export const PATIENTS: Patient[] = [
    {
        mrn: "892-019",
        name: "Sarah Jenkins",
        sex: "Female",
        age: 41,
        dob: "Nov 12, 1982",
        email: "s.jenkins@sinaihealth.org",
        address: "124 East 98th St, NY",
        emergencyContact: "Dr. Robert Jenkins (Spouse) · +1 (555) 0192-381",
        efRatio: 42,
        riskFlag: "ESC-Risk",
        conditions: [
            { name: "Congestive Heart Failure (NYHA Class II)", diagnosed: "Oct 2021", severity: "high" },
            { name: "T2 Diabetes Mellitus (HbA1c: 7.2)", diagnosed: "Jun 2019", severity: "moderate" },
        ],
        medications: [
            { name: "Lisinopril 10mg QD", refilled: "Nov 1, 2023" },
            { name: "Metformin 500mg BID", refilled: "Oct 28, 2023" },
        ],
        allergies: ["Penicillin (Anaphylaxis)"],
        risk: { label: "Decompensation Risk", level: "High", score: 78 },
        careTeam: ["Dr. Linus Patel, MD (Cardiology Primary)", "Sarah Jenkins, RN (Care Coordinator)"],
        deidentificationBypass: true,
        summary: {
            title: "Cardiac Progression Summary",
            generated: "Generated 4 mins ago",
            model: "Clin-LLM-v4",
            text:
                "Patient exhibits progressive dyspnea on exertion, first recorded in November 2023 cardiologist notes. " +
                "Ejection fraction has reduced to 42% [1] with mild tricuspid regurgitation noted on Sinai EEG panel [2]. " +
                "This represents a critical change from normal ventricular sizes and compliance recorded in 2021 discharge summaries [3].",
            highlights: ["42% [1]", "[2]", "[3]"],
            citations: [
                { marker: 1, source: "MS_CardioNotes_Nov_2023.pdf", detail: "Page 3, Line 14 · Source: Sinai Cardiology Clinic" },
                { marker: 2, source: "Sinai_EEG_Panel_A.tiff", detail: "Column 2, Line 41 · OCR Transcribed Text" },
                { marker: 3, source: "D_DischargeSummary_R_Wong.pdf", detail: "Line 4 · Discharge Diagnosis Ledger" },
            ],
            discrepancy:
                "Sinai EEG Panel A lists Lisinopril dosage as 10mg QD, whereas the Discharge Summary notes Lisinopril " +
                "was increased to 20mg QD on Oct 28, 2023. Please verify active dose.",
            nextSteps: ["Generate referral to HF Management Clinic", "Query Metformin interaction timeline"],
        },
        documents: [
            { name: "MS_CardioNotes_Nov_2023.pdf", category: "Cardiology Specialist Notes", source: "Sinai Cardiology Clinic", sizeMb: 14.2, uploaded: "Nov 2, 2023", relevance: { level: "High", score: 98 }, status: "PHI Redacted" },
            { name: "Lab_Panel_Metabolic.pdf", category: "Metabolic Panel Labs", source: "Labcorp Node Sinai", sizeMb: 8.4, uploaded: "Oct 28, 2023", relevance: { level: "High", score: 91 }, status: "PHI Redacted" },
            { name: "Sinai_EEG_Panel_A.tiff", category: "Raw Brain/Cardiac EEG Scan Image", source: "Mount Sinai Radiology", sizeMb: 38.1, uploaded: "Oct 12, 2023", relevance: { level: "Med", score: 55 }, status: "OCR Transcribed" },
        ],
    },
    {
        mrn: "421-992",
        name: "Raymond Wong",
        sex: "Male",
        age: 68,
        dob: "May 23, 1965",
        email: "r.wong@sinaihealth.org",
        address: "88 Mott St, NY",
        emergencyContact: "Grace Wong (Daughter) · +1 (555) 0147-220",
        efRatio: 44,
        riskFlag: "Monitor",
        conditions: [
            { name: "Heart Failure with Mildly Reduced EF", diagnosed: "Sep 2023", severity: "high" },
            { name: "Hypertension (Stage 2)", diagnosed: "Mar 2014", severity: "moderate" },
        ],
        medications: [
            { name: "Carvedilol 12.5mg BID", refilled: "Sep 20, 2023" },
            { name: "Furosemide 40mg QD", refilled: "Sep 20, 2023" },
        ],
        allergies: ["Sulfonamides (Rash)"],
        risk: { label: "Readmission Risk", level: "Moderate", score: 54 },
        careTeam: ["Dr. Linus Patel, MD (Cardiology Primary)", "Maria Chen, RN (Care Coordinator)"],
        deidentificationBypass: false,
        summary: {
            title: "Post-Discharge Cardiac Summary",
            generated: "Generated 2 hours ago",
            model: "Clin-LLM-v4",
            text:
                "Patient was admitted in September 2023 with volume overload and an ejection fraction of 44% [1]. " +
                "Diuresis was effective and discharge weight decreased by 4.1 kg [1]. Blood pressure remains above target on current therapy [2].",
            highlights: ["44% [1]", "[1]", "[2]"],
            citations: [
                { marker: 1, source: "DischargeSummary_Wong.pdf", detail: "Page 1, Line 8 · Discharge Diagnosis Ledger" },
                { marker: 2, source: "BP_Log_Wong_Q3.pdf", detail: "Table 2 · Home Monitoring Upload" },
            ],
            discrepancy:
                "Discharge Summary lists Furosemide 40mg QD while the pharmacy refill record shows 20mg QD. Please verify active dose.",
            nextSteps: ["Schedule 14-day post-discharge follow-up", "Query blood pressure trend since discharge"],
        },
        documents: [
            { name: "DischargeSummary_Wong.pdf", category: "Discharge Summary", source: "Mount Sinai Main Campus", sizeMb: 3.6, uploaded: "Sep 18, 2023", relevance: { level: "High", score: 96 }, status: "PHI Redacted" },
            { name: "BP_Log_Wong_Q3.pdf", category: "Home Blood Pressure Log", source: "Patient Portal Upload", sizeMb: 1.2, uploaded: "Sep 30, 2023", relevance: { level: "Med", score: 61 }, status: "PHI Redacted" },
        ],
    },
    {
        mrn: "109-881",
        name: "Amara Adebayo",
        sex: "Female",
        age: 9,
        dob: "Feb 3, 2014",
        email: "guardian.adebayo@sinaihealth.org",
        address: "310 Lenox Ave, NY",
        emergencyContact: "Tunde Adebayo (Parent) · +1 (555) 0110-734",
        riskFlag: "Stable",
        conditions: [
            { name: "Moderate Persistent Asthma", diagnosed: "Apr 2019", severity: "moderate" },
        ],
        medications: [
            { name: "Fluticasone 44mcg 2 puffs BID", refilled: "Oct 3, 2023" },
            { name: "Albuterol HFA PRN", refilled: "Aug 14, 2023" },
        ],
        allergies: ["Peanuts (Anaphylaxis)"],
        risk: { label: "Exacerbation Risk", level: "Low", score: 22 },
        careTeam: ["Dr. Hannah Okafor, MD (Pediatrics Primary)", "Leo Martins, RN (School Liaison)"],
        deidentificationBypass: false,
        summary: {
            title: "Pediatric Respiratory Summary",
            generated: "Generated 1 day ago",
            model: "Clin-LLM-v4",
            text:
                "Asthma control has improved since inhaled corticosteroid adherence increased in 2023 [1]. " +
                "No emergency visits have been recorded in the last 12 months [2].",
            highlights: ["[1]", "[2]"],
            citations: [
                { marker: 1, source: "PediatricChart_Adebayo.pdf", detail: "Page 2, Line 19 · Pediatrics Clinic" },
                { marker: 2, source: "PediatricChart_Adebayo.pdf", detail: "Page 5, Line 3 · Encounter History" },
            ],
            discrepancy:
                "The school action plan lists Albuterol every 4 hours PRN while the chart specifies every 6 hours PRN. Please confirm the active plan.",
            nextSteps: ["Update school asthma action plan", "Query spirometry trend since 2021"],
        },
        documents: [
            { name: "PediatricChart_Adebayo.pdf", category: "Pediatric Chart", source: "Mount Sinai Kravis Children's", sizeMb: 6.8, uploaded: "Oct 5, 2023", relevance: { level: "High", score: 93 }, status: "PHI Redacted" },
        ],
    },
];

export function findPatient(mrn: string | undefined): Patient | undefined {
    return PATIENTS.find((patient) => patient.mrn === mrn);
}
