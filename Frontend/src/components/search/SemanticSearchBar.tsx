import type { SubmitEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { DatabaseSearchIcon } from "../icons/Icons";
import { SEARCH_CONTENT } from "../../constants/search";
import type { SemanticSearchBarProps } from "../../Types/SemanticSearchBarProps";

export default function SemanticSearchBar({ value, onChange, onSubmit }: SemanticSearchBarProps): JSX.Element {
    const { label, placeholder, badge } = SEARCH_CONTENT.finder;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
    }

    return <form role="search" aria-label={label} onSubmit={handleSubmit} className="flex items-center gap-3 rounded-lg border-2 border-teal-1 px-4 py-3">
        <DatabaseSearchIcon className="size-5 shrink-0 text-teal-1" />
        <input
            type="search"
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-slate-1 outline-none placeholder:text-slate-2"
        />
        <span className="shrink-0 rounded-md bg-teal-1 px-2 py-1 text-[11px] font-semibold tracking-wide text-surface-1 uppercase">{badge}</span>
    </form>
}
