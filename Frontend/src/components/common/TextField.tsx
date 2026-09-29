import type { JSX } from "react/jsx-runtime";
import type { TextFieldProps } from "../../Types/TextFieldProps";

export default function TextField({ id, label, tone = "default", readOnly, className, ...inputProps }: TextFieldProps): JSX.Element {
    const border = tone === "danger"
        ? "border-danger-1 focus:ring-danger-1/20"
        : "border-border-color focus:border-teal-1 focus:ring-teal-1/20";

    return <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-slate-1">{label}</label>
        <input
            {...inputProps}
            id={id}
            readOnly={readOnly}
            className={`w-full rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-2 ${border} ${readOnly ? "bg-surface-2 text-slate-3" : "bg-surface-1 text-slate-1"} ${className ?? ""}`}
        />
    </div>
}
