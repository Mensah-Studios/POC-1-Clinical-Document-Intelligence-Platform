import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientView from "../../../src/pages/desktop/PatientView";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT, PATIENT_VIEW_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;

function renderView(mrn = sarah.mrn) {
    return renderWithRouter(<PatientView />, { route: `/patients/${mrn}`, path: "/patients/:mrn" });
}

describe("PatientView page", () => {
    it("renders the overview title and patient header", () => {
        renderView();
        expect(screen.getByRole("heading", { level: 1, name: PATIENT_VIEW_CONTENT.title(sarah.name) })).toBeInTheDocument();
        expect(screen.getByRole("region", { name: "Patient profile" })).toHaveTextContent(sarah.mrn);
    });

    it("lists conditions, medications, allergies and care team", () => {
        renderView();
        const count = (heading: string) => within(screen.getByRole("region", { name: heading })).getAllByRole("listitem").length;
        expect(count(PATIENT_VIEW_CONTENT.conditions)).toBe(sarah.conditions.length);
        expect(count(PATIENT_VIEW_CONTENT.medications)).toBe(sarah.medications.length);
        expect(count(PATIENT_VIEW_CONTENT.allergies)).toBe(sarah.allergies.length);
        expect(count(PATIENT_VIEW_CONTENT.careTeam)).toBe(sarah.careTeam.length);
    });

    it("shows the risk trajectory", () => {
        renderView();
        expect(screen.getByRole("progressbar", { name: sarah.risk.label })).toHaveAttribute("aria-valuenow", String(sarah.risk.score));
        expect(screen.getByText(`${sarah.risk.level} (${sarah.risk.score}%)`)).toBeInTheDocument();
    });

    it("links to all four patient workspaces", () => {
        renderView();
        const workspaces = screen.getByRole("region", { name: PATIENT_VIEW_CONTENT.workspaces.heading });
        expect(within(workspaces).getByText("4 Destinations")).toBeInTheDocument();
        expect(within(workspaces).getByText(`${sarah.documents.length} Files`)).toBeInTheDocument();
        const hrefs = within(workspaces).getAllByRole("link").map((link) => link.getAttribute("href"));
        expect(hrefs).toEqual([
            `/patients/${sarah.mrn}/summary`,
            `/patients/${sarah.mrn}/documents`,
            `/patients/${sarah.mrn}/update`,
            `/patients/${sarah.mrn}/delete`,
        ]);
    });

    it("personalises the query prompt and opens the summary on submit", async () => {
        renderView();
        const input = screen.getByRole("textbox", { name: PATIENT_VIEW_CONTENT.query.label });
        expect(input).toHaveAttribute("placeholder", PATIENT_VIEW_CONTENT.query.placeholder("Sarah"));
        await userEvent.type(input, "EF trend{enter}");
        expect(screen.getByTestId("location")).toHaveTextContent(`/patients/${sarah.mrn}/summary`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderView("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
