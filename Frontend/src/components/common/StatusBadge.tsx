import type { JSX } from "react/jsx-runtime";
import type { StatusBadgeProps } from "../../Types/StatusBadgeProps";
import { TONE_BORDER, TONE_SOFT } from "../../constants/styles";

export default function StatusBadge({ label, tone, icon, uppercase = false, bordered = false }: StatusBadgeProps): JSX.Element {
    return <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${TONE_SOFT[tone]} ${uppercase ? "tracking-wide uppercase" : ""} ${bordered ? `border ${TONE_BORDER[tone]}` : ""}`}>
        {icon}
        {label}
    </span>
}
