import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationMenu from "../../../../src/components/mobile/navigation/NavigationMenu";
import { MOBILE_MENU_CONTENT, MOBILE_NAV_ITEMS, MOBILE_WORKSPACE_TOOLS } from "../../../../src/constants/mobile";
import { renderWithRouter } from "../../../renderWithRouter";

function renderMenu(open: boolean, onClose = () => {}, route = "/home") {
    return renderWithRouter(<NavigationMenu open={open} onClose={onClose} />, { route, path: "*" });
}

describe("NavigationMenu", () => {
    it("renders nothing while closed", () => {
        renderMenu(false);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders a modal dialog with primary destinations and workspace tools", () => {
        renderMenu(true);
        const dialog = screen.getByRole("dialog", { name: MOBILE_MENU_CONTENT.title });
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(within(screen.getByRole("list", { name: MOBILE_MENU_CONTENT.primaryHeading })).getAllByRole("listitem")).toHaveLength(MOBILE_NAV_ITEMS.length);
        expect(within(screen.getByRole("list", { name: MOBILE_MENU_CONTENT.toolsHeading })).getAllByRole("listitem")).toHaveLength(MOBILE_WORKSPACE_TOOLS.length);
        expect(dialog).toHaveTextContent(MOBILE_MENU_CONTENT.footer);
    });

    it("highlights the current section", () => {
        renderMenu(true, () => {}, "/patients/892-019");
        expect(screen.getByRole("link", { name: /Patients/ })).toHaveAttribute("aria-current", "page");
    });

    it("focuses the close button when opened", () => {
        renderMenu(true);
        expect(within(screen.getByRole("dialog")).getByRole("button", { name: MOBILE_MENU_CONTENT.close })).toHaveFocus();
    });

    it("closes from the close button, the backdrop and Escape", async () => {
        const onClose = vi.fn();
        renderMenu(true, onClose);
        const [backdrop, closeButton] = screen.getAllByRole("button", { name: MOBILE_MENU_CONTENT.close });
        await userEvent.click(closeButton);
        await userEvent.click(backdrop);
        await userEvent.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(3);
    });

    it("ignores other keys", async () => {
        const onClose = vi.fn();
        renderMenu(true, onClose);
        await userEvent.keyboard("a");
        expect(onClose).not.toHaveBeenCalled();
    });

    it("closes after choosing a destination", async () => {
        const onClose = vi.fn();
        renderMenu(true, onClose);
        await userEvent.click(screen.getByRole("link", { name: /Upload/ }));
        expect(onClose).toHaveBeenCalledOnce();
        expect(screen.getByTestId("location")).toHaveTextContent("/upload-documents");
    });
});
