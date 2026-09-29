import type { InputHTMLAttributes, ReactNode } from "react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    icon: ReactNode;
    trailing?: ReactNode;
};
