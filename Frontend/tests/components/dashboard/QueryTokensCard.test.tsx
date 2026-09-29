import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueryTokensCard from "../../../src/components/dashboard/QueryTokensCard";
import { DASHBOARD_CONTENT } from "../../../src/constants/dashboard";

describe("QueryTokensCard", () => {
    it("shows formatted usage and a proportional progress bar", () => {
        render(<QueryTokensCard used={14250} total={25000} />);
        expect(screen.getByText("14,250 / 25,000")).toBeInTheDocument();
        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "57");
    });

    it("calls onAllocate when the allocate button is pressed", async () => {
        const onAllocate = vi.fn();
        render(<QueryTokensCard used={1} total={2} onAllocate={onAllocate} />);
        await userEvent.click(screen.getByRole("button", { name: DASHBOARD_CONTENT.tokens.allocate }));
        expect(onAllocate).toHaveBeenCalledOnce();
    });
});
