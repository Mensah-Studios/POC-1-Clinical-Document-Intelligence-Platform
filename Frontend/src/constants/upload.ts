export const UPLOAD_CONTENT = {
    title: "Upload Clinical Records",
    notice:
        "Files are PHI-redacted locally before any LLM processing. Every upload is audit-logged against " +
        "your institutional BAA.",
    form: {
        heading: "Secure Document Ingestion",
        description: "Attach source files to a patient's longitudinal ledger for indexing and citation.",
        patientLabel: "Target Patient Ledger",
        queueLabel: "Files queued for ingestion",
        clear: "Clear Queue",
        submit: "Begin Secure Ingestion",
    },
    dropZone: {
        label: "Upload clinical files",
        heading: "Drag & drop clinical files, or browse",
        hint: "PDF, TIFF, PNG or JPEG · up to 50 MB per file",
    },
    pipeline: {
        heading: "Ingestion Pipeline",
        description: "Each file passes through these stages before it becomes queryable.",
        steps: [
            { title: "Local PHI Redaction", description: "Identifiers are tokenized on-premise before leaving the node." },
            { title: "OCR Transcription", description: "Scans and TIFF panels are transcribed into citable text." },
            { title: "Longitudinal Embedding", description: "Content is merged into the patient's memory bank." },
            { title: "Citation Indexing", description: "Page, line and column anchors are recorded for every fact." },
        ],
    },
};

export const ACCEPTED_FILE_TYPES = ".pdf,.tif,.tiff,.png,.jpg,.jpeg";
