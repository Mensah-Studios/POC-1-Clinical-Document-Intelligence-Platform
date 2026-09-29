import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientDocuments from "../../../src/pages/desktop/PatientDocuments";
import { PATIENTS, PATIENT_DOCUMENTS_CONTENT, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah, raymond] = PATIENTS;
const content = PATIENT_DOCUMENTS_CONTENT;

function renderDocuments(mrn = sarah.mrn) {
    return renderWithRouter(<PatientDocuments />, { route: `/patients/${mrn}/documents`, path: "/patients/:mrn/documents" });
}

function rows() {
    return within(screen.getByRole("list", { name: content.heading })).getAllByRole("listitem");
}

describe("PatientDocuments page", () => {
    it("renders the title and every source file for the patient", () => {
        renderDocuments();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(screen.getByText(`${sarah.name} · MRN: ${sarah.mrn}`)).toBeInTheDocument();
        expect(rows()).toHaveLength(sarah.documents.length);
    });

    it("filters by file format", async () => {
        renderDocuments();
        const filter = screen.getByRole("combobox", { name: content.filterLabel });
        await userEvent.selectOptions(filter, "TIFF");
        expect(rows()).toHaveLength(1);
        expect(rows()[0]).toHaveAccessibleName("Sinai_EEG_Panel_A.tiff");
        await userEvent.selectOptions(filter, "PDF");
        expect(rows()).toHaveLength(2);
    });

    it("shows an empty state when no file matches", async () => {
        renderDocuments(raymond.mrn);
        await userEvent.selectOptions(screen.getByRole("combobox", { name: content.filterLabel }), "TIFF");
        expect(screen.getByText(content.empty)).toBeInTheDocument();
        expect(screen.queryByRole("list", { name: content.heading })).not.toBeInTheDocument();
    });

    it("links to the upload page with the patient preselected", () => {
        renderDocuments();
        expect(screen.getByRole("link", { name: content.uploadNew })).toHaveAttribute("href", `/upload-documents?mrn=${sarah.mrn}`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderDocuments("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
