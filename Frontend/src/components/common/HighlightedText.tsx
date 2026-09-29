import type { JSX } from "react/jsx-runtime";
import type { HighlightedTextProps } from "../../Types/HighlightedTextProps";

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightedText({ text, highlights }: HighlightedTextProps): JSX.Element {
    if (highlights.length === 0) return <>{text}</>;

    const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`);
    const parts = text.split(pattern);

    return <>
        {parts.map((part, index) => highlights.includes(part)
            ? <strong key={index} className="font-semibold text-teal-1">{part}</strong>
            : part)}
    </>
}
