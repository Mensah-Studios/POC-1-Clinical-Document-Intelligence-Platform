import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SidebarBrand from "../../../src/components/navigation/SidebarBrand";
import { APP_NAME, COMPLIANCE_LABEL } from "../../../src/constants/navigation";

describe("SidebarBrand", () => {
    it("renders the logo and compliance label", () => {
        render(<SidebarBrand />);
        expect(screen.getByRole("img", { name: `${APP_NAME} logo` })).toHaveTextContent(APP_NAME);
        expect(screen.getByText(COMPLIANCE_LABEL)).toBeInTheDocument();
    });
});
