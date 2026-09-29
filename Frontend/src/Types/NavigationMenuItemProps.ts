import type { ReactNode } from "react";

export type NavigationMenuItemProps = {
    label: string;
    description: string;
    icon: ReactNode;
    to?: string;
    active: boolean;
    onNavigate: () => void;
};
