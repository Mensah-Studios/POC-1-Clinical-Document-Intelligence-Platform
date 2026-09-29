import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobilePatientSearch from "../../../src/pages/mobile/PatientSearch";
import { MOBILE_CLINICAL_DISCLAIMER, MOBILE_SEARCH_CONTENT } from "../../../src/constants/mobile";
import { PATIENT_MATCHES, SEARCH_FILTERS } from "../../../src/constants/search";
import { renderWithRouter } from "../../renderWithRouter";

const { finder, results } = MOBILE_SEARCH_CONTENT;

function renderSearch(route = "/search") {
    return renderWithRouter(<MobilePatientSearch />, { route, path: "/search" });
}

describe("Mobile PatientSearch page", () => {
    it("renders the header, disclaimer and finder", () => {
        renderSearch();
        expect(screen.getByRole("heading", { level: 1, name: MOBILE_SEARCH_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(MOBILE_CLINICAL_DISCLAIMER)).toBeInTheDocument();
        expect(screen.getByText(finder.badge)).toBeInTheDocument();
    });

    it("prefills the query from the URL and writes submissions back", async () => {
        renderSearch("/search?q=wong");
        const input = screen.getByRole("searchbox", { name: finder.label });
        expect(input).toHaveValue("wong");
        await userEvent.clear(input);
        await userEvent.type(input, "heart failure{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent("/search?q=heart+failure");
        await userEvent.clear(input);
        await userEvent.type(input, "{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent(/^\/search$/);
    });

    it("renders two structured filters that can change", async () => {
        renderSearch();
        const facility = screen.getByRole("combobox", { name: SEARCH_FILTERS.facility.label });
        const risk = screen.getByRole("combobox", { name: SEARCH_FILTERS.risk.label });
        await userEvent.selectOptions(facility, SEARCH_FILTERS.facility.options[1]);
        await userEvent.selectOptions(risk, SEARCH_FILTERS.risk.options[1]);
        expect(facility).toHaveValue(SEARCH_FILTERS.facility.options[1]);
        expect(risk).toHaveValue(SEARCH_FILTERS.risk.options[1]);
    });

    it("lists match cards with a count and top relevance", () => {
        renderSearch();
        const section = screen.getByRole("region", { name: results.heading(PATIENT_MATCHES.length) });
        expect(section).toHaveTextContent(results.relevance(PATIENT_MATCHES[0].matchScore));
        const links = within(section).getAllByRole("link");
        expect(links).toHaveLength(PATIENT_MATCHES.length);
        expect(links[0]).toHaveClass("border-teal-1");
    });
});
