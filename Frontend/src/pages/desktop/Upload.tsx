import { useState } from "react";
import type { SubmitEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import SelectField from "../../components/common/SelectField";
import DropZone from "../../components/upload/DropZone";
import UploadQueueItem from "../../components/upload/UploadQueueItem";
import { CircleCheckIcon, CloudUploadIcon, ShieldCheckIcon } from "../../components/icons/Icons";
import { ACCEPTED_FILE_TYPES, UPLOAD_CONTENT } from "../../constants/upload";
import { PATIENTS } from "../../constants/patients";

const patientOptions = PATIENTS.map(({ name, mrn }) => `${name} (MRN: ${mrn})`);

export default function Upload(): JSX.Element {
    const [searchParams] = useSearchParams();
    const initialPatient = PATIENTS.findIndex(({ mrn }) => mrn === searchParams.get("mrn"));
    const [patient, setPatient] = useState(patientOptions[Math.max(0, initialPatient)]);
    const [files, setFiles] = useState<File[]>([]);
    const { form, pipeline } = UPLOAD_CONTENT;

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
        <TopBar title={UPLOAD_CONTENT.title} />
        <div className="flex flex-col gap-6 p-8">
            <AlertBanner tone="teal" icon={<ShieldCheckIcon className="size-4" />}>{UPLOAD_CONTENT.notice}</AlertBanner>

            <div className="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-6">
                <Card title={form.heading} description={form.description}>
                    <form aria-label={form.heading} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <SelectField id="upload-patient" label={form.patientLabel} value={patient} options={patientOptions} onChange={setPatient} />
                        <DropZone accept={ACCEPTED_FILE_TYPES} onFilesSelected={addFiles} />

                        {files.length > 0 && <ul aria-label={form.queueLabel} className="flex flex-col gap-2">
                            {files.map((file) => (
                                <UploadQueueItem
                                    key={`${file.name}-${file.size}`}
                                    file={file}
                                    onRemove={() => setFiles((current) => current.filter((queued) => queued !== file))}
                                />
                            ))}
                        </ul>}

                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setFiles([])} disabled={files.length === 0}>{form.clear}</Button>
                            <Button type="submit" icon={<CloudUploadIcon className="size-4" />} disabled={files.length === 0}>{form.submit}</Button>
                        </div>
                    </form>
                </Card>

                <Card title={pipeline.heading} description={pipeline.description}>
                    <ol className="flex flex-col gap-4">
                        {pipeline.steps.map(({ title, description }) => (
                            <li key={title} className="flex gap-3">
                                <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-green-1" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-1">{title}</p>
                                    <p className="text-xs text-slate-3">{description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>
        </div>
    </>
}
