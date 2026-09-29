import type { JSX } from "react/jsx-runtime";
import { ShieldCheckIcon } from "../icons/Icons";
import { APP_NAME, COMPLIANCE_LABEL } from "../../constants/navigation";

export default function SidebarBrand(): JSX.Element {
    return <div className="flex flex-col gap-4">
        <div role="img" aria-label={`${APP_NAME} logo`} className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-teal-1 text-surface-1">
                <ShieldCheckIcon className="size-5" />
            </div>
            <span className="font-heading text-lg font-bold text-slate-1">{APP_NAME}</span>
        </div>
        <p className="flex items-center gap-2 rounded-md bg-green-2 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-green-1 uppercase">
            <ShieldCheckIcon className="size-3.5" />
            {COMPLIANCE_LABEL}
        </p>
    </div>
}
