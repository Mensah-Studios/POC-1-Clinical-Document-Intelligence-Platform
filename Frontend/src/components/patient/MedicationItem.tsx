import type { JSX } from "react/jsx-runtime";
import type { MedicationItemProps } from "../../Types/MedicationItemProps";

export default function MedicationItem({ medication }: MedicationItemProps): JSX.Element {
    return <li className="flex items-center justify-between rounded-md border border-border-color px-3 py-3">
        <span className="text-sm font-semibold text-slate-1">{medication.name}</span>
        <span className="text-xs text-slate-3">Refilled: {medication.refilled}</span>
    </li>
}
