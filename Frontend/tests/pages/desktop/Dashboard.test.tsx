import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../../src/pages/desktop/Dashboard";
import { ACTIVE_SYNTHESIS, DASHBOARD_CONTENT, RECENT_FILES } from "../../../src/constants/dashboard";
import { renderWithRouter } from "../../renderWithRouter";

function renderDashboard() {
    return renderWithRouter(<Dashboard />, { route: "/home", path: "/home" });
}

describe("Dashboard page", () => {
    it("renders the title and three key metrics", () => {
        renderDashboard();
        expect(screen.getByRole("heading", { level: 1, name: DASHBOARD_CONTENT.title })).toBeInTheDocument();
        const metrics = within(screen.getByRole("region", { name: "Key metrics" })).getAllByRole("article");
        expect(metrics).toHaveLength(3);
        expect(metrics[1]).toHaveTextContent("14,250 / 25,000");
        expect(metrics[1]).toHaveTextContent("57% of limit reached");
    });

    it("lists every recently ingested file", () => {
        renderDashboard();
        const list = within(screen.getByRole("region", { name: DASHBOARD_CONTENT.recentFiles.heading })).getByRole("list");
        expect(within(list).getAllByRole("listitem")).toHaveLength(RECENT_FILES.length);
    });

    it("shows the active synthesis with citations", () => {
        renderDashboard();
        const synthesis = screen.getByRole("region", { name: DASHBOARD_CONTENT.synthesis.heading });
        expect(within(synthesis).getByText("42%").tagName).toBe("STRONG");
        expect(within(synthesis).getAllByRole("listitem")).toHaveLength(ACTIVE_SYNTHESIS.citations.length);
    });

    it("shows the institutional token card", () => {
        renderDashboard();
        expect(screen.getByRole("button", { name: DASHBOARD_CONTENT.tokens.allocate })).toBeInTheDocument();
    });

    it("navigates to the upload page from Upload New", async () => {
        renderDashboard();
        await userEvent.click(screen.getByRole("link", { name: DASHBOARD_CONTENT.recentFiles.uploadNew }));
        expect(screen.getByTestId("location")).toHaveTextContent("/upload-documents");
    });
});
