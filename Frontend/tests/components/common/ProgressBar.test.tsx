import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../../../src/components/common/ProgressBar";

describe("ProgressBar", () => {
    it("exposes its value accessibly and sizes the fill", () => {
        render(<ProgressBar value={57} tone="warning" label="Quota" />);
        const bar = screen.getByRole("progressbar", { name: "Quota" });
        expect(bar).toHaveAttribute("aria-valuenow", "57");
        expect(bar.firstChild).toHaveStyle({ width: "57%" });
        expect(bar.firstChild).toHaveClass("bg-warning-1");
    });

    it("clamps values outside 0-100", () => {
        const { rerender } = render(<ProgressBar value={140} tone="teal" label="Over" />);
        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
        rerender(<ProgressBar value={-5} tone="teal" label="Under" />);
        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    });
});
