import type { NavItemConfig } from "../Types/NavItemConfig";

export function isNavItemActive(item: NavItemConfig, pathname: string): boolean {
    if (!item.to) return false;
    const prefixes = [item.to, ...(item.matches ?? [])];
    return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
