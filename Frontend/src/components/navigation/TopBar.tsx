import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { DatabaseSearchIcon } from "../icons/Icons";
import { TOP_BAR } from "../../constants/navigation";
import { ROUTES } from "../../constants/routes";
import type { TopBarProps } from "../../Types/TopBarProps";

export default function TopBar({ title }: TopBarProps): JSX.Element {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = query.trim();
        navigate(trimmed ? `${ROUTES.search}?q=${encodeURIComponent(trimmed)}` : ROUTES.search);
    }

    return <header className="sticky top-0 z-10 flex h-18 shrink-0 items-center justify-between gap-6 border-b border-border-color bg-surface-1 px-8">
        <h1 className="font-heading text-2xl font-bold text-slate-1">{title}</h1>
        <div className="flex items-center gap-4">
            <p role="status" className="flex items-center gap-2 rounded-md border border-border-color px-3 py-1.5 text-xs font-semibold text-slate-1">
                <span aria-hidden="true" className="size-2 rounded-full bg-green-1" />
                {TOP_BAR.baaStatus}
            </p>
            <form role="search" aria-label={TOP_BAR.searchLabel} onSubmit={handleSubmit} className="flex w-64 items-center gap-2 rounded-md bg-surface-2 px-3 py-2">
                <DatabaseSearchIcon className="size-4 shrink-0 text-slate-2" />
                <input
                    type="search"
                    aria-label={TOP_BAR.searchLabel}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={TOP_BAR.searchPlaceholder}
                    className="w-full bg-transparent text-xs text-slate-1 outline-none placeholder:text-slate-3"
                />
            </form>
        </div>
    </header>
}
