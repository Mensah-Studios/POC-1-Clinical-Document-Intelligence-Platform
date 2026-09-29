import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RedactionQueueItem from "../../../../src/components/mobile/upload/RedactionQueueItem";
import { MOBILE_UPLOAD_CONTENT } from "../../../../src/constants/mobile";

describe("RedactionQueueItem", () => {
    it("shows the file, size, patient and queued status", () => {
        render(<ul><RedactionQueueItem file={new File(["x".repeat(2048)], "notes.pdf")} patientName="Sarah Jenkins" onRemove={() => {}} /></ul>);
        const item = screen.getByRole("listitem", { name: "notes.pdf" });
        expect(item).toHaveTextContent("2 KB · Sarah Jenkins");
        expect(item).toHaveTextContent(MOBILE_UPLOAD_CONTENT.queue.status);
    });

    it("calls onRemove from the remove button", async () => {
        const onRemove = vi.fn();
        render(<ul><RedactionQueueItem file={new File(["x"], "notes.pdf")} patientName="Sarah Jenkins" onRemove={onRemove} /></ul>);
        await userEvent.click(screen.getByRole("button", { name: "Remove notes.pdf" }));
        expect(onRemove).toHaveBeenCalledOnce();
    });
});
