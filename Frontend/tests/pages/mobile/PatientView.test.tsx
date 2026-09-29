import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobilePatientView from "../../../src/pages/mobile/PatientView";
import { MOBILE_PATIENT_CONTENT } from "../../../src/constants/mobile";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const overview = MOBILE_PATIENT_CONTENT.overview;

function renderView(mrn = sarah.mrn) {
    return renderWithRouter(<MobilePatientView />, { route: `/patients/${mrn}`, path: "/patients/:mrn" });
}

describe("Mobile PatientView page", () => {
    it("renders the header and active patient card", () => {
        renderView();
        expect(screen.getByRole("heading", { level: 1, name: overview.title })).toBeInTheDocument();
        expect(screen.getByRole("region", { name: MOBILE_PATIENT_CONTENT.activeLabel })).toHaveTextContent(sarah.name);
    });

    it("shows demographics and allergies", () => {
        renderView();
        const section = screen.getByRole("region", { name: overview.demographics });
        expect(section).toHaveTextContent(sarah.address);
        expect(section).toHaveTextContent(sarah.emergencyContact);
        sarah.allergies.forEach((allergy) => expect(within(section).getByText(allergy)).toBeInTheDocument());
    });

    it("lists conditions and medications", () => {
        renderView();
        expect(within(screen.getByRole("list", { name: overview.conditions })).getAllByRole("listitem")).toHaveLength(sarah.conditions.length);
        expect(within(screen.getByRole("list", { name: overview.medications })).getAllByRole("listitem")).toHaveLength(sarah.medications.length);
    });

    it("splits care team members into name and role", () => {
        renderView();
        const team = screen.getByRole("region", { name: overview.careTeam });
        expect(within(team).getByText("Dr. Linus Patel, MD")).toBeInTheDocument();
        expect(within(team).getByText("Cardiology Primary")).toBeInTheDocument();
    });

    it("links to every patient workspace", () => {
        renderView();
        const hrefs = within(screen.getByRole("region", { name: overview.workspaces.heading })).getAllByRole("link").map((l) => l.getAttribute("href"));
        expect(hrefs).toEqual(["summary", "documents", "update", "delete"].map((s) => `/patients/${sarah.mrn}/${s}`));
    });

    it("opens the synthesis when the copilot is asked", async () => {
        renderView();
        await userEvent.type(screen.getByRole("textbox", { name: overview.copilot.label }), "ACE-I cough?");
        await userEvent.click(screen.getByRole("button", { name: overview.copilot.submit }));
        expect(screen.getByTestId("location")).toHaveTextContent(`/patients/${sarah.mrn}/summary`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderView("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
