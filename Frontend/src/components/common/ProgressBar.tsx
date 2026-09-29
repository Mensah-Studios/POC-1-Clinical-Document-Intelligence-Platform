import type { JSX } from "react/jsx-runtime";
import type { ProgressBarProps } from "../../Types/ProgressBarProps";
import { TONE_FILL } from "../../constants/styles";

export default function ProgressBar({ value, tone, label }: ProgressBarProps): JSX.Element {
    const clamped = Math.round(Math.min(100, Math.max(0, value)));

    return <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border-color"
    >
        <div className={`h-full rounded-full ${TONE_FILL[tone]}`} style={{ width: `${clamped}%` }} />
    </div>
}
