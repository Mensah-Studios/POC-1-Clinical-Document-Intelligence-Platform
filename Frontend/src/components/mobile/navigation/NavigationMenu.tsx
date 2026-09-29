import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import NavigationMenuItem from "./NavigationMenuItem";
import { CircleXIcon } from "../../icons/Icons";
import { MOBILE_MENU_CONTENT, MOBILE_NAV_ITEMS, MOBILE_WORKSPACE_TOOLS } from "../../../constants/mobile";
import { isNavItemActive } from "../../../utils/navigation";
import type { NavigationMenuProps } from "../../../Types/NavigationMenuProps";
import type { MobileNavItemConfig } from "../../../Types/MobileNavItemConfig";

export default function NavigationMenu({ open, onClose }: NavigationMenuProps): JSX.Element | null {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!open) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const content = MOBILE_MENU_CONTENT;
    const renderItem = (item: MobileNavItemConfig) => (
        <NavigationMenuItem
            key={item.label}
            label={item.label}
            description={item.description}
            icon={<item.icon className="size-5" />}
            to={item.to}
            active={isNavItemActive(item, pathname)}
            onNavigate={onClose}
        />
    );

    return <div className="fixed inset-0 z-40 flex flex-col justify-end">
        <button type="button" aria-label={content.close} tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-slate-1/40" />
        <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="relative max-h-[85svh] overflow-y-auto rounded-t-2xl bg-surface-1 pb-[env(safe-area-inset-bottom)]"
        >
            <div className="px-4 pt-5 pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{content.eyebrow}</p>
                        <h2 id="mobile-menu-title" className="font-heading text-xl font-bold text-slate-1">{content.title}</h2>
                    </div>
                    <button type="button" aria-label={content.close} autoFocus onClick={onClose} className="cursor-pointer rounded-lg border border-border-color p-2 text-slate-1">
                        <CircleXIcon className="size-4" />
                    </button>
                </div>
                <p className="mt-2 text-sm text-slate-3">{content.description}</p>

                <h3 className="mt-5 mb-2 text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{content.primaryHeading}</h3>
                <ul aria-label={content.primaryHeading} className="flex flex-col gap-2">{MOBILE_NAV_ITEMS.map(renderItem)}</ul>

                <h3 className="mt-5 mb-2 text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{content.toolsHeading}</h3>
                <ul aria-label={content.toolsHeading} className="flex flex-col gap-2">{MOBILE_WORKSPACE_TOOLS.map(renderItem)}</ul>
            </div>
            <footer className="border-t border-border-color bg-surface-2 px-4 py-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-2 px-2.5 py-1 text-[11px] font-semibold text-green-1 uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-green-1" />
                    {content.footerBadge}
                </span>
                <p className="mt-2 text-xs text-slate-3">{content.footer}</p>
            </footer>
        </section>
    </div>
}
