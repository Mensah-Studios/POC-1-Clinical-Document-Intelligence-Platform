import type { ButtonVariant } from "../Types/ButtonVariant";
import type { Tone } from "../Types/Tone";

export const TONE_TEXT: Record<Tone, string> = {
    teal: "text-teal-1",
    green: "text-green-1",
    warning: "text-warning-1",
    danger: "text-danger-1",
    neutral: "text-slate-2",
};

export const TONE_SOFT: Record<Tone, string> = {
    teal: "bg-surface-3 text-teal-1",
    green: "bg-green-2 text-green-1",
    warning: "bg-warning-2 text-warning-1",
    danger: "bg-danger-2 text-danger-1",
    neutral: "bg-surface-2 text-slate-2",
};

export const TONE_BORDER: Record<Tone, string> = {
    teal: "border-teal-1/40",
    green: "border-green-1/40",
    warning: "border-warning-1/40",
    danger: "border-danger-3",
    neutral: "border-border-color",
};

export const TONE_FILL: Record<Tone, string> = {
    teal: "bg-teal-1",
    green: "bg-green-1",
    warning: "bg-warning-1",
    danger: "bg-danger-1",
    neutral: "bg-slate-3",
};

export const BUTTON_BASE =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
    primary: "bg-teal-1 text-surface-1 hover:bg-teal-2",
    secondary: "border border-border-color bg-surface-1 text-slate-1 hover:bg-surface-2",
    soft: "bg-surface-3 text-teal-1 hover:bg-teal-1/10",
    outline: "border border-teal-1 bg-surface-1 text-teal-1 hover:bg-surface-3",
    danger: "bg-danger-1 text-surface-1 hover:bg-danger-1/90",
    "danger-outline": "border border-danger-1 bg-surface-1 text-danger-1 hover:bg-danger-2",
};
