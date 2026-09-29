import { CloudUploadIcon, KeyIcon, LayoutGridIcon, ShieldCheckIcon, UserIcon, UsersIcon } from "../components/icons/Icons";
import type { MobileNavItemConfig } from "../Types/MobileNavItemConfig";
import { APP_NAME } from "./navigation";
import { ROUTES } from "./routes";

export const MOBILE_NAV_ITEMS: MobileNavItemConfig[] = [
    { label: "Home", description: "Dashboard and daily clinical overview", icon: LayoutGridIcon, to: ROUTES.home },
    { label: "Patients", description: "Active roster and patient chart access", icon: UsersIcon, to: ROUTES.search, matches: ["/patients"] },
    { label: "Upload", description: "Import documents and intake files", icon: CloudUploadIcon, to: ROUTES.upload },
    { label: "Account", description: "Profile, preferences, and identity", icon: UserIcon },
];

export const MOBILE_WORKSPACE_TOOLS: MobileNavItemConfig[] = [
    { label: "Token Management", description: "Manage API keys and secure access", icon: KeyIcon },
    { label: "Security Settings", description: "Audit logs, permissions, and compliance", icon: ShieldCheckIcon },
];

export const MOBILE_MENU_CONTENT = {
    eyebrow: "Navigation Menu",
    title: APP_NAME,
    description: "Access your workspace, patient roster, uploads, and security controls from one place.",
    primaryHeading: "Primary Destinations",
    toolsHeading: "Workspace Tools",
    footerBadge: "HIPAA Secure",
    footer: "Protected navigation for clinical teams and secure patient workflows.",
    close: "Close navigation menu",
    tabBarLabel: "Primary",
};

export const MOBILE_HEADER_BADGES = {
    logged: "Logged",
    hipaa: "HIPAA Secure",
};

export const MOBILE_CLINICAL_DISCLAIMER =
    "Synthesized information presents a high-confidence index tool mapping sources within Mount Sinai's EHR. " +
    "Does not replace physician diagnosis.";

export const MOBILE_LOGIN_CONTENT = {
    hero: {
        heading: "Secure, Longitudinal Patient Ledger Analysis",
        description:
            "Leverage enterprise-grade Clinical LLMs to query charts, scans, and PDFs securely. Patient token " +
            "redaction runs locally prior to any analysis.",
    },
    brandCard: {
        badge: "HIPAA Secure",
        description: "Secure institutional access for authorized clinical staff.",
    },
    signIn: {
        heading: "Institutional Access",
        description: "Mount Sinai hospital BAA agreement authorization.",
    },
    authProviders: {
        epic: "Continue with Epic EHR Login",
        sso: "Active Directory / SSO",
    },
    reset: "Reset",
    submit: "Secure Auth & MFA",
    complianceNotice:
        "Access registration occurs under Dr. Linus Patel compliance credentials. Institutional audits are kept " +
        "in write-once WORM servers.",
};

export const MOBILE_DASHBOARD_CONTENT = {
    title: `${APP_NAME} Dashboard`,
    stats: {
        ledgers: { label: "Patient Ledgers", value: "4,281 Patients", caption: "+24 today" },
        accuracy: { label: "Citation Accuracy", value: "99.87% Accurate", caption: "0 hallucinations" },
    },
    tokens: {
        heading: "Token Quota Limit",
        description: "Enterprise group query quota allocation",
        used: "Used Quota:",
        utilizedSuffix: "% of limits utilized",
        allocate: "Allocate Tokens",
    },
    synthesis: { heading: "Active Analysis Summary: Heart Failure" },
    recentFiles: { heading: "Recently Ingested Patient Files" },
};

export const MOBILE_UPLOAD_CONTENT = {
    title: `${APP_NAME} Upload`,
    target: {
        label: "Active Patient File Target",
        change: "Change Target Patient",
        done: "Confirm Target Patient",
        selectLabel: "Target patient",
    },
    picker: {
        label: "Upload clinical files",
        heading: "Tap to take clinical photo or upload file",
        hint: "Supports PDF, JPEG, TIFF, and DICOM formats",
        button: "Choose File",
    },
    queue: {
        heading: "Local Redaction Queue",
        badge: "Redaction Active",
        status: "Queued",
        empty: "No files queued yet. Choose a file to begin local PHI redaction.",
        submit: "Begin Secure Ingestion",
    },
};

