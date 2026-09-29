export const BRAND_NAME = "CuraClinics Intelligence";

export const FEATURES = [
    {
        title: "HIPAA Compliant Data Redaction",
        description: "Patient identifying tokens are redacted locally prior to any LLM analysis.",
    },
    {
        title: "Point-to-Point Encryption",
        description: "AES-256 state and payload encryption with continuous institutional audit logging.",
    },
    {
        title: "SSO & Epic/Cerner EHR Integration",
        description: "Federated access synced directly with patient MRNs.",
    },
];

export const CERTIFICATIONS = ["HIPAA Compliant", "SOC 2 Type II Secure", "ISO 27001"];

export const LOGIN_CONTENT = {
    hero: {
        heading: "Secure, Longitudinal Patient Ledger Analysis",
        description:
            "Leverage enterprise-grade Clinical LLMs to query medical histories, scans, and PDFs with " +
            "natural language. Instantly cite evidence with audit-logged accuracy.",
    },
    signIn: {
        heading: "Institutional Access",
        description: "Sign in using your credentials linked to your hospital BAA agreement.",
    },
    authProviders: {
        epic: "Continue with Epic EHR Login",
        sso: "Enterprise SSO / Active Directory",
    },
    dividerLabel: "Or secure email",
    form: {
        emailLabel: "Organizational Email",
        emailPlaceholder: "l.patel@mountsinai.org",
        passwordLabel: "Security Password",
        resetCredentials: "Reset Credentials",
        submit: "Secure Authorization & MFA Verification",
    },
    complianceNotice:
        "All access attempts are registered with Mount Sinai's Compliance Officer. " +
        "Audit logs are persisted on write-once-read-many (WORM) hardware.",
};

export const PASSWORD_TOGGLE_LABELS = {
    show: "Show password",
    hide: "Hide password",
};
