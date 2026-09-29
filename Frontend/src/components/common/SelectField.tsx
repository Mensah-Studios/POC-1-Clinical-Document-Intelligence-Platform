import type { JSX } from "react/jsx-runtime";
import { ChevronDownIcon } from "../icons/Icons";
import type { SelectFieldProps } from "../../Types/SelectFieldProps";

export default function SelectField({ id, label, value, options, onChange, hideLabel = false }: SelectFieldProps): JSX.Element {
    return <div className="flex flex-col gap-2">
        <label htmlFor={id} className={hideLabel ? "sr-only" : "text-sm font-semibold text-slate-1"}>{label}</label>
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-md border border-border-color bg-surface-1 py-2.5 pr-10 pl-3 text-sm text-slate-1 outline-none focus:border-teal-1 focus:ring-2 focus:ring-teal-1/20"
            >
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-2" />
        </div>
    </div>
}
