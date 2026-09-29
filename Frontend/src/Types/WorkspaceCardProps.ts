import type { Tone } from "./Tone";

export type WorkspaceCardProps = {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    tone: Tone;
    footnote: string;
    actionLabel: string;
    to: string;
};
