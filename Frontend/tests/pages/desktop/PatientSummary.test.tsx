import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import PatientSummary from "../../../src/pages/desktop/PatientSummary";
import { PATIENTS, PATIENT_NOT_FOUND_CONTENT, PATIENT_SUMMARY_CONTENT } from "../../../src/constants/patients";
import { CLINICAL_DISCLAIMER } from "../../../src/constants/navigation";
import { renderWithRouter } from "../../renderWithRouter";

const [sarah] = PATIENTS;
const { summary } = sarah;

function renderSummary(mrn = sarah.mrn) {
    return renderWithRouter(<PatientSummary />, { route: `/patients/${mrn}/summary`, path: "/patients/:mrn/summary" });
}

describe("PatientSummary page", () => {
    it("renders the title and clinical disclaimer", () => {
        renderSummary();
        expect(screen.getByRole("heading", { level: 1, name: PATIENT_SUMMARY_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(CLINICAL_DISCLAIMER)).toBeInTheDocument();
    });

    it("renders the synthesis with verified badge, model and highlighted citations", () => {
        renderSummary();
        const synthesis = screen.getByRole("region", { name: `Synthesis: ${summary.title}` });
        expect(within(synthesis).getByText(PATIENT_SUMMARY_CONTENT.verified)).toBeInTheDocument();
        expect(synthesis).toHaveTextContent(`Model: ${summary.model}`);
        expect(synthesis.querySelectorAll("strong")).toHaveLength(summary.highlights.length);
        const citations = within(synthesis).getByRole("list", { name: PATIENT_SUMMARY_CONTENT.citedSources });
        expect(within(citations).getAllByRole("listitem")).toHaveLength(summary.citations.length);
    });

    it("surfaces the detected discrepancy", () => {
        renderSummary();
        expect(screen.getByRole("note", { name: PATIENT_SUMMARY_CONTENT.discrepancy })).toHaveTextContent(summary.discrepancy);
    });

    it("offers each suggested next step", () => {
        renderSummary();
        summary.nextSteps.forEach((step) => expect(screen.getByRole("button", { name: step })).toBeInTheDocument());
    });

    it("shows a not-found state for an unknown MRN", () => {
        renderSummary("000-000");
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
    });
});
