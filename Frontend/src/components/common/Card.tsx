import { useId } from "react";
import type { JSX } from "react/jsx-runtime";
import type { CardProps } from "../../Types/CardProps";

export default function Card({ children, title, titleAdornment, description, action, className }: CardProps): JSX.Element {
    const headingId = useId();

    return <section
        aria-labelledby={title ? headingId : undefined}
        className={`rounded-xl border border-border-color bg-surface-1 p-6 ${className ?? ""}`}
    >
        {title && <header className="mb-4 flex items-start justify-between gap-4">
            <div>
                <div className="flex flex-wrap items-center gap-3">
                    <h2 id={headingId} className="font-heading text-lg font-bold text-slate-1">{title}</h2>
                    {titleAdornment}
                </div>
                {description && <p className="mt-1 text-sm text-slate-3">{description}</p>}
            </div>
            {action}
        </header>}
        {children}
    </section>
}
