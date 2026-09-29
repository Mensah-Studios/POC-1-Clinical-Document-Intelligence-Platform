import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobilePatientUpdate from "../../../src/pages/mobile/PatientUpdate";
import { MOBILE_PATIENT_CONTENT } from "../../../src/constants/mobile";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const content = MOBILE_PATIENT_CONTENT.update;

function renderUpdate(mrn = sarah.mrn) {
    return renderWithRouter(<MobilePatientUpdate />, { route: `/patients/${mrn}/update`, path: "/patients/:mrn/update" });
}

describe("Mobile PatientUpdate page", () => {
    it("prefills the form and shows no unsaved warning initially", () => {
        renderUpdate();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(screen.getByLabelText(content.fields.name)).toHaveValue(sarah.name);
        expect(screen.getByLabelText(content.fields.email)).toHaveValue(sarah.email);
        expect(screen.getByLabelText(content.fields.emergencyContact)).toHaveValue(sarah.emergencyContact);
        expect(screen.getByRole("switch", { name: content.consent.label })).toHaveAttribute("aria-checked", String(sarah.deidentificationBypass));
        expect(screen.queryByText(content.unsaved)).not.toBeInTheDocument();
    });

    it("flags changed fields and the unsaved banner", async () => {
        renderUpdate();
        const email = screen.getByLabelText(content.fields.email);
        await userEvent.clear(email);
        await userEvent.type(email, "new@mountsinai.org");
        expect(screen.getByText(content.unsaved)).toBeInTheDocument();
        expect(screen.getAllByText(content.unsavedField)).toHaveLength(1);
        expect(email).toHaveClass("border-warning-1");
    });

    it("tracks edits to name, emergency contact and consent", async () => {
        renderUpdate();
        await userEvent.type(screen.getByLabelText(content.fields.name), "!");
        await userEvent.type(screen.getByLabelText(content.fields.emergencyContact), "!");
        expect(screen.getAllByText(content.unsavedField)).toHaveLength(2);
        await userEvent.click(screen.getByRole("switch"));
        expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", String(!sarah.deidentificationBypass));
    });

    it("flags a consent-only change as unsaved", async () => {
        renderUpdate();
        await userEvent.click(screen.getByRole("switch"));
        expect(screen.getByText(content.unsaved)).toBeInTheDocument();
    });

    it("saves back to the overview and cancel links there too", async () => {
        renderUpdate();
        expect(screen.getByRole("link", { name: content.cancel })).toHaveAttribute("href", `/patients/${sarah.mrn}`);
        await userEvent.click(screen.getByRole("button", { name: content.save }));
        expect(screen.getByTestId("location")).toHaveTextContent(new RegExp(`^/patients/${sarah.mrn}$`));
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderUpdate("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
