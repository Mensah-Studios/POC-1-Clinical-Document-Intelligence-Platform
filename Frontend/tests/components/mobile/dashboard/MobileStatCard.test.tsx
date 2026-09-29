import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileStatCard from "../../../../src/components/mobile/dashboard/MobileStatCard";

describe("MobileStatCard", () => {
    it("renders label, value, caption and icon with the tone", () => {
        render(<MobileStatCard label="Patient Ledgers" value="4,281 Patients" caption="+24 today" tone="green" icon={<svg data-testid="icon" />} />);
        const card = screen.getByRole("article", { name: "Patient Ledgers" });
        expect(card).toHaveTextContent("4,281 Patients");
        expect(screen.getByText("+24 today")).toHaveClass("text-green-1");
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
});
