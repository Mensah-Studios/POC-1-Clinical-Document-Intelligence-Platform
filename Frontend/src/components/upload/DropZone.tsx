import { useState } from "react";
import type { DragEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { CloudUploadIcon } from "../icons/Icons";
import { UPLOAD_CONTENT } from "../../constants/upload";
import type { DropZoneProps } from "../../Types/DropZoneProps";

export default function DropZone({ accept, onFilesSelected }: DropZoneProps): JSX.Element {
    const [dragging, setDragging] = useState(false);
    const { label, heading, hint } = UPLOAD_CONTENT.dropZone;

    function handleDrop(e: DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        setDragging(false);
        onFilesSelected(Array.from(e.dataTransfer.files));
    }

    return <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${dragging ? "border-teal-1 bg-surface-3" : "border-border-color bg-surface-2 hover:border-teal-1/60"}`}
    >
        <span className="flex size-12 items-center justify-center rounded-full bg-surface-3 text-teal-1">
            <CloudUploadIcon className="size-6" />
        </span>
        <span className="text-sm font-semibold text-slate-1">{heading}</span>
        <span className="text-xs text-slate-3">{hint}</span>
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
