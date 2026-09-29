import type { JSX } from "react/jsx-runtime";
import StatusBadge from "../../common/StatusBadge";
import { FileTextIcon, XIcon } from "../../icons/Icons";
import { MOBILE_UPLOAD_CONTENT } from "../../../constants/mobile";
import type { RedactionQueueItemProps } from "../../../Types/RedactionQueueItemProps";
import { formatFileSize } from "../../../utils/formatFileSize";

export default function RedactionQueueItem({ file, patientName, onRemove }: RedactionQueueItemProps): JSX.Element {
    return <li aria-label={file.name} className="flex items-center gap-3 rounded-xl border border-border-color bg-surface-1 p-3">
        <FileTextIcon className="size-5 shrink-0 text-teal-1" />
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-1">{file.name}</p>
            <p className="text-[11px] text-slate-3">{formatFileSize(file.size)} · {patientName}</p>
        </div>
        <StatusBadge label={MOBILE_UPLOAD_CONTENT.queue.status} tone="neutral" uppercase />
        <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`} className="cursor-pointer rounded-md p-1 text-slate-3 hover:text-danger-1">
            <XIcon className="size-4" />
        </button>
    </li>
}
