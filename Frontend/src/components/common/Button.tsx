import type { JSX } from "react/jsx-runtime";
import type { ButtonProps } from "../../Types/ButtonProps";
import { BUTTON_BASE, BUTTON_VARIANTS } from "../../constants/styles";

export default function Button({ variant = "primary", icon, className, type = "button", children, ...buttonProps }: ButtonProps): JSX.Element {
    return <button
        {...buttonProps}
        type={type}
        className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className ?? ""}`}
    >
        {icon}
        {children}
    </button>
}
