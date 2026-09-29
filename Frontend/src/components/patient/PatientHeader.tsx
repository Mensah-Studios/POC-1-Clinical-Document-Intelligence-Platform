import type { JSX } from "react/jsx-runtime";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import type { PatientHeaderProps } from "../../Types/PatientHeaderProps";

export default function PatientHeader({ patient }: PatientHeaderProps): JSX.Element {
    return <section aria-label="Patient profile" className="flex items-center gap-6 rounded-xl border border-border-color bg-surface-1 p-6">
        <Avatar name={patient.name} size="lg" />
        <div>
            <div className="flex items-center gap-3">
                <h2 className="font-heading text-2xl font-bold text-slate-1">{patient.name}</h2>
                <StatusBadge label={patient.riskFlag} tone="danger" uppercase bordered />
            </div>
            <p className="mt-1 text-sm text-slate-3">
                MRN: {patient.mrn} · {patient.sex} · {patient.age} Years Old · DOB: {patient.dob} · Contact: {patient.email}
            </p>
        </div>
    </section>
}
