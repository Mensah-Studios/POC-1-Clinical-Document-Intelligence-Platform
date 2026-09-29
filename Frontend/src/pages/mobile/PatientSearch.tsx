import { useState } from "react";
import type { SubmitEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import MobilePatientMatchCard from "../../components/mobile/search/MobilePatientMatchCard";
import AlertBanner from "../../components/common/AlertBanner";
import SelectField from "../../components/common/SelectField";
import { DatabaseSearchIcon, NoticeIcon } from "../../components/icons/Icons";
import { MOBILE_CLINICAL_DISCLAIMER, MOBILE_SEARCH_CONTENT } from "../../constants/mobile";
import { PATIENT_MATCHES, SEARCH_FILTERS } from "../../constants/search";

export default function MobilePatientSearch(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const [facility, setFacility] = useState(SEARCH_FILTERS.facility.options[0]);
    const [risk, setRisk] = useState(SEARCH_FILTERS.risk.options[0]);
    const { finder, results } = MOBILE_SEARCH_CONTENT;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = query.trim();
        setSearchParams(trimmed ? { q: trimmed } : {});
    }

    return <>
        <MobileHeader title={MOBILE_SEARCH_CONTENT.title} badge="logged" />
        <div className="flex flex-col gap-4 p-4">
            <AlertBanner tone="teal" icon={<NoticeIcon className="size-4" />}>{MOBILE_CLINICAL_DISCLAIMER}</AlertBanner>

            <section aria-labelledby="mobile-finder-heading" className="rounded-xl border-2 border-teal-1 bg-surface-1 p-4">
                <h2 id="mobile-finder-heading" className="font-heading text-base font-bold text-slate-1">{finder.heading}</h2>
                <form role="search" aria-label={finder.label} onSubmit={handleSubmit} className="mt-3 flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2.5">
                    <DatabaseSearchIcon className="size-4 shrink-0 text-teal-1" />
                    <input
                        type="search"
                        aria-label={finder.label}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={finder.placeholder}
                        className="w-full bg-transparent text-sm text-slate-1 outline-none placeholder:text-slate-2"
                    />
                </form>
                <span className="mt-3 inline-block rounded-md bg-teal-1 px-2 py-1 text-[10px] font-semibold tracking-wide text-surface-1 uppercase">{finder.badge}</span>
            </section>

            <section aria-labelledby="mobile-filters-heading">
                <h2 id="mobile-filters-heading" className="mb-2 text-sm font-semibold text-slate-1">{MOBILE_SEARCH_CONTENT.filtersHeading}</h2>
                <div className="grid grid-cols-2 gap-2">
                    <SelectField {...SEARCH_FILTERS.facility} hideLabel value={facility} onChange={setFacility} />
                    <SelectField {...SEARCH_FILTERS.risk} hideLabel value={risk} onChange={setRisk} />
                </div>
            </section>

            <section aria-labelledby="mobile-results-heading">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <h2 id="mobile-results-heading" className="font-heading text-base font-bold text-slate-1">{results.heading(PATIENT_MATCHES.length)}</h2>
                    {PATIENT_MATCHES.length > 0 && <span className="shrink-0 text-xs text-slate-3">{results.relevance(PATIENT_MATCHES[0].matchScore)}</span>}
                </div>
                <ul className="flex flex-col gap-3">
                    {PATIENT_MATCHES.map((match, index) => <MobilePatientMatchCard key={match.mrn} match={match} highlighted={index === 0} />)}
                </ul>
            </section>
        </div>
    </>
}
