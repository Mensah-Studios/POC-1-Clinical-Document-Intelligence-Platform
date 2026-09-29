import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { CURRENT_USER } from "../../constants/navigation";
import { PATIENT_UPDATE_CONTENT, findPatient } from "../../constants/patients";
import { patientPath } from "../../constants/routes";
import type { Patient } from "../../Types/Patient";

function RegistryForm({ patient }: { patient: Patient }): JSX.Element {
    const navigate = useNavigate();
    const initial = {
        name: patient.name,
        email: patient.email,
        emergencyContact: patient.emergencyContact,
        deidentificationBypass: patient.deidentificationBypass,
    };
    const [form, setForm] = useState(initial);
    const { fields, bypass } = PATIENT_UPDATE_CONTENT;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate(patientPath(patient.mrn));
    }

    return <Card title={PATIENT_UPDATE_CONTENT.heading(patient.name)} className="p-8">
        <form aria-label={PATIENT_UPDATE_CONTENT.heading(patient.name)} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <TextField id="registry-name" label={fields.name} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField id="registry-email" label={fields.email} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <TextField id="registry-mrn" label={fields.mrn} readOnly value={`${patient.mrn} ${fields.mrnSuffix}`} />
                <TextField id="registry-emergency" label={fields.emergencyContact} value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
            </div>

            <hr className="border-border-color" />

            <ToggleSwitch
                id="registry-bypass"
                label={bypass.label}
                description={bypass.description}
                checked={form.deidentificationBypass}
                onChange={(checked) => setForm({ ...form, deidentificationBypass: checked })}
            />

            <p className="rounded-md bg-surface-2 px-4 py-3 text-[11px] text-slate-3">
                {PATIENT_UPDATE_CONTENT.auditNote(CURRENT_USER.name)}
            </p>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" className="px-5 py-3" onClick={() => setForm(initial)}>{PATIENT_UPDATE_CONTENT.discard}</Button>
                <Button type="submit" className="px-5 py-3">{PATIENT_UPDATE_CONTENT.commit}</Button>
            </div>
        </form>
    </Card>
}

export default function PatientUpdate(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);

    return <>
        <TopBar title={PATIENT_UPDATE_CONTENT.title} />
        <div className="flex flex-col gap-6 p-8">
            {patient
                ? <>
                    <AlertBanner tone="warning" icon={<span className="block size-2 rounded-full bg-warning-1" />}>
                        {PATIENT_UPDATE_CONTENT.notice}
                    </AlertBanner>
                    <RegistryForm key={patient.mrn} patient={patient} />
                </>
                : <PatientNotFound mrn={mrn} />}
        </div>
    </>
}
