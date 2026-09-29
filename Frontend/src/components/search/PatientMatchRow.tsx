import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import Avatar from "../common/Avatar";
import StatusBadge from "../common/StatusBadge";
import { SEARCH_CONTENT } from "../../constants/search";
import { patientPath } from "../../constants/routes";
import type { PatientMatchRowProps } from "../../Types/PatientMatchRowProps";

export default function PatientMatchRow({ match, highlighted = false }: PatientMatchRowProps): JSX.Element {
    const { efRatio, admitDate, reduced } = SEARCH_CONTENT.results;

    return <li>
        <Link
            to={patientPath(match.mrn)}
            aria-label={`${match.name}, MRN ${match.mrn}`}
            className={`flex items-center gap-4 rounded-lg border px-5 py-4 transition-colors ${highlighted ? "border-teal-1/40 bg-surface-3" : "border-border-color bg-surface-1 hover:bg-surface-2"}`}
        >
            <Avatar name={match.name} highlighted={highlighted} />
            <div className="flex-1">
                <p className="font-heading text-base font-bold text-slate-1">{match.name}</p>
                <p className="mt-0.5 text-xs text-slate-3">MRN: {match.mrn} · DOB: {match.dob} ({match.age} Y/O)</p>
            </div>
            <dl className="flex gap-6 text-sm">
                <div>
                    <dt className="text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{efRatio}</dt>
                    <dd className={`font-semibold ${match.efReduced ? "text-danger-1" : "text-slate-2"}`}>
                        {match.efRatio}%{match.efReduced && ` ${reduced}`}
                    </dd>
                </div>
                <div>
                    <dt className="text-[11px] font-semibold tracking-wide text-slate-3 uppercase">{admitDate}</dt>
                    <dd className="font-semibold text-slate-2">{match.admitDate}</dd>
                </div>
            </dl>
            <StatusBadge label={`${match.matchScore}% ${SEARCH_CONTENT.results.match}`} tone={highlighted ? "green" : "teal"} />
        </Link>
    </li>
}
