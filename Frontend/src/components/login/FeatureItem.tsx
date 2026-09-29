import type { JSX } from "react/jsx-runtime";
import { ShieldCheckIcon } from "../icons/Icons";
import type { FeatureItemProps } from "../../Types/FeatureItemProps";

export default function FeatureItem({ title, description }: FeatureItemProps): JSX.Element {
    return <li role="listitem" aria-label={title} className="flex gap-4">
        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-1/15">
            <ShieldCheckIcon className="size-3.5" />
        </div>
        <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-1 text-xs text-surface-1/80">{description}</p>
        </div>
    </li>
}
