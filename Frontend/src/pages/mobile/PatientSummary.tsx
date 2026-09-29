import { useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import ActivePatientCard from "../../components/mobile/patient/ActivePatientCard";
import AlertBanner from "../../components/common/AlertBanner";
import Button from "../../components/common/Button";
import CitationList from "../../components/common/CitationList";
import HighlightedText from "../../components/common/HighlightedText";
import StatusBadge from "../../components/common/StatusBadge";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { AlertTriangleIcon, NoticeIcon } from "../../components/icons/Icons";
import { MOBILE_PATIENT_CONTENT } from "../../constants/mobile";
import { findPatient } from "../../constants/patients";

export default function MobilePatientSummary(): JSX.Element {
    const { mrn = "" } = useParams();
    const patient = findPatient(mrn);
    const content = MOBILE_PATIENT_CONTENT.summary;

    return <>
        <MobileHeader title={content.title} subtitle={content.subtitle} badge="hipaa" />
        <div className="flex flex-col gap-4 p-4">
            {!patient ? <PatientNotFound mrn={mrn} /> : <>
                <ActivePatientCard patient={patient} label={MOBILE_PATIENT_CONTENT.activeLabel} />

                <section aria-labelledby="mobile-synthesis-heading" className="rounded-xl border border-border-color bg-surface-1 p-4">
                    <div className="flex items-start justify-between gap-2">
                        <h2 id="mobile-synthesis-heading" className="font-heading text-base font-bold text-slate-1">{patient.summary.title}</h2>
                        <StatusBadge label={content.verified} tone="green" uppercase />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-3">{patient.summary.generated} · Model: {patient.summary.model}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-2">
                        <HighlightedText text={patient.summary.text} highlights={patient.summary.highlights} />
                    </p>
                    <hr className="my-3 border-border-color" />
                    <h3 className="mb-2 text-[10px] font-semibold tracking-wide text-slate-3 uppercase">{content.citations}</h3>
                    <CitationList citations={patient.summary.citations} label={content.citations} />
                </section>

                <AlertBanner tone="warning" title={content.gaps} icon={<AlertTriangleIcon className="size-4" />}>
                    <span className="text-sm">{patient.summary.discrepancy}</span>
                </AlertBanner>

                <section aria-labelledby="mobile-follow-ups-heading" className="rounded-xl border border-border-color bg-surface-1 p-4">
                    <h2 id="mobile-follow-ups-heading" className="mb-3 font-heading text-base font-bold text-slate-1">{content.followUps}</h2>
                    <div className="flex flex-col gap-2">
                        {patient.summary.nextSteps.map((step) => (
                            <Button key={step} variant="secondary" className="justify-start bg-surface-2 text-left font-normal">"{step}"</Button>
                        ))}
                    </div>
                </section>

                <AlertBanner tone="teal" icon={<NoticeIcon className="size-4" />}>{content.disclaimer}</AlertBanner>
            </>}
        </div>
    </>
}
