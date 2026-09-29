import type { JSX } from "react/jsx-runtime";
import type { DividerProps } from "../../Types/DividerProps";

export default function Divider({ label }: DividerProps): JSX.Element {
    return <div role="separator" aria-label={label} className="my-8 flex items-center gap-4">
        <hr aria-hidden="true" className="flex-1 border-border-color" />
        <span className="text-xs text-slate-3 uppercase">{label}</span>
        <hr aria-hidden="true" className="flex-1 border-border-color" />
    </div>
}
