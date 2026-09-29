import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientSearch from "../../../src/pages/desktop/PatientSearch";
import { CLINICAL_DISCLAIMER, TOP_BAR } from "../../../src/constants/navigation";
import { PATIENT_MATCHES, SEARCH_CONTENT, SEARCH_FILTERS } from "../../../src/constants/search";
import { renderWithRouter } from "../../renderWithRouter";

function renderSearch(route = "/search") {
    return renderWithRouter(<PatientSearch />, { route, path: "/search" });
}

describe("PatientSearch page", () => {
    it("renders the title, disclaimer and finder", () => {
        renderSearch();
        expect(screen.getByRole("heading", { level: 1, name: SEARCH_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(CLINICAL_DISCLAIMER)).toBeInTheDocument();
        expect(screen.getByRole("searchbox", { name: SEARCH_CONTENT.finder.label })).toHaveValue("");
    });

    it("renders the three filters with defaults and lets them change", async () => {
        renderSearch();
        const filters = within(screen.getByRole("region", { name: "Search filters" })).getAllByRole("combobox");
        expect(filters).toHaveLength(3);
        expect(filters.map((f) => (f as HTMLSelectElement).value)).toEqual([
            SEARCH_FILTERS.facility.options[0],
            SEARCH_FILTERS.risk.options[0],
            SEARCH_FILTERS.status.options[0],
        ]);
        for (const [index, filter] of Object.values(SEARCH_FILTERS).entries()) {
            await userEvent.selectOptions(filters[index], filter.options[1]);
            expect(filters[index]).toHaveValue(filter.options[1]);
        }
    });

    it("lists matches with a count and highlights the top match", () => {
        renderSearch();
        const results = screen.getByRole("region", { name: SEARCH_CONTENT.results.heading(PATIENT_MATCHES.length) });
        const links = within(results).getAllByRole("link");
        expect(links).toHaveLength(PATIENT_MATCHES.length);
        expect(links[0]).toHaveClass("bg-surface-3");
        expect(links[1]).not.toHaveClass("bg-surface-3");
    });

    it("prefills the query from the URL", () => {
        renderSearch("/search?q=892-019");
        expect(screen.getByRole("searchbox", { name: SEARCH_CONTENT.finder.label })).toHaveValue("892-019");
    });

    it("writes a submitted query back to the URL and clears it when empty", async () => {
        renderSearch();
        const input = screen.getByRole("searchbox", { name: SEARCH_CONTENT.finder.label });
        await userEvent.type(input, "heart failure{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent("/search?q=heart+failure");
        await userEvent.clear(input);
        await userEvent.type(input, "{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent(/^\/search$/);
    });

    it("syncs the finder when the top bar searches while on this page", async () => {
        renderSearch();
        await userEvent.type(screen.getByRole("searchbox", { name: TOP_BAR.searchLabel }), "421-992{enter}");
        expect(screen.getByRole("searchbox", { name: SEARCH_CONTENT.finder.label })).toHaveValue("421-992");
    });

    it("opens a patient's overview from a match", async () => {
        renderSearch();
        await userEvent.click(screen.getByRole("link", { name: /Raymond Wong/ }));
        expect(screen.getByTestId("location")).toHaveTextContent("/patients/421-992");
    });
});
