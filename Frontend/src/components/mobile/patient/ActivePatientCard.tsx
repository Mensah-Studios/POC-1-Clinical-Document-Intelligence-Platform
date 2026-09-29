import type { JSX } from "react/jsx-runtime";
import StatusBadge from "../../common/StatusBadge";
import { UserIcon } from "../../icons/Icons";
import type { ActivePatientCardProps } from "../../../Types/ActivePatientCardProps";

export default function ActivePatientCard({ patient, label }: ActivePatientCardProps): JSX.Element {
    return <section aria-label={label} className="rounded-xl border border-teal-1/30 bg-surface-3 p-4">
        <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-1 text-surface-1">
                <UserIcon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-wide text-slate-3 uppercase">{label}</p>
                <h2 className="font-heading text-lg font-bold text-teal-1">{patient.name}</h2>
            </div>
            {patient.efRatio !== undefined && <StatusBadge label={`EF ${patient.efRatio}%`} tone="danger" />}
        </div>
        <p className="mt-2 flex gap-4 text-xs text-slate-2">
            <span>MRN: <strong className="text-slate-1">{patient.mrn}</strong></span>
            <span>DOB: <strong className="text-slate-1">{patient.dob}</strong></span>
        </p>
    </section>
}
