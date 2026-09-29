import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientDelete from "../../../src/pages/desktop/PatientDelete";
import { PATIENTS, PATIENT_DELETE_CONTENT, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const content = PATIENT_DELETE_CONTENT;

function renderDelete(mrn = sarah.mrn) {
    return renderWithRouter(<PatientDelete />, { route: `/patients/${mrn}/delete`, path: "/patients/:mrn/delete" });
}

describe("PatientDelete page", () => {
    it("describes the records targeted for removal", () => {
        renderDelete();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: content.heading })).toBeInTheDocument();
        expect(screen.getByText(content.retention)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`${sarah.documents.length} Linked Clinical Documents · ${sarah.summary.citations.length} Cited LLM Embeddings`))).toBeInTheDocument();
    });

    it("keeps the purge button disabled until the MRN and a 6-digit MFA code are entered", async () => {
        renderDelete();
        const purge = screen.getByRole("button", { name: content.submit });
        expect(purge).toBeDisabled();

        await userEvent.type(screen.getByLabelText(content.mrnLabel(sarah.mrn)), "892-018");
        await userEvent.type(screen.getByLabelText(content.mfaLabel), "123456");
        expect(purge).toBeDisabled();

        await userEvent.clear(screen.getByLabelText(content.mrnLabel(sarah.mrn)));
        await userEvent.type(screen.getByLabelText(content.mrnLabel(sarah.mrn)), sarah.mrn);
        expect(purge).toBeEnabled();

        await userEvent.clear(screen.getByLabelText(content.mfaLabel));
        await userEvent.type(screen.getByLabelText(content.mfaLabel), "12a45b");
        expect(purge).toBeDisabled();
    });

    it("ignores a forced submit while unauthorized", () => {
        renderDelete();
        fireEvent.submit(screen.getByRole("form", { name: content.heading }));
        expect(screen.getByTestId("location")).toHaveTextContent(`/patients/${sarah.mrn}/delete`);
    });

    it("returns to patient search after an authorized purge", async () => {
        renderDelete();
        await userEvent.type(screen.getByLabelText(content.mrnLabel(sarah.mrn)), sarah.mrn);
        await userEvent.type(screen.getByLabelText(content.mfaLabel), "123456");
        await userEvent.click(screen.getByRole("button", { name: content.submit }));
        expect(screen.getByTestId("location")).toHaveTextContent(/^\/search$/);
    });

    it("cancels back to the patient overview", () => {
        renderDelete();
        expect(screen.getByRole("link", { name: content.cancel })).toHaveAttribute("href", `/patients/${sarah.mrn}`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderDelete("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
