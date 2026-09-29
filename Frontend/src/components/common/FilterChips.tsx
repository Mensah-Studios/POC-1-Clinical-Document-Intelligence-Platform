import type { JSX } from "react/jsx-runtime";
import type { FilterChipsProps } from "../../Types/FilterChipsProps";

export default function FilterChips({ label, options, value, onChange }: FilterChipsProps): JSX.Element {
    return <div role="group" aria-label={label} className="flex gap-2 overflow-x-auto">
        {options.map((option) => {
            const selected = option.value === value;
            return <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(option.value)}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold ${selected ? "border-teal-1 bg-teal-1 text-surface-1" : "border-border-color bg-surface-1 text-slate-2"}`}
            >
                {option.label} ({option.count})
            </button>
        })}
    </div>
}
