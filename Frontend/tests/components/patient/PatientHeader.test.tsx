import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PatientHeader from "../../../src/components/patient/PatientHeader";
import { PATIENTS } from "../../../src/constants/patients";
const [sarah] = PATIENTS;

describe("PatientHeader", () => {
    it("renders the patient's identity, risk flag and demographics", () => {
        render(<PatientHeader patient={sarah} />);
        expect(screen.getByRole("heading", { name: sarah.name })).toBeInTheDocument();
        expect(screen.getByText(sarah.riskFlag)).toHaveClass("uppercase");
        expect(screen.getByRole("region", { name: "Patient profile" })).toHaveTextContent(`MRN: ${sarah.mrn} · ${sarah.sex} · ${sarah.age} Years Old`);
        expect(screen.getByText(new RegExp(sarah.email))).toBeInTheDocument();
    });
});
