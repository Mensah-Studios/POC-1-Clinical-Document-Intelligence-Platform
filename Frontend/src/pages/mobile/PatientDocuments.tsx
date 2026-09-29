import { useState } from "react";
import { useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import ActivePatientCard from "../../components/mobile/patient/ActivePatientCard";
import MobileDocumentCard from "../../components/mobile/patient/MobileDocumentCard";
import FilterChips from "../../components/common/FilterChips";
import LinkButton from "../../components/common/LinkButton";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { MOBILE_PATIENT_CONTENT } from "../../constants/mobile";
import { findPatient } from "../../constants/patients";
import { ROUTES } from "../../constants/routes";
import type { SourceDocument } from "../../Types/Patient";

const content = MOBILE_PATIENT_CONTENT.documents;

function formatOf(document: SourceDocument): string {
    const extension = document.name.split(".").pop()?.toUpperCase() ?? "";
    return extension === "TIF" ? "TIFF" : extension;
}

export default function MobilePatientDocuments(): JSX.Element {
    const { mrn = "" } = useParams();
    const [format, setFormat] = useState(content.allFormats);
    const patient = findPatient(mrn);

    if (!patient) {
        return <>
            <MobileHeader title={content.title} subtitle={content.subtitle} badge="hipaa" />
            <div className="p-4"><PatientNotFound mrn={mrn} /></div>
        </>
    }

    const formats = [...new Set(patient.documents.map(formatOf))];
    const options = [
        { value: content.allFormats, label: content.allFormats, count: patient.documents.length },
        ...formats.map((value) => ({ value, label: value, count: patient.documents.filter((d) => formatOf(d) === value).length })),
    ];
    const documents = format === content.allFormats ? patient.documents : patient.documents.filter((d) => formatOf(d) === format);

    return <>
        <MobileHeader title={content.title} subtitle={content.subtitle} badge="hipaa" />
        <div className="flex flex-col gap-4 p-4">
            <ActivePatientCard patient={patient} label={MOBILE_PATIENT_CONTENT.activeLabel} />
            <FilterChips label={content.filterLabel} options={options} value={format} onChange={setFormat} />
            {documents.length > 0
                ? <ul aria-label={content.title} className="flex flex-col gap-3">
                    {documents.map((document) => <MobileDocumentCard key={document.name} document={document} />)}
                </ul>
                : <p className="rounded-xl border border-dashed border-border-color bg-surface-1 p-6 text-center text-sm text-slate-3">{content.empty}</p>}
            <LinkButton to={`${ROUTES.upload}?mrn=${patient.mrn}`} variant="outline" className="w-full py-3">{content.uploadNew}</LinkButton>
        </div>
    </>
}
