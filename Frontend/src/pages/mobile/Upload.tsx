import { useState } from "react";
import type { SubmitEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import FilePicker from "../../components/mobile/upload/FilePicker";
import RedactionQueueItem from "../../components/mobile/upload/RedactionQueueItem";
import Button from "../../components/common/Button";
import SelectField from "../../components/common/SelectField";
import StatusBadge from "../../components/common/StatusBadge";
import { CloudUploadIcon, UserIcon } from "../../components/icons/Icons";
import { MOBILE_ACCEPTED_FILE_TYPES, MOBILE_UPLOAD_CONTENT } from "../../constants/mobile";
import { PATIENTS } from "../../constants/patients";

const patientOptions = PATIENTS.map(({ name, mrn }) => `${name} (MRN: ${mrn})`);

export default function MobileUpload(): JSX.Element {
    const [searchParams] = useSearchParams();
    const [patientIndex, setPatientIndex] = useState(Math.max(0, PATIENTS.findIndex(({ mrn }) => mrn === searchParams.get("mrn"))));
    const [changingTarget, setChangingTarget] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const patient = PATIENTS[patientIndex];
    const { target, queue } = MOBILE_UPLOAD_CONTENT;

    function addFiles(selected: File[]) {
        setFiles((current) => [
            ...current,
            ...selected.filter((file) => !current.some((queued) => queued.name === file.name && queued.size === file.size)),
        ]);
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return <>
        <MobileHeader title={MOBILE_UPLOAD_CONTENT.title} badge="logged" />
        <form aria-label={MOBILE_UPLOAD_CONTENT.title} onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <section aria-label={target.label} className="rounded-xl border border-teal-1/30 bg-surface-3 p-4">
                <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-1 text-surface-1">
                        <UserIcon className="size-4" />
                    </span>
                    <div>
                        <p className="text-[10px] font-semibold tracking-wide text-slate-3 uppercase">{target.label}</p>
                        <p className="font-heading text-lg font-bold text-teal-1">{patient.name}</p>
                    </div>
                </div>
                <p className="mt-2 flex gap-4 text-xs text-slate-2">
                    <span>MRN: <strong className="text-slate-1">{patient.mrn}</strong></span>
                    <span>DOB: <strong className="text-slate-1">{patient.dob}</strong></span>
                </p>
                {changingTarget && <div className="mt-3">
                    <SelectField
                        id="mobile-upload-patient"
                        label={target.selectLabel}
                        hideLabel
                        value={patientOptions[patientIndex]}
                        options={patientOptions}
                        onChange={(value) => setPatientIndex(patientOptions.indexOf(value))}
                    />
                </div>}
                <Button variant="secondary" className="mt-3 w-full text-slate-2" onClick={() => setChangingTarget((v) => !v)}>
                    {changingTarget ? target.done : target.change}
                </Button>
            </section>

            <FilePicker accept={MOBILE_ACCEPTED_FILE_TYPES} onFilesSelected={addFiles} />

            <section aria-labelledby="mobile-queue-heading" className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 id="mobile-queue-heading" className="font-heading text-base font-bold text-slate-1">{queue.heading}</h2>
                    <StatusBadge label={queue.badge} tone="green" />
                </div>
                {files.length > 0
                    ? <ul aria-label={queue.heading} className="flex flex-col gap-2">
                        {files.map((file) => (
                            <RedactionQueueItem
                                key={`${file.name}-${file.size}`}
                                file={file}
                                patientName={patient.name}
                                onRemove={() => setFiles((current) => current.filter((queued) => queued !== file))}
                            />
                        ))}
                    </ul>
                    : <p className="rounded-xl border border-dashed border-border-color bg-surface-1 p-4 text-center text-xs text-slate-3">{queue.empty}</p>}
            </section>

            <Button type="submit" icon={<CloudUploadIcon className="size-4" />} disabled={files.length === 0} className="w-full py-3">
                {queue.submit}
            </Button>
        </form>
    </>
}
