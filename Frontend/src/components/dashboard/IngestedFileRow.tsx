import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { FileTextIcon, ShieldCheckIcon } from "../icons/Icons";
import StatusBadge from "../common/StatusBadge";
import { patientPath } from "../../constants/routes";
import type { IngestedFileRowProps } from "../../Types/IngestedFileRowProps";

export default function IngestedFileRow({ file }: IngestedFileRowProps): JSX.Element {
    return <li aria-label={file.name} className="flex items-center gap-4 rounded-lg border border-border-color bg-surface-2 px-4 py-3">
        <FileTextIcon className="size-5 shrink-0 text-teal-1" />
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-1">{file.name}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-3">
                <Link to={patientPath(file.mrn)} className="hover:text-teal-1 hover:underline">
                    {file.patientName} (MRN: {file.mrn})
                </Link>
                <span aria-hidden="true">•</span>
                <span className="font-semibold text-teal-1">{file.citedElements} Cited Elements</span>
            </p>
        </div>
        <StatusBadge label={file.status} tone="teal" icon={<ShieldCheckIcon className="size-3.5" />} />
    </li>
}
