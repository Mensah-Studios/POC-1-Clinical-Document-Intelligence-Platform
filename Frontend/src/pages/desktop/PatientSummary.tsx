import { useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import CitationList from "../../components/common/CitationList";
import HighlightedText from "../../components/common/HighlightedText";
import StatusBadge from "../../components/common/StatusBadge";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { AlertTriangleIcon, NoticeIcon } from "../../components/icons/Icons";
import { CLINICAL_DISCLAIMER } from "../../constants/navigation";
import { PATIENT_SUMMARY_CONTENT, findPatient } from "../../constants/patients";

export default function PatientSummary(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);

    if (!patient) {
        return <>
            <TopBar title={PATIENT_SUMMARY_CONTENT.title} />
            <div className="p-8"><PatientNotFound mrn={mrn} /></div>
        </>
    }

    const { summary } = patient;

    return <>
        <TopBar title={PATIENT_SUMMARY_CONTENT.title} />
        <div className="flex flex-col gap-6 p-8">
            <AlertBanner tone="teal" icon={<NoticeIcon className="size-4" />}>{CLINICAL_DISCLAIMER}</AlertBanner>

            <Card
                title={`Synthesis: ${summary.title}`}
                titleAdornment={<StatusBadge label={PATIENT_SUMMARY_CONTENT.verified} tone="green" uppercase />}
                action={<span className="shrink-0 text-xs text-slate-3">{summary.generated} · Model: {summary.model}</span>}
                className="border-2 border-teal-1"
            >
                <p className="text-sm leading-relaxed text-slate-2">
                    <HighlightedText text={summary.text} highlights={summary.highlights} />
                </p>
                <hr className="my-5 border-border-color" />
                <h3 className="mb-3 text-sm font-semibold text-slate-1">{PATIENT_SUMMARY_CONTENT.citedSources}</h3>
                <CitationList citations={summary.citations} label={PATIENT_SUMMARY_CONTENT.citedSources} />
            </Card>

            <AlertBanner tone="warning" title={PATIENT_SUMMARY_CONTENT.discrepancy} icon={<AlertTriangleIcon className="size-4" />}>
                <span className="text-sm">{summary.discrepancy}</span>
            </AlertBanner>

            <Card title={PATIENT_SUMMARY_CONTENT.nextSteps}>
                <div className="flex flex-wrap gap-3">
                    {summary.nextSteps.map((step) => <Button key={step} variant="secondary" className="font-normal">{step}</Button>)}
                </div>
            </Card>
        </div>
    </>
}
