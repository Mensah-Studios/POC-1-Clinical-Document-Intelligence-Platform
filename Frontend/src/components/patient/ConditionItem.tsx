import type { JSX } from "react/jsx-runtime";
import type { ConditionItemProps } from "../../Types/ConditionItemProps";

export default function ConditionItem({ condition }: ConditionItemProps): JSX.Element {
    const high = condition.severity === "high";

    return <li className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm ${high ? "bg-surface-3 font-semibold text-teal-1" : "bg-surface-2 text-slate-1"}`}>
        <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${high ? "bg-danger-1" : "bg-warning-1"}`} />
        <span className="flex-1">{condition.name}</span>
        <span className="text-xs font-normal text-slate-3">Diagnosed: {condition.diagnosed}</span>
    </li>
}
