import type { JSX } from "react/jsx-runtime";
import TopBar from "../../components/navigation/TopBar";
import Card from "../../components/common/Card";
import LinkButton from "../../components/common/LinkButton";
import CitationList from "../../components/common/CitationList";
import HighlightedText from "../../components/common/HighlightedText";
import StatCard from "../../components/dashboard/StatCard";
import IngestedFileRow from "../../components/dashboard/IngestedFileRow";
import QueryTokensCard from "../../components/dashboard/QueryTokensCard";
import { CircleCheckIcon, DatabaseIcon, UsersIcon } from "../../components/icons/Icons";
import { ACTIVE_SYNTHESIS, DASHBOARD_CONTENT, RECENT_FILES, TOKEN_QUOTA } from "../../constants/dashboard";
import { ROUTES } from "../../constants/routes";

export default function Dashboard(): JSX.Element {
    const { stats, recentFiles, synthesis } = DASHBOARD_CONTENT;
    const quotaPercent = Math.round((TOKEN_QUOTA.used / TOKEN_QUOTA.total) * 100);

    return <>
        <TopBar title={DASHBOARD_CONTENT.title} />
        <div className="flex flex-col gap-6 p-8">
            <section aria-label="Key metrics" className="grid grid-cols-3 gap-6">
                <StatCard
                    label={stats.ledgers.label}
                    value={stats.ledgers.value}
                    caption={stats.ledgers.caption}
                    captionTone="green"
                    icon={<UsersIcon className="size-4" />}
                    iconTone="teal"
                />
                <StatCard
                    label={stats.quota.label}
                    value={`${TOKEN_QUOTA.used.toLocaleString("en-US")} / ${TOKEN_QUOTA.total.toLocaleString("en-US")}`}
                    caption={`${quotaPercent}${stats.quota.captionSuffix}`}
                    captionTone="warning"
                    icon={<DatabaseIcon className="size-4" />}
                    iconTone="warning"
                    progress={quotaPercent}
                />
                <StatCard
                    label={stats.citations.label}
                    value={stats.citations.value}
                    caption={stats.citations.caption}
                    captionTone="green"
                    icon={<CircleCheckIcon className="size-4" />}
                    iconTone="green"
                />
            </section>

            <div className="grid grid-cols-[minmax(0,1fr)_420px] items-start gap-6">
                <Card
                    title={recentFiles.heading}
                    description={recentFiles.description}
                    action={<LinkButton to={ROUTES.upload} variant="soft" className="shrink-0 px-3 py-1.5 text-xs">{recentFiles.uploadNew}</LinkButton>}
                >
                    <ul className="flex flex-col gap-3">
                        {RECENT_FILES.map((file) => <IngestedFileRow key={file.name} file={file} />)}
                    </ul>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card title={synthesis.heading} description={synthesis.description}>
                        <blockquote className="rounded-lg border border-teal-1/30 bg-surface-3 p-4">
                            <p className="text-sm leading-relaxed text-slate-2">
                                <HighlightedText text={ACTIVE_SYNTHESIS.text} highlights={ACTIVE_SYNTHESIS.highlights} />
                            </p>
                            <hr className="my-3 border-teal-1/20" />
                            <CitationList citations={ACTIVE_SYNTHESIS.citations} label="Synthesis citations" />
                        </blockquote>
                    </Card>
                    <QueryTokensCard used={TOKEN_QUOTA.used} total={TOKEN_QUOTA.total} />
                </div>
            </div>
        </div>
    </>
}
