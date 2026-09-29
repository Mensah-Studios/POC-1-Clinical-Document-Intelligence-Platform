export const ROUTES = {
    login: "/",
    home: "/home",
    upload: "/upload-documents",
    search: "/search",
    patient: "/patients/:mrn",
    patientSummary: "/patients/:mrn/summary",
    patientDocuments: "/patients/:mrn/documents",
    patientUpdate: "/patients/:mrn/update",
    patientDelete: "/patients/:mrn/delete",
};

export type PatientSection = "summary" | "documents" | "update" | "delete";

export function patientPath(mrn: string, section?: PatientSection): string {
    return section ? `/patients/${mrn}/${section}` : `/patients/${mrn}`;
}
