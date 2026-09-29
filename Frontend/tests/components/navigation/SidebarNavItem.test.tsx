import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import SidebarNavItem from "../../../src/components/navigation/SidebarNavItem";
import { NAV_UNAVAILABLE_HINT } from "../../../src/constants/navigation";
import { renderWithRouter } from "../../renderWithRouter";

function renderItem(props: Parameters<typeof SidebarNavItem>[0]) {
    return renderWithRouter(<ul><SidebarNavItem {...props} /></ul>);
}

describe("SidebarNavItem", () => {
    it("marks the active link as the current page", () => {
        renderItem({ label: "Dashboard", icon: <svg />, to: "/home", active: true });
        const link = screen.getByRole("link", { name: "Dashboard" });
        expect(link).toHaveAttribute("href", "/home");
        expect(link).toHaveAttribute("aria-current", "page");
        expect(link).toHaveClass("text-teal-1");
    });

    it("renders inactive links without aria-current", () => {
        renderItem({ label: "Upload", icon: <svg />, to: "/upload-documents", active: false });
        expect(screen.getByRole("link", { name: "Upload" })).not.toHaveAttribute("aria-current");
    });

    it("renders items without a destination as disabled", () => {
        renderItem({ label: "Query Terminal", icon: <svg />, active: false });
        const item = screen.getByRole("link", { name: "Query Terminal" });
        expect(item).toHaveAttribute("aria-disabled", "true");
        expect(item).toHaveAttribute("title", NAV_UNAVAILABLE_HINT);
        expect(item).not.toHaveAttribute("href");
    });
});
