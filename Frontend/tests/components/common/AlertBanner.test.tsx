import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertBanner from "../../../src/components/common/AlertBanner";

describe("AlertBanner", () => {
    it("renders a titled note with icon and body", () => {
        render(<AlertBanner tone="warning" title="Discrepancy" icon={<svg data-testid="icon" />}>Check dose</AlertBanner>);
        const note = screen.getByRole("note", { name: "Discrepancy" });
        expect(note).toHaveClass("bg-warning-2");
        expect(screen.getByText("Discrepancy")).toHaveClass("text-warning-1");
        expect(screen.getByText("Check dose")).toBeInTheDocument();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("falls back to a generic label without a title", () => {
        render(<AlertBanner tone="danger">Retention policy</AlertBanner>);
        expect(screen.getByRole("note", { name: "Notice" })).toHaveClass("bg-danger-2");
    });
});
