import { describe, expect, it } from "vitest";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileUpload from "../../../src/pages/mobile/Upload";
import { MOBILE_UPLOAD_CONTENT } from "../../../src/constants/mobile";
import { renderWithRouter } from "../../renderWithRouter";

const { target, picker, queue } = MOBILE_UPLOAD_CONTENT;

function renderUpload(route = "/upload-documents") {
    return renderWithRouter(<MobileUpload />, { route, path: "/upload-documents" });
}

describe("Mobile Upload page", () => {
    it("targets the first patient by default", () => {
        renderUpload();
        expect(screen.getByRole("heading", { level: 1, name: MOBILE_UPLOAD_CONTENT.title })).toBeInTheDocument();
        const card = screen.getByRole("region", { name: target.label });
        expect(card).toHaveTextContent("Sarah Jenkins");
        expect(card).toHaveTextContent("MRN: 892-019");
    });

    it("targets the patient passed in the query string", () => {
        renderUpload("/upload-documents?mrn=109-881");
        expect(screen.getByRole("region", { name: target.label })).toHaveTextContent("Amara Adebayo");
    });

    it("lets the user change the target patient", async () => {
        renderUpload();
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: target.change }));
        await userEvent.selectOptions(screen.getByRole("combobox", { name: target.selectLabel }), "Raymond Wong (MRN: 421-992)");
        expect(screen.getByRole("region", { name: target.label })).toHaveTextContent("Raymond Wong");
        await userEvent.click(screen.getByRole("button", { name: target.done }));
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });

    it("shows an empty queue and disables ingestion until files are chosen", () => {
        renderUpload();
        expect(screen.getByText(queue.empty)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: queue.submit })).toBeDisabled();
    });

    it("queues chosen files for the target patient, skipping duplicates", async () => {
        renderUpload();
        const input = screen.getByLabelText(picker.label);
        const notes = new File(["a"], "notes.pdf", { type: "application/pdf" });
        const photo = new File(["bb"], "photo.png", { type: "image/png" });
        await userEvent.upload(input, [notes, photo]);
        await userEvent.upload(input, notes);

        const list = screen.getByRole("list", { name: queue.heading });
        expect(within(list).getAllByRole("listitem")).toHaveLength(2);
        expect(within(list).getAllByRole("listitem")[0]).toHaveTextContent("Sarah Jenkins");
        expect(screen.getByRole("button", { name: queue.submit })).toBeEnabled();

        await userEvent.click(screen.getByRole("button", { name: "Remove notes.pdf" }));
        expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    });

    it("prevents the default submission", async () => {
        renderUpload();
        await userEvent.upload(screen.getByLabelText(picker.label), new File(["a"], "notes.pdf", { type: "application/pdf" }));
        const event = new Event("submit", { bubbles: true, cancelable: true });
        fireEvent(screen.getByRole("form", { name: MOBILE_UPLOAD_CONTENT.title }), event);
        expect(event.defaultPrevented).toBe(true);
    });
});
