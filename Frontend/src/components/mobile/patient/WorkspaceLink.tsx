import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { ChevronDownIcon } from "../../icons/Icons";
import { TONE_BORDER, TONE_TEXT } from "../../../constants/styles";
import type { WorkspaceLinkProps } from "../../../Types/WorkspaceLinkProps";

export default function WorkspaceLink({ title, description, to, tone }: WorkspaceLinkProps): JSX.Element {
    return <li>
        <Link to={to} className={`flex items-center gap-3 rounded-lg border bg-surface-1 px-4 py-3 ${TONE_BORDER[tone]}`}>
            <span className="flex-1">
                <span className={`block text-sm font-semibold ${TONE_TEXT[tone]}`}>{title}</span>
                <span className="block text-xs text-slate-3">{description}</span>
            </span>
            <ChevronDownIcon className="size-4 -rotate-90 text-slate-3" />
        </Link>
    </li>
}
