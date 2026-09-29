import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileDocumentCard from "../../../../src/components/mobile/patient/MobileDocumentCard";
import type { SourceDocument } from "../../../../src/Types/Patient";

const document: SourceDocument = {
    name: "MS_CardioNotes.pdf",
    category: "Cardiology Notes",
    source: "Sinai Cardiology",
    sizeMb: 14.2,
    uploaded: "Nov 2, 2023",
    relevance: { level: "High", score: 98 },
    status: "PHI Redacted",
};

describe("MobileDocumentCard", () => {
    it("renders size, source, status and relevance", () => {
        render(<ul><MobileDocumentCard document={document} /></ul>);
        const card = screen.getByRole("listitem", { name: document.name });
        expect(card).toHaveTextContent("14.2 MB · Sinai Cardiology");
        expect(card).toHaveTextContent("OCR Status: Ingested");
        expect(screen.getByText("PHI Redacted")).toHaveClass("text-teal-1");
        expect(screen.getByText("98% Relevance")).toHaveClass("text-teal-1");
    });

    it("styles OCR documents and lower relevance differently", () => {
        render(<ul><MobileDocumentCard document={{ ...document, status: "OCR Transcribed", relevance: { level: "Med", score: 55 } }} /></ul>);
        expect(screen.getByText("OCR Transcribed")).toHaveClass("text-warning-1");
        expect(screen.getByText("OCR Status: Transcribed")).toBeInTheDocument();
        expect(screen.getByText("55% Relevance")).toHaveClass("text-slate-2");
    });
});
