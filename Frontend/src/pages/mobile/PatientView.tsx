import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import ActivePatientCard from "../../components/mobile/patient/ActivePatientCard";
import WorkspaceLink from "../../components/mobile/patient/WorkspaceLink";
import Avatar from "../../components/common/Avatar";
import StatusBadge from "../../components/common/StatusBadge";
import PatientNotFound from "../../components/patient/PatientNotFound";
import { DatabaseSearchIcon } from "../../components/icons/Icons";
import { MOBILE_PATIENT_CONTENT } from "../../constants/mobile";
import { findPatient } from "../../constants/patients";
import { patientPath } from "../../constants/routes";

const CARD = "rounded-xl border border-border-color bg-surface-1 p-4";
const SUBHEADING = "text-[10px] font-semibold tracking-wide text-slate-3 uppercase";

function splitCareTeamMember(member: string): { name: string; role: string } {
    const match = member.match(/^(.*) \((.*)\)$/);
    return match ? { name: match[1], role: match[2] } : { name: member, role: "" };
}

export default function MobilePatientView(): JSX.Element {
    const { mrn = "" } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const patient = findPatient(mrn);
    const content = MOBILE_PATIENT_CONTENT;
    const overview = content.overview;

    function handleQuery(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate(patientPath(mrn, "summary"));
    }

    return <>
        <MobileHeader title={overview.title} subtitle={overview.subtitle} badge="hipaa" />
        <div className="flex flex-col gap-4 p-4">
            {!patient ? <PatientNotFound mrn={mrn} /> : <>
                <ActivePatientCard patient={patient} label={content.activeLabel} />

                <section aria-labelledby="mobile-demographics-heading" className={CARD}>
                    <h2 id="mobile-demographics-heading" className="mb-3 font-heading text-base font-bold text-slate-1">{overview.demographics}</h2>
                    <dl className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-3">{overview.address}</dt>
                            <dd className="text-right font-semibold text-slate-1">{patient.address}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="shrink-0 text-slate-3">{overview.emergencyContact}</dt>
                            <dd className="text-right font-semibold text-slate-1">{patient.emergencyContact}</dd>
                        </div>
                    </dl>
                    <hr className="my-3 border-border-color" />
                    <h3 className={SUBHEADING}>{overview.allergies}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {patient.allergies.map((allergy) => <li key={allergy}><StatusBadge label={allergy} tone="danger" uppercase /></li>)}
                    </ul>
                </section>

                <section aria-labelledby="mobile-problems-heading" className={CARD}>
                    <h2 id="mobile-problems-heading" className="mb-3 font-heading text-base font-bold text-slate-1">{overview.problems}</h2>
                    <h3 className={SUBHEADING}>{overview.conditions}</h3>
                    <ul aria-label={overview.conditions} className="mt-2 flex list-inside list-disc flex-col gap-1.5 text-sm text-slate-1">
                        {patient.conditions.map((condition) => <li key={condition.name}>{condition.name}</li>)}
                    </ul>
                    <hr className="my-3 border-border-color" />
                    <h3 className={SUBHEADING}>{overview.medications}</h3>
                    <ul aria-label={overview.medications} className="mt-2 flex list-inside list-disc flex-col gap-1.5 text-sm text-slate-1">
                        {patient.medications.map((medication) => <li key={medication.name}>{medication.name}</li>)}
                    </ul>
                </section>

                <section aria-labelledby="mobile-care-team-heading" className={CARD}>
                    <h2 id="mobile-care-team-heading" className="mb-3 font-heading text-base font-bold text-slate-1">{overview.careTeam}</h2>
                    <ul className="flex flex-col gap-3">
                        {patient.careTeam.map((member) => {
                            const { name, role } = splitCareTeamMember(member);
                            return <li key={member} className="flex items-center gap-3">
                                <Avatar name={name} size="sm" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-1">{name}</p>
                                    {role && <p className="text-[11px] text-slate-3">{role}</p>}
                                </div>
                            </li>
                        })}
                    </ul>
                </section>

                <section aria-labelledby="mobile-copilot-heading" className="rounded-xl border border-teal-1/30 bg-surface-3 p-4">
                    <h2 id="mobile-copilot-heading" className="font-heading text-base font-bold text-teal-1">{overview.copilot.heading}</h2>
                    <form aria-label={overview.copilot.heading} onSubmit={handleQuery} className="mt-3 flex items-center gap-2 rounded-lg border border-border-color bg-surface-1 px-3 py-2.5">
                        <DatabaseSearchIcon className="size-4 shrink-0 text-teal-1" />
                        <input
                            aria-label={overview.copilot.label}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={overview.copilot.placeholder}
                            enterKeyHint="send"
                            className="w-full bg-transparent text-sm text-slate-1 outline-none placeholder:text-slate-2"
                        />
                        <button type="submit" className="shrink-0 cursor-pointer rounded-md bg-teal-1 px-3 py-1.5 text-xs font-semibold text-surface-1">
                            {overview.copilot.submit}
                        </button>
                    </form>
                </section>

                <section aria-labelledby="mobile-workspaces-heading">
                    <h2 id="mobile-workspaces-heading" className="mb-3 font-heading text-base font-bold text-slate-1">{overview.workspaces.heading}</h2>
                    <ul className="flex flex-col gap-2">
                        <WorkspaceLink {...overview.workspaces.summary} tone="teal" to={patientPath(mrn, "summary")} />
                        <WorkspaceLink {...overview.workspaces.documents} tone="neutral" to={patientPath(mrn, "documents")} />
                        <WorkspaceLink {...overview.workspaces.update} tone="warning" to={patientPath(mrn, "update")} />
                        <WorkspaceLink {...overview.workspaces.purge} tone="danger" to={patientPath(mrn, "delete")} />
                    </ul>
                </section>
            </>}
        </div>
    </>
}