export const MOBILE_ACCEPTED_FILE_TYPES = "image/*,.pdf,.tif,.tiff,.dcm";

export const MOBILE_SEARCH_CONTENT = {
    title: "Clinical Search Index",
    finder: {
        heading: "Semantic Cohort & Patient Finder",
        label: "Natural-language patient query",
        placeholder: "Patients with congestive heart failure and ejection fraction < 45%...",
        badge: "Semantic Index Active",
    },
    filtersHeading: "Structured Filters",
    results: {
        heading: (count: number) => `Patient Match Results (${count} identified)`,
        relevance: (score: number) => `${score}% Relevance`,
    },
};

export const MOBILE_PATIENT_CONTENT = {
    activeLabel: "Active Clinical Ledger File",
    overview: {
        title: `${APP_NAME} Clinical Overview`,
        subtitle: "Comprehensive patient chart mapping index.",
        demographics: "Demographics & Allergies",
        address: "Address",
        emergencyContact: "Emergency Contact",
        allergies: "Allergies Index",
        problems: "Active Problem List & Rx",
        conditions: "Conditions",
        medications: "Medications",
        careTeam: "Assigned Care Team",
        copilot: {
            heading: "Clinical AI Copilot Query",
            label: "Clinical question",
            placeholder: "Ask: \"Is there any history of ACE-I cough?\"",
            submit: "Ask Copilot",
        },
        workspaces: {
            heading: "Patient Workspaces",
            summary: { title: "Health Summary", description: "Synthesis, evidence and contradictions" },
            documents: { title: "Ledger Documents", description: "Source files and PHI redaction" },
            update: { title: "Update Demographics", description: "Registry details and consent" },
            purge: { title: "Compliance Redaction", description: "Permanent deletion · irreversible" },
        },
    },
    summary: {
        title: "Clinical Synthesis",
        subtitle: "Validated machine learning audit mapping.",
        verified: "Verified Evidence",
        citations: "Traceable Excerpt Citations",
        gaps: "Clinical Gaps Identified",
        followUps: "Suggested Follow-up Inquiries",
        disclaimer:
            "Verification required under Dr. Linus Patel BAA compliance. Synthesized results are for index mapping " +
            "purposes and do not replace professional physical diagnosis.",
    },
    documents: {
        title: "Ledger Documents",
        subtitle: "Federated patient file attachments.",
        filterLabel: "Filter documents by format",
        allFormats: "All",
        relevance: "Relevance",
        ocrStatus: { "PHI Redacted": "OCR Status: Ingested", "OCR Transcribed": "OCR Status: Transcribed" },
        empty: "No source files match this filter.",
        uploadNew: "Upload New Source",
    },
    update: {
        title: "Update Demographics",
        subtitle: "Compliance audit ledger modification panel.",
        unsaved: "You have unsaved HIPAA-audit tracked field changes.",
        unsavedField: "* Unsaved modification",
        fields: {
            name: "Patient Full Name",
            email: "Patient Authorized Email",
            emergencyContact: "Emergency Contact",
        },
        consent: {
            heading: "Consent & Governance",
            label: "BAA Data Sharing Opt-in",
        },
        auditNote:
            "Compliance Auditing: Action records are permanently appended to Dr. Patel's credential log. System " +
            "executes ledger verification prior to saving.",
        save: "Save Changes",
        cancel: "Cancel",
    },
    delete: {
        title: "Compliance Redaction",
        subtitle: "Irreversible patient files delete panel.",
        warningTitle: "Permanent Redaction Warning",
        warning: "Executing this protocol deletes the clinical analysis index, trace citations, and references for",
        impactHeading: "Redaction Impact Audit",
        impact: (documents: number, citations: number) => [
            `${documents} Local ingestion documents deleted`,
            `${citations} Active synthesis citations invalidated`,
            "Permanent WORM server deletion record appended",
        ],
        confirmWord: "DELETE",
        confirmLabel: "Type \"DELETE\" to confirm irreversible protocol:",
        reasonLabel: "Required Compliance Reason",
        reasons: ["Patient request / Data Opt-out", "Duplicate ledger record", "Retention period expired", "Erroneous ingestion"],
        legalHold:
            "Legal Hold Notice: Verify patient is not subject to an active medical litigation lock. Compliance " +
            "records of this delete action cannot be removed.",
        submit: "Execute Deletion",
        cancel: "Cancel",
    },
};
