import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobilePatientDocuments from "../../../src/pages/mobile/PatientDocuments";
import { MOBILE_PATIENT_CONTENT } from "../../../src/constants/mobile";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const content = MOBILE_PATIENT_CONTENT.documents;

function renderDocuments(mrn = sarah.mrn) {
    return renderWithRouter(<MobilePatientDocuments />, { route: `/patients/${mrn}/documents`, path: "/patients/:mrn/documents" });
}

function cards() {
    return within(screen.getByRole("list", { name: content.title })).getAllByRole("listitem");
}

describe("Mobile PatientDocuments page", () => {
    it("renders every document with format chips and counts", () => {
        renderDocuments();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(cards()).toHaveLength(sarah.documents.length);
        const chips = within(screen.getByRole("group", { name: content.filterLabel })).getAllByRole("button");
        expect(chips.map((chip) => chip.textContent)).toEqual(["All (3)", "PDF (2)", "TIFF (1)"]);
    });

    it("filters documents by the chosen chip", async () => {
        renderDocuments();
        await userEvent.click(screen.getByRole("button", { name: "TIFF (1)" }));
        expect(cards()).toHaveLength(1);
        expect(cards()[0]).toHaveAccessibleName("Sinai_EEG_Panel_A.tiff");
        await userEvent.click(screen.getByRole("button", { name: "All (3)" }));
        expect(cards()).toHaveLength(3);
    });

    it("links to upload with the patient preselected", () => {
        renderDocuments();
        expect(screen.getByRole("link", { name: content.uploadNew })).toHaveAttribute("href", `/upload-documents?mrn=${sarah.mrn}`);
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderDocuments("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
