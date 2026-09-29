import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import AlertBanner from "../../components/common/AlertBanner";
import Card from "../../components/common/Card";
import SelectField from "../../components/common/SelectField";
import SemanticSearchBar from "../../components/search/SemanticSearchBar";
import PatientMatchRow from "../../components/search/PatientMatchRow";
import { NoticeIcon } from "../../components/icons/Icons";
import { CLINICAL_DISCLAIMER } from "../../constants/navigation";
import { PATIENT_MATCHES, SEARCH_CONTENT, SEARCH_FILTERS } from "../../constants/search";

export default function PatientSearch(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") ?? "";
    const [query, setQuery] = useState(urlQuery);
    const [syncedQuery, setSyncedQuery] = useState(urlQuery);

    // The top bar search can change ?q= while this page stays mounted.
    if (urlQuery !== syncedQuery) {
        setSyncedQuery(urlQuery);
        setQuery(urlQuery);
    }
    const [facility, setFacility] = useState(SEARCH_FILTERS.facility.options[0]);
    const [risk, setRisk] = useState(SEARCH_FILTERS.risk.options[0]);
    const [status, setStatus] = useState(SEARCH_FILTERS.status.options[0]);
    const { finder, results } = SEARCH_CONTENT;

    function handleSearch() {
        const trimmed = query.trim();
        setSearchParams(trimmed ? { q: trimmed } : {});
    }

    return <>
        <TopBar title={SEARCH_CONTENT.title} />
        <div className="flex flex-col gap-6 p-8">
            <AlertBanner tone="teal" icon={<NoticeIcon className="size-4" />}>{CLINICAL_DISCLAIMER}</AlertBanner>

            <Card title={finder.heading}>
                <SemanticSearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
                <p className="mt-4 text-xs text-slate-3">{finder.hint}</p>
            </Card>

            <section aria-label="Search filters" className="grid grid-cols-3 gap-4">
                <SelectField {...SEARCH_FILTERS.facility} value={facility} onChange={setFacility} />
                <SelectField {...SEARCH_FILTERS.risk} value={risk} onChange={setRisk} />
                <SelectField {...SEARCH_FILTERS.status} value={status} onChange={setStatus} />
            </section>

            <Card
                title={results.heading(PATIENT_MATCHES.length)}
                action={<span className="shrink-0 text-xs text-slate-3">{results.sortedBy}</span>}
            >
                <ul className="flex flex-col gap-3">
                    {PATIENT_MATCHES.map((match, index) => (
                        <PatientMatchRow key={match.mrn} match={match} highlighted={index === 0} />
                    ))}
                </ul>
            </Card>
        </div>
    </>
}
