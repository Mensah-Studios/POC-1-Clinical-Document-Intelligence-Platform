import type { JSX } from "react/jsx-runtime";
import ProgressBar from "../common/ProgressBar";
import type { StatCardProps } from "../../Types/StatCardProps";
import { TONE_SOFT, TONE_TEXT } from "../../constants/styles";

export default function StatCard({ label, value, caption, captionTone, icon, iconTone, progress }: StatCardProps): JSX.Element {
    return <article aria-label={label} className="flex flex-col gap-3 rounded-xl border border-border-color bg-surface-1 p-5">
        <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold tracking-wide text-slate-2 uppercase">{label}</h2>
            <span className={`flex size-8 items-center justify-center rounded-md ${TONE_SOFT[iconTone]}`}>{icon}</span>
        </div>
        <p className="font-heading text-2xl font-bold text-slate-1">{value}</p>
        {progress !== undefined && <ProgressBar value={progress} tone={captionTone} label={`${label} usage`} />}
        <p className={`text-xs font-semibold ${TONE_TEXT[captionTone]}`}>{caption}</p>
    </article>
}
