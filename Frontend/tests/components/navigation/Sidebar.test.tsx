import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import Sidebar from "../../../src/components/navigation/Sidebar";
import { NAV_ITEMS } from "../../../src/constants/navigation";
import { renderWithRouter } from "../../renderWithRouter";

function currentItem() {
    const nav = screen.getByRole("navigation", { name: "Primary" });
    return within(nav).getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "page");
}

describe("Sidebar", () => {
    it("renders every navigation item", () => {
        renderWithRouter(<Sidebar />, { route: "/home", path: "/home" });
        const nav = screen.getByRole("navigation", { name: "Primary" });
        expect(within(nav).getAllByRole("listitem")).toHaveLength(NAV_ITEMS.length);
        NAV_ITEMS.forEach(({ label }) => expect(within(nav).getByText(label)).toBeInTheDocument());
    });

    it.each([
        ["/home", "Executive Dashboard"],
        ["/upload-documents", "Upload Records"],
        ["/search", "Longitudinal Ledgers"],
        ["/patients/892-019", "Longitudinal Ledgers"],
        ["/patients/892-019/delete", "Longitudinal Ledgers"],
    ])("highlights the right item at %s", (route, label) => {
        renderWithRouter(<Sidebar />, { route, path: "*" });
        const active = currentItem();
        expect(active).toHaveLength(1);
        expect(active[0]).toHaveTextContent(label);
    });

    it("highlights nothing on an unknown route", () => {
        renderWithRouter(<Sidebar />, { route: "/elsewhere", path: "*" });
        expect(currentItem()).toHaveLength(0);
    });

    it("includes the session card", () => {
        renderWithRouter(<Sidebar />, { route: "/home", path: "/home" });
        expect(screen.getByRole("region", { name: "Active session" })).toBeInTheDocument();
    });
});
