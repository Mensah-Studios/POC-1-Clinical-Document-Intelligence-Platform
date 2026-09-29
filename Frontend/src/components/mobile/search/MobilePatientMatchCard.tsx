import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import Avatar from "../../common/Avatar";
import StatusBadge from "../../common/StatusBadge";
import { SEARCH_CONTENT } from "../../../constants/search";
import { patientPath } from "../../../constants/routes";
import type { PatientMatchRowProps } from "../../../Types/PatientMatchRowProps";

export default function MobilePatientMatchCard({ match, highlighted = false }: PatientMatchRowProps): JSX.Element {
    const { efRatio, admitDate, reduced, match: matchLabel } = SEARCH_CONTENT.results;

    return <li>
        <Link
            to={patientPath(match.mrn)}
            aria-label={`${match.name}, MRN ${match.mrn}`}
            className={`block rounded-xl border bg-surface-1 p-4 ${highlighted ? "border-2 border-teal-1" : "border-border-color"}`}
        >
            <div className="flex items-start gap-3">
                <Avatar name={match.name} highlighted={highlighted} />
                <div className="min-w-0 flex-1">
                    <p className="font-heading text-base font-bold text-slate-1">{match.name}</p>
                    <p className="text-xs text-slate-3">MRN: {match.mrn} · DOB: {match.dob} ({match.age} Y/O)</p>
                </div>
                <StatusBadge label={`${match.matchScore}% ${matchLabel}`} tone={highlighted ? "green" : "teal"} />
            </div>
            <hr className="my-3 border-border-color" />
            <dl className="grid grid-cols-2 gap-3">
                <div>
                    <dt className="text-[10px] font-semibold tracking-wide text-slate-3 uppercase">{efRatio}</dt>
                    <dd className={`text-sm font-semibold ${match.efReduced ? "text-danger-1" : "text-slate-1"}`}>
                        {match.efRatio}%{match.efReduced && ` ${reduced}`}
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-semibold tracking-wide text-slate-3 uppercase">{admitDate}</dt>
                    <dd className="text-sm font-semibold text-slate-1">{match.admitDate}</dd>
                </div>
            </dl>
        </Link>
    </li>
}
