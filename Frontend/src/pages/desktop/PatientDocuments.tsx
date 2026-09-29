import { useState } from "react";
import { useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import LinkButton from "../../components/common/LinkButton";
import SelectField from "../../components/common/SelectField";
import SourceDocumentRow from "../../components/patient/SourceDocumentRow";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { PATIENT_DOCUMENTS_CONTENT, findPatient } from "../../constants/patients";
import { ROUTES } from "../../constants/routes";

const ALL_FORMATS = PATIENT_DOCUMENTS_CONTENT.formats[0];

function formatOf(fileName: string): string {
    const extension = fileName.split(".").pop()?.toUpperCase() ?? "";
    return extension === "TIF" ? "TIFF" : extension;
}

export default function PatientDocuments(): JSX.Element {
    const { mrn = "" } = useParams();
    const [format, setFormat] = useState(ALL_FORMATS);
    const patient = findPatient(mrn);
    const content = PATIENT_DOCUMENTS_CONTENT;

    if (!patient) {
        return <>
            <TopBar title={content.title} />
            <div className="p-8"><PatientNotFound mrn={mrn} /></div>
        </>
    }

    const documents = format === ALL_FORMATS
        ? patient.documents
        : patient.documents.filter((document) => formatOf(document.name) === format);

    return <>
        <TopBar title={content.title} />
        <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-lg font-bold text-slate-1">{content.heading}</h2>
                    <p className="text-xs text-slate-3">{patient.name} · MRN: {patient.mrn}</p>
                </div>
                <div className="flex items-center gap-3">
                    <SelectField id="document-format" label={content.filterLabel} hideLabel value={format} options={content.formats} onChange={setFormat} />
                    <LinkButton to={`${ROUTES.upload}?mrn=${patient.mrn}`}>{content.uploadNew}</LinkButton>
                </div>
            </div>

            {documents.length > 0
                ? <ul aria-label={content.heading} className="flex flex-col gap-3">
                    {documents.map((document) => <SourceDocumentRow key={document.name} document={document} />)}
                </ul>
                : <p className="rounded-lg border border-dashed border-border-color bg-surface-1 p-8 text-center text-sm text-slate-3">{content.empty}</p>}
        </div>
    </>
}
