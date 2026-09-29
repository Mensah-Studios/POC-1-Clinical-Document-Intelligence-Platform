import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationMenuItem from "../../../../src/components/mobile/navigation/NavigationMenuItem";
import { NAV_UNAVAILABLE_HINT } from "../../../../src/constants/navigation";
import { renderWithRouter } from "../../../renderWithRouter";

function renderItem(props: Partial<Parameters<typeof NavigationMenuItem>[0]> = {}) {
    return renderWithRouter(<ul>
        <NavigationMenuItem label="Home" description="Dashboard" icon={<svg />} to="/home" active={false} onNavigate={() => {}} {...props} />
    </ul>);
}

describe("NavigationMenuItem", () => {
    it("renders a link with its description", () => {
        renderItem();
        const link = screen.getByRole("link", { name: /Home/ });
        expect(link).toHaveAttribute("href", "/home");
        expect(link).toHaveTextContent("Dashboard");
        expect(link).not.toHaveAttribute("aria-current");
    });

    it("highlights the active destination", () => {
        renderItem({ active: true });
        const link = screen.getByRole("link", { name: /Home/ });
        expect(link).toHaveAttribute("aria-current", "page");
        expect(link).toHaveClass("bg-surface-3");
    });

    it("calls onNavigate when followed", async () => {
        const onNavigate = vi.fn();
        renderItem({ onNavigate });
        await userEvent.click(screen.getByRole("link", { name: /Home/ }));
        expect(onNavigate).toHaveBeenCalledOnce();
        expect(screen.getByTestId("location")).toHaveTextContent("/home");
    });

    it("renders unavailable items as disabled", () => {
        renderItem({ to: undefined, label: "Account" });
        const item = screen.getByRole("link", { name: /Account/ });
        expect(item).toHaveAttribute("aria-disabled", "true");
        expect(item).toHaveAttribute("title", NAV_UNAVAILABLE_HINT);
        expect(item).not.toHaveAttribute("href");
    });
});
