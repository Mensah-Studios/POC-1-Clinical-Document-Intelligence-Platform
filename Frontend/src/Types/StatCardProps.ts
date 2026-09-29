import type { ReactNode } from "react";
import type { Tone } from "./Tone";

export type StatCardProps = {
    label: string;
    value: string;
    caption: string;
    captionTone: Tone;
    icon: ReactNode;
    iconTone: Tone;
    progress?: number;
};
