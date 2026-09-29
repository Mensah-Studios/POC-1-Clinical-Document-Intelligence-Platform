import type { ReactNode } from "react";

export type SidebarNavItemProps = {
    label: string;
    icon: ReactNode;
    to?: string;
    active: boolean;
};
