import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Upload from "../../../src/pages/desktop/Upload";
import { UPLOAD_CONTENT } from "../../../src/constants/upload";
import { renderWithRouter } from "../../renderWithRouter";

const { form, dropZone, pipeline } = UPLOAD_CONTENT;

function renderUpload(route = "/upload-documents") {
    return renderWithRouter(<Upload />, { route, path: "/upload-documents" });
}

describe("Upload page", () => {
    it("renders the title, notice and pipeline steps", () => {
        renderUpload();
        expect(screen.getByRole("heading", { level: 1, name: UPLOAD_CONTENT.title })).toBeInTheDocument();
        expect(screen.getByText(UPLOAD_CONTENT.notice)).toBeInTheDocument();
        const steps = within(screen.getByRole("region", { name: pipeline.heading })).getAllByRole("listitem");
        expect(steps).toHaveLength(pipeline.steps.length);
    });

    it("defaults the target patient to the first ledger", () => {
        renderUpload();
        expect(screen.getByRole("combobox", { name: form.patientLabel })).toHaveValue("Sarah Jenkins (MRN: 892-019)");
    });

    it("preselects the patient passed in the query string", () => {
        renderUpload("/upload-documents?mrn=421-992");
        expect(screen.getByRole("combobox", { name: form.patientLabel })).toHaveValue("Raymond Wong (MRN: 421-992)");
    });

    it("disables actions until files are queued", () => {
        renderUpload();
        expect(screen.getByRole("button", { name: form.submit })).toBeDisabled();
        expect(screen.getByRole("button", { name: form.clear })).toBeDisabled();
    });

    it("queues selected files, skips duplicates, and removes or clears them", async () => {
        renderUpload();
        const input = screen.getByLabelText(dropZone.label);
        const notes = new File(["a"], "notes.pdf", { type: "application/pdf" });
        const scan = new File(["bb"], "scan.png", { type: "image/png" });

        await userEvent.upload(input, [notes, scan]);
        await userEvent.upload(input, notes);
        const queue = screen.getByRole("list", { name: form.queueLabel });
        expect(within(queue).getAllByRole("listitem")).toHaveLength(2);
        expect(screen.getByRole("button", { name: form.submit })).toBeEnabled();

        await userEvent.click(screen.getByRole("button", { name: "Remove notes.pdf" }));
        expect(within(queue).getAllByRole("listitem")).toHaveLength(1);

        await userEvent.click(screen.getByRole("button", { name: form.clear }));
        expect(screen.queryByRole("list", { name: form.queueLabel })).not.toBeInTheDocument();
    });

    it("stays on the page when ingestion is submitted", async () => {
        renderUpload();
        await userEvent.upload(screen.getByLabelText(dropZone.label), new File(["a"], "notes.pdf", { type: "application/pdf" }));
        await userEvent.click(screen.getByRole("button", { name: form.submit }));
        expect(screen.getByTestId("location")).toHaveTextContent("/upload-documents");
    });

    it("lets the user change the target patient", async () => {
        renderUpload();
        const select = screen.getByRole("combobox", { name: form.patientLabel });
        await userEvent.selectOptions(select, "Amara Adebayo (MRN: 109-881)");
        expect(select).toHaveValue("Amara Adebayo (MRN: 109-881)");
    });
});
