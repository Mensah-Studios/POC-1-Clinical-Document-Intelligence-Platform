import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MedicationItem from "../../../src/components/patient/MedicationItem";

describe("MedicationItem", () => {
    it("renders the medication and refill date", () => {
        render(<ul><MedicationItem medication={{ name: "Lisinopril 10mg QD", refilled: "Nov 1, 2023" }} /></ul>);
        expect(screen.getByText("Lisinopril 10mg QD")).toBeInTheDocument();
        expect(screen.getByText("Refilled: Nov 1, 2023")).toBeInTheDocument();
    });
});
