import type { JSX } from "react/jsx-runtime";
import type { AvatarProps } from "../../Types/AvatarProps";

const SIZES = {
    sm: "size-8 text-xs",
    md: "size-10 text-xs",
    lg: "size-16 text-lg",
};

export default function Avatar({ name, size = "md", highlighted = false }: AvatarProps): JSX.Element {
    const initials = name
        .replace(/^Dr\.\s*/, "")
        .split(/[\s,]+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return <span
        role="img"
        aria-label={name}
        className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${SIZES[size]} ${highlighted ? "bg-surface-1 text-teal-1" : "bg-surface-2 text-slate-2"}`}
    >
        {initials}
    </span>
}
