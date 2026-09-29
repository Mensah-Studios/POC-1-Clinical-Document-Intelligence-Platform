import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import IngestedFileRow from "../../../src/components/dashboard/IngestedFileRow";
import { renderWithRouter } from "../../renderWithRouter";

const file = { name: "MS_CardioNotes.pdf", patientName: "Sarah Jenkins", mrn: "892-019", citedElements: 12, status: "Ingested" };

describe("IngestedFileRow", () => {
    it("renders file details and status", () => {
        renderWithRouter(<ul><IngestedFileRow file={file} /></ul>);
        const row = screen.getByRole("listitem", { name: file.name });
        expect(row).toHaveTextContent("12 Cited Elements");
        expect(screen.getByText("Ingested")).toBeInTheDocument();
    });

    it("links the patient to their overview", () => {
        renderWithRouter(<ul><IngestedFileRow file={file} /></ul>);
        expect(screen.getByRole("link", { name: "Sarah Jenkins (MRN: 892-019)" })).toHaveAttribute("href", "/patients/892-019");
    });
});
