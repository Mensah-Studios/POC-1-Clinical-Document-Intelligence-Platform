import type { ReactNode } from "react";
import type { ButtonVariant } from "./ButtonVariant";

export type LinkButtonProps = {
    to: string;
    children: ReactNode;
    variant?: ButtonVariant;
    icon?: ReactNode;
    className?: string;
};
