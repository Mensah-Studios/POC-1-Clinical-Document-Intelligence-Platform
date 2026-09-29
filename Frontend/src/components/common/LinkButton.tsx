import { Link } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import type { LinkButtonProps } from "../../Types/LinkButtonProps";
import { BUTTON_BASE, BUTTON_VARIANTS } from "../../constants/styles";

export default function LinkButton({ to, children, variant = "primary", icon, className }: LinkButtonProps): JSX.Element {
    return <Link to={to} className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className ?? ""}`}>
        {icon}
        {children}
    </Link>
}
