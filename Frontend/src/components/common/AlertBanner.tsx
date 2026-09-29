import type { JSX } from "react/jsx-runtime";
import type { AlertBannerProps } from "../../Types/AlertBannerProps";

const TONE_CONTAINER = {
    teal: "border border-teal-1/30 bg-surface-3 text-teal-1",
    warning: "border border-warning-1/60 bg-warning-2 text-slate-2",
    danger: "bg-danger-2 text-slate-2",
};

const TONE_TITLE = {
    teal: "text-teal-1",
    warning: "text-warning-1",
    danger: "text-danger-1",
};

export default function AlertBanner({ tone, children, title, icon }: AlertBannerProps): JSX.Element {
    return <aside role="note" aria-label={title ?? "Notice"} className={`flex gap-3 rounded-lg px-4 py-3.5 ${TONE_CONTAINER[tone]}`}>
        {icon && <span className={`mt-0.5 shrink-0 ${TONE_TITLE[tone]}`}>{icon}</span>}
        <div>
            {title && <p className={`mb-1 text-sm font-semibold ${TONE_TITLE[tone]}`}>{title}</p>}
            <div className="text-xs leading-relaxed">{children}</div>
        </div>
    </aside>
}
