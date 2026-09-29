import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant } from "./ButtonVariant";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    icon?: ReactNode;
};
