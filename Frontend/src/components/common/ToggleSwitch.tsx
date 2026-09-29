import type { JSX } from "react/jsx-runtime";
import type { ToggleSwitchProps } from "../../Types/ToggleSwitchProps";

export default function ToggleSwitch({ id, checked, onChange, label, description }: ToggleSwitchProps): JSX.Element {
    const descriptionId = `${id}-description`;

    return <div className="flex items-start gap-4">
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-describedby={description ? descriptionId : undefined}
            onClick={() => onChange(!checked)}
            className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${checked ? "bg-teal-1" : "bg-border-color"}`}
        >
            <span className={`absolute top-1 size-5 rounded-full bg-surface-1 shadow transition-all ${checked ? "left-6" : "left-1"}`} />
        </button>
        <div>
            <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-slate-1">{label}</label>
            {description && <p id={descriptionId} className="mt-0.5 text-xs text-slate-3">{description}</p>}
        </div>
    </div>
}
