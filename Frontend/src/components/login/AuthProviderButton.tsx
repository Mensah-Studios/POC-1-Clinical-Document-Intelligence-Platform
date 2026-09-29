import type { JSX } from "react/jsx-runtime";
import type { AuthProviderButtonProps } from "../../Types/AuthProviderButtonProps";

export default function AuthProviderButton({ icon, label, onClick }: AuthProviderButtonProps): JSX.Element {
    return <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border-color bg-surface-2 py-2.5 text-sm font-semibold text-slate-1 transition-colors hover:bg-surface-3"
    >
        {icon}
        {label}
    </button>
}
