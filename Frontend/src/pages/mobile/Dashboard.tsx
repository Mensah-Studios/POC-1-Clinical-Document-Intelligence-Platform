import type { JSX } from "react/jsx-runtime";
import MobileHeader from "../../components/mobile/navigation/MobileHeader";
import MobileStatCard from "../../components/mobile/dashboard/MobileStatCard";
import TokenQuotaCard from "../../components/mobile/dashboard/TokenQuotaCard";
import CitationList from "../../components/common/CitationList";
import HighlightedText from "../../components/common/HighlightedText";
import IngestedFileRow from "../../components/dashboard/IngestedFileRow";
import { CircleCheckIcon, UsersIcon } from "../../components/icons/Icons";
import { ACTIVE_SYNTHESIS, RECENT_FILES, TOKEN_QUOTA } from "../../constants/dashboard";
import { MOBILE_DASHBOARD_CONTENT } from "../../constants/mobile";

export default function MobileDashboard(): JSX.Element {
    const { stats, synthesis, recentFiles } = MOBILE_DASHBOARD_CONTENT;

    return <>
        <MobileHeader title={MOBILE_DASHBOARD_CONTENT.title} badge="logged" />
        <div className="flex flex-col gap-4 p-4">
            <section aria-label="Key metrics" className="grid grid-cols-2 gap-3">
                <MobileStatCard {...stats.ledgers} tone="green" icon={<UsersIcon className="size-3.5" />} />
                <MobileStatCard {...stats.accuracy} tone="green" icon={<CircleCheckIcon className="size-3.5" />} />
            </section>

            <TokenQuotaCard used={TOKEN_QUOTA.used} total={TOKEN_QUOTA.total} />

            <section aria-labelledby="mobile-synthesis-heading" className="rounded-xl border border-teal-1/30 bg-surface-3 p-4">
                <h2 id="mobile-synthesis-heading" className="font-heading text-base font-bold text-teal-1">{synthesis.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-2">
                    <HighlightedText text={ACTIVE_SYNTHESIS.text} highlights={ACTIVE_SYNTHESIS.highlights} />
                </p>
                <hr className="my-3 border-teal-1/20" />
                <CitationList citations={ACTIVE_SYNTHESIS.citations} label="Synthesis citations" />
            </section>

            <section aria-labelledby="mobile-recent-heading">
                <h2 id="mobile-recent-heading" className="mb-3 font-heading text-lg font-bold text-slate-1">{recentFiles.heading}</h2>
                <ul className="flex flex-col gap-3">
                    {RECENT_FILES.map((file) => <IngestedFileRow key={file.name} file={file} />)}
                </ul>
            </section>
        </div>
    </>
}
