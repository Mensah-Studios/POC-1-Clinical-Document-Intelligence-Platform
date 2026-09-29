import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileTabBar from "./MobileTabBar";
import NavigationMenu from "./NavigationMenu";

export default function MobileLayout(): JSX.Element {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPath, setMenuPath] = useState(pathname);

    // Any navigation (tab, link, back button) dismisses the menu sheet.
    if (pathname !== menuPath) {
        setMenuPath(pathname);
        setMenuOpen(false);
    }

    return <div className="flex min-h-svh flex-col bg-surface-2 pb-24 text-left font-body">
        <main className="flex flex-1 flex-col">
            <Outlet />
        </main>
        <MobileTabBar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
        <NavigationMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
}
