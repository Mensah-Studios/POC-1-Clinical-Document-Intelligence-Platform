import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ActivePatientCard from "../../../../src/components/mobile/patient/ActivePatientCard";
import { PATIENTS } from "../../../../src/constants/patients";

const [sarah, , amara] = PATIENTS;

describe("ActivePatientCard", () => {
    it("shows the patient identity and ejection fraction badge", () => {
        render(<ActivePatientCard patient={sarah} label="Active File" />);
        const card = screen.getByRole("region", { name: "Active File" });
        expect(screen.getByRole("heading", { name: sarah.name })).toBeInTheDocument();
        expect(card).toHaveTextContent(`MRN: ${sarah.mrn}`);
        expect(card).toHaveTextContent(`DOB: ${sarah.dob}`);
        expect(screen.getByText(`EF ${sarah.efRatio}%`)).toBeInTheDocument();
    });

    it("omits the EF badge when not recorded", () => {
        render(<ActivePatientCard patient={amara} label="Active File" />);
        expect(screen.queryByText(/^EF /)).not.toBeInTheDocument();
    });
});
