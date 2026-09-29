import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilePicker from "../../../../src/components/mobile/upload/FilePicker";
import { MOBILE_UPLOAD_CONTENT } from "../../../../src/constants/mobile";

describe("FilePicker", () => {
    it("renders the tap target copy", () => {
        render(<FilePicker accept=".pdf" onFilesSelected={() => {}} />);
        expect(screen.getByText(MOBILE_UPLOAD_CONTENT.picker.heading)).toBeInTheDocument();
        expect(screen.getByText(MOBILE_UPLOAD_CONTENT.picker.button)).toBeInTheDocument();
        expect(screen.getByLabelText(MOBILE_UPLOAD_CONTENT.picker.label)).toHaveAttribute("accept", ".pdf");
    });

    it("passes chosen files to the callback", async () => {
        const onFilesSelected = vi.fn();
        const file = new File(["x"], "photo.png", { type: "image/png" });
        render(<FilePicker accept="image/*" onFilesSelected={onFilesSelected} />);
        await userEvent.upload(screen.getByLabelText(MOBILE_UPLOAD_CONTENT.picker.label), file);
        expect(onFilesSelected).toHaveBeenCalledWith([file]);
    });
});
