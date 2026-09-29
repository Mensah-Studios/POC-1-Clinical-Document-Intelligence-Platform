import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import type { SidebarNavItemProps } from "../../Types/SidebarNavItemProps";
import { NAV_UNAVAILABLE_HINT } from "../../constants/navigation";

const BASE = "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors";

export default function SidebarNavItem({ label, icon, to, active }: SidebarNavItemProps): JSX.Element {
    if (!to) {
        return <li>
            <span role="link" aria-disabled="true" title={NAV_UNAVAILABLE_HINT} className={`${BASE} cursor-not-allowed text-slate-2`}>
                {icon}
                {label}
            </span>
        </li>
    }

    return <li>
        <Link
            to={to}
            aria-current={active ? "page" : undefined}
            className={`${BASE} ${active ? "bg-surface-3 font-semibold text-teal-1" : "text-slate-2 hover:bg-surface-2"}`}
        >
            {icon}
            <span className="flex-1">{label}</span>
            {active && <span aria-hidden="true" className="h-4 w-1 rounded-full bg-teal-1" />}
        </Link>
    </li>
}
