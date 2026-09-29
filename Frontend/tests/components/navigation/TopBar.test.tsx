import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopBar from "../../../src/components/navigation/TopBar";
import { TOP_BAR } from "../../../src/constants/navigation";
import { renderWithRouter } from "../../renderWithRouter";

describe("TopBar", () => {
    it("renders the page title and BAA status", () => {
        renderWithRouter(<TopBar title="Dashboard" />);
        expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(TOP_BAR.baaStatus);
    });

    it("sends the search query to the patient search page", async () => {
        renderWithRouter(<TopBar title="Dashboard" />);
        await userEvent.type(screen.getByRole("searchbox", { name: TOP_BAR.searchLabel }), " 892-019 {enter}");
        expect(screen.getByTestId("location")).toHaveTextContent("/search?q=892-019");
    });

    it("opens the search page without a query when the box is empty", async () => {
        renderWithRouter(<TopBar title="Dashboard" />);
        await userEvent.type(screen.getByRole("searchbox"), "{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent(/^\/search$/);
    });
});
