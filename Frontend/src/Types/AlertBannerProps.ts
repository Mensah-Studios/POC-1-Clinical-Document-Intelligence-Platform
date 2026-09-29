import type { ReactNode } from "react";

export type AlertBannerProps = {
    tone: "teal" | "warning" | "danger";
    children: ReactNode;
    title?: string;
    icon?: ReactNode;
};
