import type { JSX } from "react/jsx-runtime";
import ProgressBar from "../../common/ProgressBar";
import { DatabaseIcon } from "../../icons/Icons";
import { MOBILE_DASHBOARD_CONTENT } from "../../../constants/mobile";
import type { TokenQuotaCardProps } from "../../../Types/TokenQuotaCardProps";

export default function TokenQuotaCard({ used, total, onAllocate }: TokenQuotaCardProps): JSX.Element {
    const content = MOBILE_DASHBOARD_CONTENT.tokens;
    const percent = Math.round((used / total) * 100);

    return <section aria-labelledby="token-quota-heading" className="rounded-xl border border-border-color bg-surface-1 p-4">
        <div className="flex items-start justify-between gap-3">
            <div>
                <h2 id="token-quota-heading" className="font-heading text-base font-bold text-slate-1">{content.heading}</h2>
                <p className="text-xs text-slate-3">{content.description}</p>
            </div>
            <DatabaseIcon className="size-5 shrink-0 text-warning-1" />
        </div>
        <div className="mt-3 mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-2">{content.used}</span>
            <span className="font-semibold text-slate-1">{used.toLocaleString("en-US")} / {total.toLocaleString("en-US")}</span>
        </div>
        <ProgressBar value={percent} tone="warning" label={content.heading} />
        <div className="mt-2 flex items-center justify-between text-xs font-semibold">
            <span className="text-warning-1">{percent}{content.utilizedSuffix}</span>
            <button type="button" onClick={onAllocate} className="cursor-pointer text-teal-1 hover:underline">{content.allocate}</button>
        </div>
    </section>
}
