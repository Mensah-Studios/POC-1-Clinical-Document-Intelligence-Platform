import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import Card from "../../components/common/Card";
import ProgressBar from "../../components/common/ProgressBar";
import StatusBadge from "../../components/common/StatusBadge";
import PatientHeader from "../../components/patient/PatientHeader";
import ConditionItem from "../../components/patient/ConditionItem";
import MedicationItem from "../../components/patient/MedicationItem";
import ClinicalQueryPanel from "../../components/patient/ClinicalQueryPanel";
import WorkspaceCard from "../../components/patient/WorkspaceCard";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { PATIENT_VIEW_CONTENT, findPatient } from "../../constants/patients";
import { patientPath } from "../../constants/routes";
import type { WorkspaceCardProps } from "../../Types/WorkspaceCardProps";

export default function PatientView(): JSX.Element {
    const { mrn = "" } = useParams();
    const navigate = useNavigate();
    const patient = findPatient(mrn);

    if (!patient) {
        return <>
            <TopBar title={PATIENT_VIEW_CONTENT.title(mrn)} />
            <div className="p-8"><PatientNotFound mrn={mrn} /></div>
        </>
    }

    const { workspaces } = PATIENT_VIEW_CONTENT;
    const workspaceCards: WorkspaceCardProps[] = [
        { ...workspaces.summary, tone: "teal", footnote: `Model: ${patient.summary.model}`, actionLabel: workspaces.summary.action, to: patientPath(mrn, "summary") },
        { ...workspaces.documents, badge: `${patient.documents.length} Files`, tone: "neutral", footnote: `Last upload: ${patient.documents[0]?.uploaded ?? "—"}`, actionLabel: workspaces.documents.action, to: patientPath(mrn, "documents") },
        { ...workspaces.update, tone: "warning", footnote: `MRN: ${patient.mrn}`, actionLabel: workspaces.update.action, to: patientPath(mrn, "update") },
        { ...workspaces.purge, tone: "danger", actionLabel: workspaces.purge.action, to: patientPath(mrn, "delete") },
    ];

    return <>
        <TopBar title={PATIENT_VIEW_CONTENT.title(patient.name)} />
        <div className="flex flex-col gap-6 p-8">
            <PatientHeader patient={patient} />

            <div className="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-6">
                <div className="flex flex-col gap-6">
                    <Card title={PATIENT_VIEW_CONTENT.conditions}>
                        <ul className="flex flex-col gap-2">
                            {patient.conditions.map((condition) => <ConditionItem key={condition.name} condition={condition} />)}
                        </ul>
                    </Card>
                    <Card title={PATIENT_VIEW_CONTENT.medications}>
                        <ul className="flex flex-col gap-2">
                            {patient.medications.map((medication) => <MedicationItem key={medication.name} medication={medication} />)}
                        </ul>
                    </Card>
                    <ClinicalQueryPanel
                        placeholder={PATIENT_VIEW_CONTENT.query.placeholder(patient.name.split(" ")[0])}
                        onSubmit={() => navigate(patientPath(mrn, "summary"))}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <Card title={PATIENT_VIEW_CONTENT.allergies}>
                        <ul className="flex flex-wrap gap-2">
                            {patient.allergies.map((allergy) => <li key={allergy}><StatusBadge label={allergy} tone="danger" bordered /></li>)}
                        </ul>
                    </Card>
                    <Card title={PATIENT_VIEW_CONTENT.risk}>
                        <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="text-slate-2">{patient.risk.label}</span>
                            <span className="font-semibold text-warning-1">{patient.risk.level} ({patient.risk.score}%)</span>
                        </div>
                        <ProgressBar value={patient.risk.score} tone="warning" label={patient.risk.label} />
                    </Card>
                    <Card title={PATIENT_VIEW_CONTENT.careTeam}>
                        <ul className="flex list-inside list-disc flex-col gap-2 text-sm text-slate-2">
                            {patient.careTeam.map((member) => <li key={member}>{member}</li>)}
                        </ul>
                    </Card>
                </div>
            </div>

            <Card
                title={workspaces.heading}
                description={workspaces.description}
                action={<StatusBadge label={`${workspaceCards.length} Destinations`} tone="teal" uppercase />}
            >
                <div className="grid grid-cols-2 gap-4">
                    {workspaceCards.map((card) => <WorkspaceCard key={card.title} {...card} />)}
                </div>
            </Card>
        </div>
    </>
}
