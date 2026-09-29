import { Link, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { MOBILE_MENU_CONTENT, MOBILE_NAV_ITEMS } from "../../../constants/mobile";
import { isNavItemActive } from "../../../utils/navigation";
import type { MobileTabBarProps } from "../../../Types/MobileTabBarProps";

const TAB = "flex flex-col items-center gap-1 py-2 text-[11px]";

function tabContent(icon: JSX.Element, label: string, active: boolean): JSX.Element {
    return <>
        <span className={`flex size-9 items-center justify-center rounded-lg ${active ? "bg-surface-3 text-teal-1" : "text-slate-3"}`}>{icon}</span>
        <span className={active ? "font-semibold text-teal-1" : "text-slate-3"}>{label}</span>
    </>
}

export default function MobileTabBar({ menuOpen, onMenuToggle }: MobileTabBarProps): JSX.Element {
    const { pathname } = useLocation();

    return <nav aria-label={MOBILE_MENU_CONTENT.tabBarLabel} className="fixed inset-x-0 bottom-0 z-30 border-t border-border-color bg-surface-1 pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-4">
            {MOBILE_NAV_ITEMS.map((item) => {
                const icon = <item.icon className="size-5" />;

                if (!item.to) {
                    return <li key={item.label}>
                        <button
                            type="button"
                            onClick={onMenuToggle}
                            aria-haspopup="dialog"
                            aria-expanded={menuOpen}
                            className={`${TAB} w-full cursor-pointer`}
                        >
                            {tabContent(icon, item.label, menuOpen)}
                        </button>
                    </li>
                }

                const active = !menuOpen && isNavItemActive(item, pathname);
                return <li key={item.label}>
                    <Link to={item.to} aria-current={active ? "page" : undefined} className={TAB}>
                        {tabContent(icon, item.label, active)}
                    </Link>
                </li>
            })}
        </ul>
    </nav>
}
