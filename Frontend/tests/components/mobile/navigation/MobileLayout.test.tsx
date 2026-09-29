import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import MobileLayout from "../../../../src/components/mobile/navigation/MobileLayout";
import { MOBILE_MENU_CONTENT } from "../../../../src/constants/mobile";

function renderLayout() {
    return render(
        <MemoryRouter initialEntries={["/home"]}>
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route path="/home" element={<Link to="/search">home content</Link>} />
                    <Route path="/search" element={<p>search content</p>} />
                </Route>
            </Routes>
        </MemoryRouter>,
    );
}

describe("MobileLayout", () => {
    it("renders the routed page above the tab bar", () => {
        renderLayout();
        expect(screen.getByRole("main")).toHaveTextContent("home content");
        expect(screen.getByRole("navigation", { name: MOBILE_MENU_CONTENT.tabBarLabel })).toBeInTheDocument();
    });

    it("opens and closes the menu from the account tab", async () => {
        renderLayout();
        await userEvent.click(screen.getByRole("button", { name: "Account" }));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: "Account" }));
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes the menu from inside the sheet", async () => {
        renderLayout();
        await userEvent.click(screen.getByRole("button", { name: "Account" }));
        await userEvent.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes the menu when the route changes by other means", async () => {
        renderLayout();
        await userEvent.click(screen.getByRole("button", { name: "Account" }));
        await userEvent.click(screen.getByRole("link", { name: "home content" }));
        expect(screen.getByRole("main")).toHaveTextContent("search content");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});
