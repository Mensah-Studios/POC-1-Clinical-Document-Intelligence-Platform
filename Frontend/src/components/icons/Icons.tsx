import type { JSX } from "react/jsx-runtime";
import type { IconProps } from "../../Types/IconProps";

const iconBase = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
};

export function ShieldCheckIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
}

export function CircleXIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-6 6M9 9l6 6" />
    </svg>
}

export function KeyIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="m10.7 12.3 9.3-9.3M16 7l3 3M14 9l2 2" />
    </svg>
}

export function MailIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </svg>
}

export function LockIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
}

export function UnlockIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    </svg>
}

export function EyeIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
}

export function EyeOffIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
    </svg>
}

export function NoticeIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M12 7v5M12 15.5v.5" />
    </svg>
}

export function LayoutGridIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
}

export function CloudUploadIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
        <path d="M12 12v9M8 16l4-4 4 4" />
    </svg>
}

export function FolderOpenIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="m6 14 1.5-2.9A2 2 0 0 1 9.2 10H20a2 2 0 0 1 1.9 2.5l-1.5 6a2 2 0 0 1-2 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.7.9l.8 1.2a2 2 0 0 0 1.7.9H18a2 2 0 0 1 2 2v2" />
    </svg>
}

export function MessageCircleIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
}

export function DatabaseIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
}

export function DatabaseSearchIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M21 11.7V5M3 5v14a9 3 0 0 0 9.3 3" />
        <path d="M3 12a9 3 0 0 0 9 3" />
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="m22 22-1.9-1.9" />
    </svg>
}

export function UsersIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </svg>
}

export function CircleCheckIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="m9 12 2 2 4-4" />
    </svg>
}

export function FileTextIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
    </svg>
}

export function AlertTriangleIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" />
        <path d="M12 9v4M12 17h.01" />
    </svg>
}

export function ChevronDownIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
}

export function XIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
}

export function UserIcon({ className }: IconProps): JSX.Element {
    return <svg {...iconBase} className={className}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
}
