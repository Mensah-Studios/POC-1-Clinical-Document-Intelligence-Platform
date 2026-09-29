import { CircleXIcon, CloudUploadIcon, DatabaseIcon, FolderOpenIcon, LayoutGridIcon, MessageCircleIcon } from "../components/icons/Icons";
import type { NavItemConfig } from "../Types/NavItemConfig";
import { ROUTES } from "./routes";

export const APP_NAME = "CuraClinics";

export const COMPLIANCE_LABEL = "HIPAA Compliant / SOC-2";

export const NAV_ITEMS: NavItemConfig[] = [
    { label: "Executive Dashboard", icon: LayoutGridIcon, to: ROUTES.home },
    { label: "Upload Records", icon: CloudUploadIcon, to: ROUTES.upload },
    { label: "Longitudinal Ledgers", icon: FolderOpenIcon, to: ROUTES.search, matches: ["/patients"] },
    { label: "Query Terminal", icon: MessageCircleIcon },
    { label: "MFA & Security Keys", icon: CircleXIcon },
    { label: "Allocation & Tokens", icon: DatabaseIcon },
];

export const NAV_UNAVAILABLE_HINT = "Coming soon";

export const ORGANIZATION = {
    name: "Mount Sinai Enterprise",
    nodeId: "Node ID: MS-8201-E",
};

export const CURRENT_USER = {
    name: "Dr. Linus Patel, MD",
    session: "Active Session: 42m remaining",
};

export const TOP_BAR = {
    baaStatus: "BAA Active & Logged",
    searchLabel: "Search patients",
    searchPlaceholder: "Search Patient ID or MRN...",
};

export const CLINICAL_DISCLAIMER =
    "Synthesized information is presented as a high-confidence index tool mapping sources within Mount Sinai's " +
    "EHR database. It does not replace direct physician diagnostics, chart reviews, or clinical judgment.";
