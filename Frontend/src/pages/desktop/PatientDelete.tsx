import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import AlertBanner from "../../components/common/AlertBanner";
import Avatar from "../../components/common/Avatar";
import Button from "../../components/common/Button";
import LinkButton from "../../components/common/LinkButton";
import TextField from "../../components/common/TextField";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { AlertTriangleIcon } from "../../components/icons/Icons";
import { MFA_CODE_LENGTH, PATIENT_DELETE_CONTENT, findPatient } from "../../constants/patients";
import { ROUTES, patientPath } from "../../constants/routes";
import type { Patient } from "../../Types/Patient";

function PurgeRequest({ patient }: { patient: Patient }): JSX.Element {
    const navigate = useNavigate();
    const [confirmMrn, setConfirmMrn] = useState("");
    const [mfaCode, setMfaCode] = useState("");
    const content = PATIENT_DELETE_CONTENT;
    const authorized = confirmMrn.trim() === patient.mrn && new RegExp(`^\\d{${MFA_CODE_LENGTH}}$`).test(mfaCode);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!authorized) return;
        navigate(ROUTES.search);
    }

    return <section aria-labelledby="purge-heading" className="w-full max-w-2xl rounded-xl border-2 border-danger-1 bg-surface-1 px-8 py-10">
        <div className="flex flex-col items-center text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-danger-2 text-danger-1">
                <AlertTriangleIcon className="size-6" />
            </span>
            <h2 id="purge-heading" className="mt-4 font-heading text-xl font-bold text-danger-1">{content.heading}</h2>
            <p className="mt-2 text-sm text-slate-3">{content.warning}</p>
        </div>

        <div className="mt-6 rounded-lg border border-border-color bg-surface-2 p-4">
            <p className="text-[11px] font-semibold tracking-wide text-slate-2 uppercase">{content.targeted}</p>
            <div className="mt-3 flex items-center gap-3">
                <Avatar name={patient.name} size="sm" />
                <div>
                    <p className="text-sm font-bold text-slate-1">{patient.name}</p>
                    <p className="text-xs text-slate-3">
                        MRN: {patient.mrn} · {patient.documents.length} Linked Clinical Documents · {patient.summary.citations.length} Cited LLM Embeddings
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-6">
            <AlertBanner tone="danger">{content.retention}</AlertBanner>
        </div>

        <form aria-label={content.heading} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <TextField id="purge-mrn" label={content.mrnLabel(patient.mrn)} tone="danger" autoComplete="off" required value={confirmMrn} onChange={(e) => setConfirmMrn(e.target.value)} />
            <TextField id="purge-mfa" label={content.mfaLabel} type="password" inputMode="numeric" autoComplete="one-time-code" maxLength={MFA_CODE_LENGTH} required value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
                <LinkButton to={patientPath(patient.mrn)} variant="secondary" className="py-3">{content.cancel}</LinkButton>
                <Button type="submit" variant="danger" className="py-3" disabled={!authorized}>{content.submit}</Button>
            </div>
        </form>
    </section>
}

export default function PatientDelete(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);

    return <>
        <TopBar title={PATIENT_DELETE_CONTENT.title} />
        <div className="flex flex-1 items-center justify-center p-8">
            {patient ? <PurgeRequest key={patient.mrn} patient={patient} /> : <PatientNotFound mrn={mrn} />}
        </div>
    </>
}
