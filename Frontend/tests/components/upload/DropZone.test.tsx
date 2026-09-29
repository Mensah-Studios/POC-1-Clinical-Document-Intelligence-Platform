import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropZone from "../../../src/components/upload/DropZone";
import { UPLOAD_CONTENT } from "../../../src/constants/upload";

const pdf = new File(["%PDF"], "notes.pdf", { type: "application/pdf" });

describe("DropZone", () => {
    it("passes browsed files to the callback", async () => {
        const onFilesSelected = vi.fn();
        render(<DropZone accept=".pdf" onFilesSelected={onFilesSelected} />);
        const input = screen.getByLabelText(UPLOAD_CONTENT.dropZone.label);
        expect(input).toHaveAttribute("accept", ".pdf");
        await userEvent.upload(input, pdf);
        expect(onFilesSelected).toHaveBeenCalledWith([pdf]);
    });

    it("passes dropped files to the callback and highlights while dragging", () => {
        const onFilesSelected = vi.fn();
        render(<DropZone accept=".pdf" onFilesSelected={onFilesSelected} />);
        const zone = screen.getByText(UPLOAD_CONTENT.dropZone.heading).closest("label")!;

        fireEvent.dragOver(zone);
        expect(zone).toHaveClass("border-teal-1");
        fireEvent.dragLeave(zone);
        expect(zone).not.toHaveClass("bg-surface-3");

        fireEvent.drop(zone, { dataTransfer: { files: [pdf] } });
        expect(onFilesSelected).toHaveBeenCalledWith([pdf]);
    });
});
