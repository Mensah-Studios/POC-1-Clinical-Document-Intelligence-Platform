import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadQueueItem from "../../../src/components/upload/UploadQueueItem";

describe("UploadQueueItem", () => {
    it("shows the file name and size in KB for small files", () => {
        render(<ul><UploadQueueItem file={new File(["x".repeat(2048)], "labs.pdf")} onRemove={() => {}} /></ul>);
        expect(screen.getByRole("listitem", { name: "labs.pdf" })).toHaveTextContent("2 KB");
    });

    it("shows the size in MB for large files", () => {
        const file = new File(["x"], "scan.tiff");
        Object.defineProperty(file, "size", { value: 38.1 * 1024 * 1024 });
        render(<ul><UploadQueueItem file={file} onRemove={() => {}} /></ul>);
        expect(screen.getByText("38.1 MB")).toBeInTheDocument();
    });

    it("calls onRemove from the remove button", async () => {
        const onRemove = vi.fn();
        render(<ul><UploadQueueItem file={new File(["x"], "labs.pdf")} onRemove={onRemove} /></ul>);
        await userEvent.click(screen.getByRole("button", { name: "Remove labs.pdf" }));
        expect(onRemove).toHaveBeenCalledOnce();
    });
});
