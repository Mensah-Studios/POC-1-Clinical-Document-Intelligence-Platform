import type { JSX } from "react/jsx-runtime";
import { CloudUploadIcon } from "../../icons/Icons";
import { MOBILE_UPLOAD_CONTENT } from "../../../constants/mobile";
import type { FilePickerProps } from "../../../Types/FilePickerProps";

export default function FilePicker({ accept, onFilesSelected }: FilePickerProps): JSX.Element {
    const { label, heading, hint, button } = MOBILE_UPLOAD_CONTENT.picker;

    return <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-teal-1 bg-surface-1 px-4 py-8 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-surface-3 text-teal-1">
            <CloudUploadIcon className="size-6" />
        </span>
        <span className="text-sm font-bold text-slate-1">{heading}</span>
        <span className="text-xs text-slate-3">{hint}</span>
        <span aria-hidden="true" className="mt-2 rounded-md bg-teal-1 px-5 py-2.5 text-sm font-semibold text-surface-1">{button}</span>
        <input
            type="file"
            multiple
            accept={accept}
            aria-label={label}
            className="sr-only"
            onChange={(e) => {
                onFilesSelected(Array.from(e.target.files ?? []));
                e.target.value = "";
            }}
        />
    </label>
}
