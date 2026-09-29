import type { JSX } from "react/jsx-runtime";
import Avatar from "../common/Avatar";
import { CURRENT_USER, ORGANIZATION } from "../../constants/navigation";

export default function SessionCard(): JSX.Element {
    return <section aria-label="Active session" className="rounded-lg bg-surface-2 p-3">
        <div className="flex items-center gap-3">
            <div aria-hidden="true" className="size-8 shrink-0 rounded-md border border-border-color bg-surface-1" />
            <div>
                <p className="text-xs font-semibold text-slate-1">{ORGANIZATION.name}</p>
                <p className="text-[11px] text-slate-3">{ORGANIZATION.nodeId}</p>
            </div>
        </div>
        <hr className="my-3 border-border-color" />
        <div className="flex items-center gap-3">
            <Avatar name={CURRENT_USER.name} size="sm" />
            <div>
                <p className="text-xs font-semibold text-slate-1">{CURRENT_USER.name}</p>
                <p className="text-[11px] text-slate-3">{CURRENT_USER.session}</p>
            </div>
        </div>
    </section>
}
