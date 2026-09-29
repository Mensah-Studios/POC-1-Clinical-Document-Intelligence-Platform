import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileTabBar from "../../../../src/components/mobile/navigation/MobileTabBar";
import { MOBILE_MENU_CONTENT } from "../../../../src/constants/mobile";
import { renderWithRouter } from "../../../renderWithRouter";

function renderTabBar(route: string, menuOpen = false, onMenuToggle = () => {}) {
    return renderWithRouter(<MobileTabBar menuOpen={menuOpen} onMenuToggle={onMenuToggle} />, { route, path: "*" });
}

function currentTab() {
    return within(screen.getByRole("navigation", { name: MOBILE_MENU_CONTENT.tabBarLabel }))
        .queryAllByRole("link")
        .filter((link) => link.getAttribute("aria-current") === "page");
}

describe("MobileTabBar", () => {
    it("renders three destination tabs and an account menu toggle", () => {
        renderTabBar("/home");
        expect(screen.getAllByRole("link")).toHaveLength(3);
        expect(screen.getByRole("button", { name: "Account" })).toHaveAttribute("aria-expanded", "false");
    });

    it.each([
        ["/home", "Home"],
        ["/search", "Patients"],
        ["/patients/892-019/documents", "Patients"],
        ["/upload-documents", "Upload"],
    ])("marks the right tab active at %s", (route, label) => {
        renderTabBar(route);
        const active = currentTab();
        expect(active).toHaveLength(1);
        expect(active[0]).toHaveTextContent(label);
    });

    it("shows only the account tab as active while the menu is open", () => {
        renderTabBar("/home", true);
        expect(currentTab()).toHaveLength(0);
        expect(screen.getByRole("button", { name: "Account" })).toHaveAttribute("aria-expanded", "true");
    });

    it("toggles the menu from the account tab", async () => {
        const onMenuToggle = vi.fn();
        renderTabBar("/home", false, onMenuToggle);
        await userEvent.click(screen.getByRole("button", { name: "Account" }));
        expect(onMenuToggle).toHaveBeenCalledOnce();
    });

    it("navigates between tabs", async () => {
        renderTabBar("/home");
        await userEvent.click(screen.getByRole("link", { name: "Upload" }));
        expect(screen.getByTestId("location")).toHaveTextContent("/upload-documents");
    });
});
