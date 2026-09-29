import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientUpdate from "../../../src/pages/desktop/PatientUpdate";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT, PATIENT_UPDATE_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const { fields, bypass } = PATIENT_UPDATE_CONTENT;

function renderUpdate(mrn = sarah.mrn) {
    return renderWithRouter(<PatientUpdate />, { route: `/patients/${mrn}/update`, path: "/patients/:mrn/update" });
}

describe("PatientUpdate page", () => {
    it("renders the notice and a form prefilled from the registry", () => {
        renderUpdate();
        expect(screen.getByRole("heading", { level: 1, name: PATIENT_UPDATE_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(PATIENT_UPDATE_CONTENT.notice)).toBeInTheDocument();
        expect(screen.getByLabelText(fields.name)).toHaveValue(sarah.name);
        expect(screen.getByLabelText(fields.email)).toHaveValue(sarah.email);
        expect(screen.getByLabelText(fields.emergencyContact)).toHaveValue(sarah.emergencyContact);
        expect(screen.getByRole("switch", { name: bypass.label })).toHaveAttribute("aria-checked", String(sarah.deidentificationBypass));
    });

    it("keeps the MRN read-only", () => {
        renderUpdate();
        const mrn = screen.getByLabelText(fields.mrn);
        expect(mrn).toHaveAttribute("readonly");
        expect(mrn).toHaveValue(`${sarah.mrn} ${fields.mrnSuffix}`);
    });

    it("discards edits back to the registry values", async () => {
        renderUpdate();
        const email = screen.getByLabelText(fields.email);
        await userEvent.clear(email);
        await userEvent.type(email, "new@mountsinai.org");
        await userEvent.clear(screen.getByLabelText(fields.name));
        await userEvent.type(screen.getByLabelText(fields.name), "S. Jenkins");
        await userEvent.clear(screen.getByLabelText(fields.emergencyContact));
        await userEvent.click(screen.getByRole("switch", { name: bypass.label }));
        expect(email).toHaveValue("new@mountsinai.org");

        await userEvent.click(screen.getByRole("button", { name: PATIENT_UPDATE_CONTENT.discard }));
        expect(email).toHaveValue(sarah.email);
        expect(screen.getByLabelText(fields.name)).toHaveValue(sarah.name);
        expect(screen.getByLabelText(fields.emergencyContact)).toHaveValue(sarah.emergencyContact);
        expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", String(sarah.deidentificationBypass));
    });

    it("returns to the patient overview after committing", async () => {
        renderUpdate();
        await userEvent.click(screen.getByRole("button", { name: PATIENT_UPDATE_CONTENT.commit }));
        expect(screen.getByTestId("location")).toHaveTextContent(new RegExp(`^/patients/${sarah.mrn}$`));
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderUpdate("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
        expect(screen.queryByRole("form")).not.toBeInTheDocument();
    });
});
