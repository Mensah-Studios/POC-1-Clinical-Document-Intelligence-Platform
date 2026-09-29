import type { JSX } from "react/jsx-runtime";
import { EyeIcon, EyeOffIcon } from "../icons/Icons";
import { PASSWORD_TOGGLE_LABELS } from "../../constants/constants";
import type { PasswordToggleProps } from "../../Types/PasswordToggleProps";

export default function PasswordToggle({ visible, onToggle, controls }: PasswordToggleProps): JSX.Element {
    return <button
        type="button"
        onClick={onToggle}
        aria-label={visible ? PASSWORD_TOGGLE_LABELS.hide : PASSWORD_TOGGLE_LABELS.show}
        aria-pressed={visible}
        aria-controls={controls}
        className="cursor-pointer text-slate-2 hover:text-slate-1"
    >
        {visible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
    </button>
}
