import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SourceDocumentRow from "../../../src/components/patient/SourceDocumentRow";
import type { SourceDocument } from "../../../src/Types/Patient";

const document: SourceDocument = {
    name: "MS_CardioNotes.pdf",
    category: "Cardiology Notes",
    source: "Sinai Cardiology",
    sizeMb: 14.2,
    uploaded: "Nov 2, 2023",
    relevance: { level: "High", score: 98 },
    status: "PHI Redacted",
};

describe("SourceDocumentRow", () => {
    it("renders metadata, relevance and PHI status", () => {
        render(<ul><SourceDocumentRow document={document} /></ul>);
        const row = screen.getByRole("listitem", { name: document.name });
        expect(row).toHaveTextContent("Cardiology Notes · Sinai Cardiology · 14.2 MB · Uploaded Nov 2, 2023");
        expect(screen.getByText("High (98%)")).toHaveClass("text-green-1");
        expect(screen.getByText("PHI Redacted")).toHaveClass("text-teal-1");
    });

    it("uses muted relevance and warning status for OCR documents", () => {
        render(<ul><SourceDocumentRow document={{ ...document, relevance: { level: "Med", score: 55 }, status: "OCR Transcribed" }} /></ul>);
        expect(screen.getByText("Med (55%)")).toHaveClass("text-slate-2");
        expect(screen.getByText("OCR Transcribed")).toHaveClass("text-warning-1");
    });
});
