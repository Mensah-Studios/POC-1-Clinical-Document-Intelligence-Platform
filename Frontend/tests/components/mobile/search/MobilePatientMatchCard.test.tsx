import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import MobilePatientMatchCard from "../../../../src/components/mobile/search/MobilePatientMatchCard";
import { renderWithRouter } from "../../../renderWithRouter";

const match = { mrn: "892-019", name: "Sarah Jenkins", dob: "11/12/1982", age: 41, efRatio: 42, efReduced: true, admitDate: "11/04/2023", matchScore: 98 };

describe("MobilePatientMatchCard", () => {
    it("links to the patient with demographics, metrics and score", () => {
        renderWithRouter(<ul><MobilePatientMatchCard match={match} highlighted /></ul>);
        const link = screen.getByRole("link", { name: "Sarah Jenkins, MRN 892-019" });
        expect(link).toHaveAttribute("href", "/patients/892-019");
        expect(link).toHaveClass("border-teal-1");
        expect(link).toHaveTextContent("MRN: 892-019 · DOB: 11/12/1982 (41 Y/O)");
        expect(screen.getByText("42% (Reduced)")).toHaveClass("text-danger-1");
        expect(screen.getByText("11/04/2023")).toBeInTheDocument();
        expect(screen.getByText("98% Match")).toHaveClass("text-green-1");
    });

    it("renders a normal ejection fraction on a plain card", () => {
        renderWithRouter(<ul><MobilePatientMatchCard match={{ ...match, efReduced: false, efRatio: 55 }} /></ul>);
        expect(screen.getByText("55%")).toHaveClass("text-slate-1");
        expect(screen.getByRole("link")).toHaveClass("border-border-color");
    });
});
