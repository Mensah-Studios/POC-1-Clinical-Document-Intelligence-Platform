import type { JSX } from "react/jsx-runtime";
import { NoticeIcon } from "../icons/Icons";
import type { ComplianceNoticeProps } from "../../Types/ComplianceNoticeProps";

export default function ComplianceNotice({ children }: ComplianceNoticeProps): JSX.Element {
    return <aside role="note" aria-label="Compliance notice" className="mt-8 flex gap-3 rounded-md bg-surface-3 p-4">
        <NoticeIcon className="size-4 shrink-0 text-teal-1" />
        <p className="text-xs leading-relaxed text-teal-1">{children}</p>
    </aside>
}
