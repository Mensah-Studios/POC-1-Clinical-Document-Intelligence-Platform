import { useState } from "react";
import type { SubmitEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { PATIENT_VIEW_CONTENT } from "../../constants/patients";
import type { ClinicalQueryPanelProps } from "../../Types/ClinicalQueryPanelProps";

export default function ClinicalQueryPanel({ placeholder, onSubmit }: ClinicalQueryPanelProps): JSX.Element {
    const [query, setQuery] = useState("");
    const { heading, label, model, submit } = PATIENT_VIEW_CONTENT.query;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(query.trim());
    }

    return <section aria-labelledby="clinical-query-heading" className="rounded-xl bg-teal-2 p-6 text-surface-1">
        <h2 id="clinical-query-heading" className="font-heading text-lg font-bold">{heading}</h2>
        <form aria-label={heading} onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <input
                aria-label={label}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg bg-surface-1 px-4 py-3.5 text-sm text-slate-1 outline-none placeholder:text-slate-3 focus:ring-2 focus:ring-green-1"
            />
            <div className="flex items-center justify-between">
                <span className="text-xs text-surface-1/80">{model}</span>
                <button type="submit" className="cursor-pointer rounded-md bg-teal-1 px-4 py-2 text-sm font-semibold transition-colors hover:bg-teal-1/80">
                    {submit}
                </button>
            </div>
        </form>
    </section>
}
