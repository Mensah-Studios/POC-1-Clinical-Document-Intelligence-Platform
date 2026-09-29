import type { ReactNode } from "react";
import type { Tone } from "./Tone";

export type MobileStatCardProps = {
    label: string;
    value: string;
    caption: string;
    icon: ReactNode;
    tone: Tone;
};
