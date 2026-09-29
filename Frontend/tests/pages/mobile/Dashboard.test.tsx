import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import MobileDashboard from "../../../src/pages/mobile/Dashboard";
import { ACTIVE_SYNTHESIS, RECENT_FILES } from "../../../src/constants/dashboard";
import { MOBILE_DASHBOARD_CONTENT } from "../../../src/constants/mobile";
import { renderWithRouter } from "../../renderWithRouter";

const content = MOBILE_DASHBOARD_CONTENT;

describe("Mobile Dashboard page", () => {
    it("renders the header and two stat cards", () => {
        renderWithRouter(<MobileDashboard />);
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        const metrics = within(screen.getByRole("region", { name: "Key metrics" })).getAllByRole("article");
        expect(metrics).toHaveLength(2);
        expect(metrics[0]).toHaveTextContent(content.stats.ledgers.value);
        expect(metrics[1]).toHaveTextContent(content.stats.accuracy.value);
    });

    it("shows the token quota card", () => {
        renderWithRouter(<MobileDashboard />);
        expect(screen.getByRole("region", { name: content.tokens.heading })).toHaveTextContent("14,250 / 25,000");
    });

    it("shows the active synthesis with citations", () => {
        renderWithRouter(<MobileDashboard />);
        const synthesis = screen.getByRole("region", { name: content.synthesis.heading });
        expect(within(synthesis).getByText("42%").tagName).toBe("STRONG");
        expect(within(synthesis).getAllByRole("listitem")).toHaveLength(ACTIVE_SYNTHESIS.citations.length);
    });

    it("lists recently ingested files linked to their patients", () => {
        renderWithRouter(<MobileDashboard />);
        const recent = screen.getByRole("region", { name: content.recentFiles.heading });
        expect(within(recent).getAllByRole("listitem")).toHaveLength(RECENT_FILES.length);
        expect(within(recent).getAllByRole("link")[0]).toHaveAttribute("href", `/patients/${RECENT_FILES[0].mrn}`);
    });
});
