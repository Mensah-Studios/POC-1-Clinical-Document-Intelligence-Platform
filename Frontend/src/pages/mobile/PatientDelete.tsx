import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import LinkButton from "../../components/common/LinkButton";
import SelectField from "../../components/common/SelectField";
import TextField from "../../components/common/TextField";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { AlertTriangleIcon } from "../../components/icons/Icons";
import { MOBILE_PATIENT_CONTENT } from "../../constants/mobile";
import { findPatient } from "../../constants/patients";
import { ROUTES, patientPath } from "../../constants/routes";
import type { Patient } from "../../Types/Patient";

const content = MOBILE_PATIENT_CONTENT.delete;

function RedactionRequest({ patient }: { patient: Patient }): JSX.Element {
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState("");
    const [reason, setReason] = useState(content.reasons[0]);
    const authorized = confirmation.trim() === content.confirmWord;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!authorized) return;
        navigate(ROUTES.search);
    }

    return <>
        <section aria-labelledby="mobile-redaction-warning" className="rounded-xl border border-danger-1 bg-danger-2 p-4">
            <h2 id="mobile-redaction-warning" className="flex items-center gap-2 font-heading text-lg font-bold text-danger-1">
                <AlertTriangleIcon className="size-5" />
                {content.warningTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-1">
                {content.warning} <strong>{patient.name} (MRN: {patient.mrn})</strong>.
            </p>
        </section>

        <section aria-labelledby="mobile-impact-heading" className="rounded-xl border border-border-color bg-surface-1 p-4">
            <h2 id="mobile-impact-heading" className="mb-2 text-sm font-bold text-slate-1">{content.impactHeading}</h2>
            <ul className="flex list-inside list-disc flex-col gap-1 text-xs text-slate-3">
                {content.impact(patient.documents.length, patient.summary.citations.length).map((line) => <li key={line}>{line}</li>)}
            </ul>
        </section>

        <form aria-label={content.warningTitle} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
                id="mobile-redaction-confirm"
                label={content.confirmLabel}
                tone="danger"
                autoComplete="off"
                autoCapitalize="characters"
                required
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
            />
            <SelectField id="mobile-redaction-reason" label={content.reasonLabel} value={reason} options={content.reasons} onChange={setReason} />
            <AlertBanner tone="warning">{content.legalHold}</AlertBanner>
            <div className="grid grid-cols-2 gap-3">
                <Button type="submit" variant="danger" className="py-3" disabled={!authorized}>{content.submit}</Button>
                <LinkButton to={patientPath(patient.mrn)} variant="secondary" className="py-3">{content.cancel}</LinkButton>
            </div>
        </form>
    </>
}

export default function MobilePatientDelete(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);

    return <>
        <MobileHeader title={content.title} subtitle={content.subtitle} badge="hipaa" />
        <div className="flex flex-col gap-4 p-4">
            {patient ? <RedactionRequest key={patient.mrn} patient={patient} /> : <PatientNotFound mrn={mrn} />}
        </div>
    </>
}
