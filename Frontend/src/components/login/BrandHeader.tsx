import type { JSX } from "react/jsx-runtime";
import { ShieldCheckIcon } from "../icons/Icons";
import { BRAND_NAME } from "../../constants/constants";

export default function BrandHeader(): JSX.Element {
    return <div role="img" aria-label={`${BRAND_NAME} logo`} className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-surface-1 text-teal-1">
            <ShieldCheckIcon className="size-6" />
        </div>
        <span className="font-heading text-2xl font-bold">{BRAND_NAME}</span>
    </div>
}
