import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import PatientNotFound from "../../../src/components/patient/PatientNotFound";
import { PATIENT_NOT_FOUND_CONTENT } from "../../../src/constants/patients";
import { renderWithRouter } from "../../renderWithRouter";

describe("PatientNotFound", () => {
    it("explains the missing MRN and links back to search", () => {
        renderWithRouter(<PatientNotFound mrn="000-000" />);
        expect(screen.getByRole("heading", { name: PATIENT_NOT_FOUND_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(PATIENT_NOT_FOUND_CONTENT.description("000-000"))).toBeInTheDocument();
        expect(screen.getByRole("link", { name: PATIENT_NOT_FOUND_CONTENT.back })).toHaveAttribute("href", "/search");
    });
});
