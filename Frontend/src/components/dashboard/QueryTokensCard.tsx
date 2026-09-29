import type { JSX } from "react/jsx-runtime";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import { DatabaseIcon } from "../icons/Icons";
import { DASHBOARD_CONTENT } from "../../constants/dashboard";
import type { QueryTokensCardProps } from "../../Types/QueryTokensCardProps";

export default function QueryTokensCard({ used, total, onAllocate }: QueryTokensCardProps): JSX.Element {
    const { heading, quotaLabel, allocate } = DASHBOARD_CONTENT.tokens;

    return <Card title={heading}>
        <div className="flex items-center justify-between text-xs text-slate-2">
            <span>{quotaLabel}</span>
            <span className="font-semibold text-slate-1">{used.toLocaleString("en-US")} / {total.toLocaleString("en-US")}</span>
        </div>
        <div className="mt-2">
            <ProgressBar value={(used / total) * 100} tone="teal" label={heading} />
        </div>
        <Button onClick={onAllocate} icon={<DatabaseIcon className="size-4" />} className="mt-4 w-full py-2.5">
            {allocate}
        </Button>
    </Card>
}
