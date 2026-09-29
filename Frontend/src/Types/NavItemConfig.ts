import type { ComponentType } from "react";
import type { IconProps } from "./IconProps";

export type NavItemConfig = {
    label: string;
    icon: ComponentType<IconProps>;
    to?: string;
    matches?: string[];
};
