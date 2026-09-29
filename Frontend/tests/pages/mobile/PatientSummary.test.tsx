import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import MobilePatientSummary from "../../../src/pages/mobile/PatientSummary";
import { MOBILE_PATIENT_CONTENT } from "../../../src/constants/mobile";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const content = MOBILE_PATIENT_CONTENT.summary;

function renderSummary(mrn = sarah.mrn) {
    return renderWithRouter(<MobilePatientSummary />, { route: `/patients/${mrn}/summary`, path: "/patients/:mrn/summary" });
}

describe("Mobile PatientSummary page", () => {
    it("renders the header and active patient card", () => {
        renderSummary();
        expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
        expect(screen.getByRole("region", { name: MOBILE_PATIENT_CONTENT.activeLabel })).toBeInTheDocument();
    });

    it("renders the synthesis with highlights and citations", () => {
        renderSummary();
        const synthesis = screen.getByRole("region", { name: sarah.summary.title });
        expect(within(synthesis).getByText(content.verified)).toBeInTheDocument();
        expect(synthesis.querySelectorAll("strong")).toHaveLength(sarah.summary.highlights.length);
        expect(within(screen.getByRole("list", { name: content.citations })).getAllByRole("listitem")).toHaveLength(sarah.summary.citations.length);
    });

    it("shows clinical gaps, follow-ups and the disclaimer", () => {
        renderSummary();
        expect(screen.getByRole("note", { name: content.gaps })).toHaveTextContent(sarah.summary.discrepancy);
        sarah.summary.nextSteps.forEach((step) => expect(screen.getByRole("button", { name: `"${step}"` })).toBeInTheDocument());
        expect(screen.getByText(content.disclaimer)).toBeInTheDocument();
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderSummary("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
