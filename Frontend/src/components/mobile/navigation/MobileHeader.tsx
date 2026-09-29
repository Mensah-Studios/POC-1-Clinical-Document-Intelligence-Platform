import type { JSX } from "react/jsx-runtime";
import { ShieldCheckIcon } from "../../icons/Icons";
import { APP_NAME } from "../../../constants/navigation";
import { MOBILE_HEADER_BADGES } from "../../../constants/mobile";
import type { MobileHeaderProps } from "../../../Types/MobileHeaderProps";

export default function MobileHeader({ title, subtitle, badge }: MobileHeaderProps): JSX.Element {
    return <header className="sticky top-0 z-20 border-b border-border-color bg-surface-1 px-4 py-3">
        <div className="flex items-center gap-3">
            <span role="img" aria-label={`${APP_NAME} logo`} className="flex size-8 shrink-0 items-center justify-center rounded-md bg-teal-1 text-surface-1">
                <ShieldCheckIcon className="size-5" />
            </span>
            <h1 className="min-w-0 flex-1 truncate font-heading text-lg font-bold text-slate-1">{title}</h1>
            <p role="status" className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-2 px-2.5 py-1 text-[11px] font-semibold text-green-1 uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-green-1" />
                {MOBILE_HEADER_BADGES[badge]}
            </p>
        </div>
        {subtitle && <p className="mt-1 text-xs text-slate-3">{subtitle}</p>}
    </header>
}
