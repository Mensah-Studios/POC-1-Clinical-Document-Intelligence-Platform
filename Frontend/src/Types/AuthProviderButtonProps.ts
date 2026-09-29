import type { ReactNode } from "react";

export type AuthProviderButtonProps = {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
};
