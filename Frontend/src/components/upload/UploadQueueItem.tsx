import type { JSX } from "react/jsx-runtime";
import { FileTextIcon, XIcon } from "../icons/Icons";
import type { UploadQueueItemProps } from "../../Types/UploadQueueItemProps";
import { formatFileSize } from "../../utils/formatFileSize";

export default function UploadQueueItem({ file, onRemove }: UploadQueueItemProps): JSX.Element {
    return <li aria-label={file.name} className="flex items-center gap-3 rounded-lg border border-border-color px-4 py-3">
        <FileTextIcon className="size-5 shrink-0 text-teal-1" />
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-1">{file.name}</p>
            <p className="text-xs text-slate-3">{formatFileSize(file.size)}</p>
        </div>
        <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`} className="cursor-pointer rounded-md p-1 text-slate-3 hover:bg-surface-2 hover:text-danger-1">
            <XIcon className="size-4" />
        </button>
    </li>
}
