import { describe, expect, it } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobilePatientDelete from "../../../src/pages/mobile/PatientDelete";
import { MOBILE_PATIENT_CONTENT } from "../../../src/constants/mobile";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const content = MOBILE_PATIENT_CONTENT.delete;

function renderDelete(mrn = sarah.mrn) {
    return renderWithRouter(<MobilePatientDelete />, { route: `/patients/${mrn}/delete`, path: "/patients/:mrn/delete" });
}

describe("Mobile PatientDelete page", () => {
    it("names the patient and summarises the impact", () => {
        renderDelete();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(screen.getByRole("region", { name: content.warningTitle })).toHaveTextContent(`${sarah.name} (MRN: ${sarah.mrn})`);
        const impact = within(screen.getByRole("region", { name: content.impactHeading })).getAllByRole("listitem");
        expect(impact.map((item) => item.textContent)).toEqual(content.impact(sarah.documents.length, sarah.summary.citations.length));
        expect(screen.getByText(content.legalHold)).toBeInTheDocument();
    });

    it("only enables deletion after typing DELETE", async () => {
        renderDelete();
        const submit = screen.getByRole("button", { name: content.submit });
        const confirm = screen.getByLabelText(content.confirmLabel);
        expect(submit).toBeDisabled();
        await userEvent.type(confirm, "delete");
        expect(submit).toBeDisabled();
        await userEvent.clear(confirm);
        await userEvent.type(confirm, "DELETE");
        expect(submit).toBeEnabled();
    });

    it("requires a compliance reason from the list", async () => {
        renderDelete();
        const reason = screen.getByRole("combobox", { name: content.reasonLabel });
        expect(reason).toHaveValue(content.reasons[0]);
        await userEvent.selectOptions(reason, content.reasons[2]);
        expect(reason).toHaveValue(content.reasons[2]);
    });

    it("ignores a forced submit while unconfirmed", () => {
        renderDelete();
        fireEvent.submit(screen.getByRole("form", { name: content.warningTitle }));
        expect(screen.getByTestId("location")).toHaveTextContent(`/patients/${sarah.mrn}/delete`);
    });

    it("returns to patient search after confirmed deletion", async () => {
        renderDelete();
        await userEvent.type(screen.getByLabelText(content.confirmLabel), "DELETE");
        await userEvent.click(screen.getByRole("button", { name: content.submit }));
        expect(screen.getByTestId("location")).toHaveTextContent(/^\/search$/);
    });

    it("cancels back to the overview", () => {
        renderDelete();
        expect(screen.getByRole("link", { name: content.cancel })).toHaveAttribute("href", `/patients/${sarah.mrn}`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderDelete("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
