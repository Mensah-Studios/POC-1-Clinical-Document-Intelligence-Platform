import type { ReactNode } from "react";
import type { Tone } from "./Tone";

export type StatusBadgeProps = {
    label: string;
    tone: Tone;
    icon?: ReactNode;
    uppercase?: boolean;
    bordered?: boolean;
};
