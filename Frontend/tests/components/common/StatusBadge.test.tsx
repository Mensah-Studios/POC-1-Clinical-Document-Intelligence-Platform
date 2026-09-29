import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "../../../src/components/common/StatusBadge";

describe("StatusBadge", () => {
    it("renders the label with tone styles", () => {
        render(<StatusBadge label="Ingested" tone="teal" />);
        const badge = screen.getByText("Ingested");
        expect(badge).toHaveClass("bg-surface-3", "text-teal-1");
        expect(badge).not.toHaveClass("uppercase");
    });

    it("supports uppercase, border and icon options", () => {
        render(<StatusBadge label="Delete" tone="danger" uppercase bordered icon={<svg data-testid="icon" />} />);
        const badge = screen.getByText("Delete");
        expect(badge).toHaveClass("uppercase", "border", "border-danger-3");
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
});
