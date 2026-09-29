import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import PatientMatchRow from "../../../src/components/search/PatientMatchRow";
import { renderWithRouter } from "../../renderWithRouter";

const match = { mrn: "892-019", name: "Sarah Jenkins", dob: "11/12/1982", age: 41, efRatio: 42, efReduced: true, admitDate: "11/04/2023", matchScore: 98 };

describe("PatientMatchRow", () => {
    it("links to the patient overview with demographics and metrics", () => {
        renderWithRouter(<ul><PatientMatchRow match={match} highlighted /></ul>);
        const link = screen.getByRole("link", { name: "Sarah Jenkins, MRN 892-019" });
        expect(link).toHaveAttribute("href", "/patients/892-019");
        expect(link).toHaveClass("bg-surface-3");
        expect(link).toHaveTextContent("MRN: 892-019 · DOB: 11/12/1982 (41 Y/O)");
        expect(screen.getByText("11/04/2023")).toBeInTheDocument();
        expect(screen.getByText("98% Match")).toBeInTheDocument();
    });

    it("flags reduced ejection fraction", () => {
        renderWithRouter(<ul><PatientMatchRow match={match} /></ul>);
        expect(screen.getByText("42% (Reduced)")).toHaveClass("text-danger-1");
    });

    it("shows a normal ejection fraction without the flag", () => {
        renderWithRouter(<ul><PatientMatchRow match={{ ...match, efReduced: false, efRatio: 55 }} /></ul>);
        expect(screen.getByText("55%")).toHaveClass("text-slate-2");
        expect(screen.getByRole("link")).not.toHaveClass("bg-surface-3");
    });
});
