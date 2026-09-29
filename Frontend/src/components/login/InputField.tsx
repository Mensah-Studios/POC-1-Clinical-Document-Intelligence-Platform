import type { JSX } from "react/jsx-runtime";
import type { InputFieldProps } from "../../Types/InputFieldProps";

export default function InputField({ icon, trailing, className, ...inputProps }: InputFieldProps): JSX.Element {
    return <div className="mt-2 flex items-center gap-2 rounded-md border border-border-color px-3 py-2.5 focus-within:border-teal-1 focus-within:ring-2 focus-within:ring-teal-1/20">
        {icon}
        <input
            {...inputProps}
            className={`w-full bg-transparent text-sm text-slate-1 outline-none placeholder:text-slate-3 ${className ?? ""}`}
        />
        {trailing}
    </div>
}
