import type { ReactNode } from "react";

export type CardProps = {
    children: ReactNode;
    title?: string;
    titleAdornment?: ReactNode;
    description?: string;
    action?: ReactNode;
    className?: string;
};
