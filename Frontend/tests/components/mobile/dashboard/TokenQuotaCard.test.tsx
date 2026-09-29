import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TokenQuotaCard from "../../../../src/components/mobile/dashboard/TokenQuotaCard";
import { MOBILE_DASHBOARD_CONTENT } from "../../../../src/constants/mobile";

const content = MOBILE_DASHBOARD_CONTENT.tokens;

describe("TokenQuotaCard", () => {
    it("shows formatted usage and utilisation", () => {
        render(<TokenQuotaCard used={14250} total={25000} />);
        expect(screen.getByRole("region", { name: content.heading })).toHaveTextContent("14,250 / 25,000");
        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "57");
        expect(screen.getByText(`57${content.utilizedSuffix}`)).toBeInTheDocument();
    });

    it("calls onAllocate from the allocate action", async () => {
        const onAllocate = vi.fn();
        render(<TokenQuotaCard used={1} total={2} onAllocate={onAllocate} />);
        await userEvent.click(screen.getByRole("button", { name: content.allocate }));
        expect(onAllocate).toHaveBeenCalledOnce();
    });
});
