import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterChips from "../../../src/components/common/FilterChips";

const options = [
    { value: "All", label: "All", count: 3 },
    { value: "PDF", label: "PDF", count: 2 },
];

describe("FilterChips", () => {
    it("renders a labelled group with counts and marks the selection", () => {
        render(<FilterChips label="Formats" options={options} value="All" onChange={() => {}} />);
        expect(screen.getByRole("group", { name: "Formats" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "All (3)" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "PDF (2)" })).toHaveAttribute("aria-pressed", "false");
    });

    it("reports the chosen option", async () => {
        const onChange = vi.fn();
        render(<FilterChips label="Formats" options={options} value="All" onChange={onChange} />);
        await userEvent.click(screen.getByRole("button", { name: "PDF (2)" }));
        expect(onChange).toHaveBeenCalledWith("PDF");
    });
});
