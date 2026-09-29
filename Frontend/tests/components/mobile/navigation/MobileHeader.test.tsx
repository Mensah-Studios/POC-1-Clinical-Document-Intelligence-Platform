import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileHeader from "../../../../src/components/mobile/navigation/MobileHeader";
import { MOBILE_HEADER_BADGES } from "../../../../src/constants/mobile";

describe("MobileHeader", () => {
    it("renders the title, logo and logged badge", () => {
        render(<MobileHeader title="Dashboard" badge="logged" />);
        expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
        expect(screen.getByRole("img", { name: /logo/ })).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(MOBILE_HEADER_BADGES.logged);
    });

    it("renders an optional subtitle and the HIPAA badge", () => {
        render(<MobileHeader title="Overview" subtitle="Chart index" badge="hipaa" />);
        expect(screen.getByText("Chart index")).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(MOBILE_HEADER_BADGES.hipaa);
    });
});
