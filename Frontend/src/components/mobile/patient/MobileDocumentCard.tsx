import type { JSX } from "react/jsx-runtime";
import StatusBadge from "../../common/StatusBadge";
import { FileTextIcon } from "../../icons/Icons";
import { MOBILE_PATIENT_CONTENT } from "../../../constants/mobile";
import type { SourceDocumentRowProps } from "../../../Types/SourceDocumentRowProps";

export default function MobileDocumentCard({ document }: SourceDocumentRowProps): JSX.Element {
    const content = MOBILE_PATIENT_CONTENT.documents;

    return <li aria-label={document.name} className="rounded-xl border border-border-color bg-surface-1 p-4">
        <div className="flex items-start gap-3">
            <FileTextIcon className="size-5 shrink-0 text-teal-1" />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-1">{document.name}</p>
                <p className="text-[11px] text-slate-3">{document.sizeMb} MB · {document.source}</p>
            </div>
            <StatusBadge label={document.status} tone={document.status === "PHI Redacted" ? "teal" : "warning"} uppercase />
        </div>
        <hr className="my-3 border-border-color" />
        <div className="flex items-center justify-between text-xs">
            <span className="text-slate-3">{content.ocrStatus[document.status]}</span>
            <span className={`font-semibold ${document.relevance.level === "High" ? "text-teal-1" : "text-slate-2"}`}>
                {document.relevance.score}% {content.relevance}
            </span>
        </div>
    </li>
}
