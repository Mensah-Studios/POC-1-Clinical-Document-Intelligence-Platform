import type { JSX } from "react/jsx-runtime";
import type { CitationListProps } from "../../Types/CitationListProps";

export default function CitationList({ citations, label }: CitationListProps): JSX.Element {
    return <ol aria-label={label} className="flex flex-col gap-2">
        {citations.map(({ marker, source, detail }) => (
            <li key={`${marker}-${source}`} className="flex gap-2 text-xs text-slate-2">
                <span className="font-semibold text-teal-1">[{marker}]</span>
                <span>{source} · {detail}</span>
            </li>
        ))}
    </ol>
}
