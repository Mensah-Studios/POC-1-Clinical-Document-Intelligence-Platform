import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import ActivePatientCard from "../../components/mobile/patient/ActivePatientCard";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import LinkButton from "../../components/common/LinkButton";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { AlertTriangleIcon } from "../../components/icons/Icons";
import { MOBILE_PATIENT_CONTENT } from "../../constants/mobile";
import { findPatient } from "../../constants/patients";
import { patientPath } from "../../constants/routes";
import type { Patient } from "../../Types/Patient";

const content = MOBILE_PATIENT_CONTENT.update;

type TextFieldKey = "name" | "email" | "emergencyContact";

function DemographicsForm({ patient }: { patient: Patient }): JSX.Element {
    const navigate = useNavigate();
    const initial = {
        name: patient.name,
        email: patient.email,
        emergencyContact: patient.emergencyContact,
        deidentificationBypass: patient.deidentificationBypass,
    };
    const [form, setForm] = useState(initial);
    const dirty = (Object.keys(initial) as (keyof typeof initial)[]).some((key) => form[key] !== initial[key]);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate(patientPath(patient.mrn));
    }

    function renderField(key: TextFieldKey, type = "text") {
        const changed = form[key] !== initial[key];
        const id = `mobile-registry-${key}`;
        return <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <label htmlFor={id} className="text-sm font-semibold text-slate-1">{content.fields[key]}</label>
                {changed && <span className="text-[10px] font-semibold text-warning-1 uppercase">{content.unsavedField}</span>}
            </div>
            <input
                id={id}
                type={type}
                required={key !== "emergencyContact"}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={`w-full rounded-lg border bg-surface-1 px-3 py-3 text-sm text-slate-1 outline-none focus:ring-2 ${changed ? "border-2 border-warning-1 focus:ring-warning-1/20" : "border-border-color focus:border-teal-1 focus:ring-teal-1/20"}`}
            />
        </div>
    }

    return <form aria-label={content.title} onSubmit={handleSubmit} className="flex flex-col gap-4">
        {dirty && <AlertBanner tone="warning" icon={<AlertTriangleIcon className="size-4" />}>
            <span className="text-sm font-semibold text-slate-1">{content.unsaved}</span>
        </AlertBanner>}

        {renderField("name")}
        {renderField("email", "email")}
        {renderField("emergencyContact")}

        <section aria-labelledby="mobile-consent-heading" className="rounded-xl border border-border-color bg-surface-1 p-4">
            <h2 id="mobile-consent-heading" className="mb-3 text-sm font-bold text-slate-1">{content.consent.heading}</h2>
            <ToggleSwitch
                id="mobile-registry-consent"
                label={content.consent.label}
                checked={form.deidentificationBypass}
                onChange={(checked) => setForm({ ...form, deidentificationBypass: checked })}
            />
        </section>

        <p className="rounded-lg bg-surface-3 px-4 py-3 text-[11px] text-teal-1">{content.auditNote}</p>

        <div className="grid grid-cols-2 gap-3">
            <Button type="submit" className="py-3">{content.save}</Button>
            <LinkButton to={patientPath(patient.mrn)} variant="secondary" className="py-3">{content.cancel}</LinkButton>
        </div>
    </form>
}

export default function MobilePatientUpdate(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);

    return <>
        <MobileHeader title={content.title} subtitle={content.subtitle} badge="hipaa" />
        <div className="flex flex-col gap-4 p-4">
            {patient
                ? <>
                    <ActivePatientCard patient={patient} label={MOBILE_PATIENT_CONTENT.activeLabel} />
                    <DemographicsForm key={patient.mrn} patient={patient} />
                </>
                : <PatientNotFound mrn={mrn} />}
        </div>
    </>
}
