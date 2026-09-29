import type { JSX } from "react/jsx-runtime";
import type { CertificationBadgeProps } from "../../Types/CertificationBadgeProps";

export default function CertificationBadge({ label }: CertificationBadgeProps): JSX.Element {
    return <li role="listitem" aria-label={label} className="rounded-md bg-surface-1/15 px-4 py-2 text-xs font-semibold tracking-wide uppercase">
        {label}
    </li>
}
