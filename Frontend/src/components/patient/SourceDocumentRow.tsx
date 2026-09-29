import type { JSX } from "react/jsx-runtime";
import { FileTextIcon } from "../icons/Icons";
import StatusBadge from "../common/StatusBadge";
import { PATIENT_DOCUMENTS_CONTENT } from "../../constants/patients";
import type { SourceDocumentRowProps } from "../../Types/SourceDocumentRowProps";

export default function SourceDocumentRow({ document }: SourceDocumentRowProps): JSX.Element {
    const { relevance } = document;

    return <li aria-label={document.name} className="flex items-center gap-4 rounded-lg border border-border-color bg-surface-1 px-5 py-4">
        <FileTextIcon className="size-6 shrink-0 text-teal-1" />
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-1">{document.name}</p>
            <p className="mt-0.5 text-xs text-slate-3">
                {document.category} · {document.source} · {document.sizeMb} MB · Uploaded {document.uploaded}
            </p>
        </div>
        <dl className="w-28">
            <dt className="text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{PATIENT_DOCUMENTS_CONTENT.relevance}</dt>
            <dd className={`text-xs font-semibold ${relevance.level === "High" ? "text-green-1" : "text-slate-2"}`}>
                {relevance.level} ({relevance.score}%)
            </dd>
        </dl>
        <StatusBadge label={document.status} tone={document.status === "PHI Redacted" ? "teal" : "warning"} uppercase />
    </li>
}
