import type { JSX } from "react/jsx-runtime";
import { TONE_SOFT, TONE_TEXT } from "../../../constants/styles";
import type { MobileStatCardProps } from "../../../Types/MobileStatCardProps";

export default function MobileStatCard({ label, value, caption, icon, tone }: MobileStatCardProps): JSX.Element {
    return <article aria-label={label} className="flex flex-col gap-2 rounded-xl border border-border-color bg-surface-1 p-3">
        <div className="flex items-center justify-between gap-2">
            <h2 className="text-[10px] font-semibold tracking-wide text-slate-2 uppercase">{label}</h2>
            <span className={`flex size-6 shrink-0 items-center justify-center rounded-md ${TONE_SOFT[tone]}`}>{icon}</span>
        </div>
        <p className="font-heading text-base leading-tight font-bold text-slate-1">{value}</p>
        <p className={`text-[11px] font-semibold ${TONE_TEXT[tone]}`}>{caption}</p>
    </article>
}
