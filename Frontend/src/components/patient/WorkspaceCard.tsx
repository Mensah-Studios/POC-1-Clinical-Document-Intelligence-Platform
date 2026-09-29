import type { JSX } from "react/jsx-runtime";
import LinkButton from "../common/LinkButton";
import StatusBadge from "../common/StatusBadge";
import type { WorkspaceCardProps } from "../../Types/WorkspaceCardProps";
import type { ButtonVariant } from "../../Types/ButtonVariant";
import type { Tone } from "../../Types/Tone";

const CONTAINER: Partial<Record<Tone, string>> = {
    teal: "border-teal-1 bg-surface-3",
    danger: "border-danger-1 bg-surface-1",
};

const ACTION_VARIANT: Record<Tone, ButtonVariant> = {
    teal: "secondary",
    green: "secondary",
    warning: "secondary",
    danger: "danger-outline",
    neutral: "outline",
};

export default function WorkspaceCard({ title, subtitle, description, badge, tone, footnote, actionLabel, to }: WorkspaceCardProps): JSX.Element {
    return <article aria-label={title} className={`flex flex-col rounded-lg border p-4 ${CONTAINER[tone] ?? "border-border-color bg-surface-1"}`}>
        <div className="flex items-start justify-between gap-4">
            <div>
                <h3 className="text-sm font-bold text-slate-1">{title}</h3>
                <p className="text-[11px] text-slate-3">{subtitle}</p>
            </div>
            <StatusBadge label={badge} tone={tone} uppercase />
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-3">{footnote}</span>
            <LinkButton to={to} variant={ACTION_VARIANT[tone]} className="px-2.5 py-1 text-xs">
                {actionLabel}
            </LinkButton>
        </div>
    </article>
}
