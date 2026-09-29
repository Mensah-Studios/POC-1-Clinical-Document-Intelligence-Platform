import { useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import SidebarBrand from "./SidebarBrand";
import SidebarNavItem from "./SidebarNavItem";
import SessionCard from "./SessionCard";
import { NAV_ITEMS } from "../../constants/navigation";
import { isNavItemActive } from "../../utils/navigation";

export default function Sidebar(): JSX.Element {
    const { pathname } = useLocation();

    return <aside aria-label="Sidebar" className="flex w-70 shrink-0 flex-col justify-between overflow-y-auto border-r border-border-color bg-surface-1 px-4 py-6">
        <div className="flex flex-col gap-8">
            <SidebarBrand />
            <nav aria-label="Primary">
                <ul className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                        <SidebarNavItem
                            key={item.label}
                            label={item.label}
                            icon={<item.icon className="size-5 shrink-0" />}
                            to={item.to}
                            active={isNavItemActive(item, pathname)}
                        />
                    ))}
                </ul>
            </nav>
        </div>
        <SessionCard />
    </aside>
}
