import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { NAV_UNAVAILABLE_HINT } from "../../../constants/navigation";
import type { NavigationMenuItemProps } from "../../../Types/NavigationMenuItemProps";

const BASE = "flex items-center gap-4 rounded-lg border px-4 py-3";

export default function NavigationMenuItem({ label, description, icon, to, active, onNavigate }: NavigationMenuItemProps): JSX.Element {
    const content = <>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${active ? "border-teal-1 bg-teal-1 text-surface-1" : "border-border-color bg-surface-1 text-slate-2"}`}>
            {icon}
        </span>
        <span>
            <span className={`block text-sm font-semibold ${active ? "text-teal-1" : "text-slate-1"}`}>{label}</span>
            <span className="block text-xs text-slate-3">{description}</span>
        </span>
    </>;

    if (!to) {
        return <li>
            <span role="link" aria-disabled="true" title={NAV_UNAVAILABLE_HINT} className={`${BASE} cursor-not-allowed border-border-color bg-surface-2`}>
                {content}
            </span>
        </li>
    }

    return <li>
        <Link
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`${BASE} ${active ? "border-teal-1/40 bg-surface-3" : "border-border-color bg-surface-2"}`}
        >
            {content}
        </Link>
    </li>
}
