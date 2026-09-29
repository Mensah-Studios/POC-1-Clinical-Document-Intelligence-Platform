import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClinicalQueryPanel from "../../../src/components/patient/ClinicalQueryPanel";
import { PATIENT_VIEW_CONTENT } from "../../../src/constants/patients";

describe("ClinicalQueryPanel", () => {
    it("renders the query input with the given placeholder", () => {
        render(<ClinicalQueryPanel placeholder="Ask about Sarah" onSubmit={() => {}} />);
        expect(screen.getByRole("region", { name: PATIENT_VIEW_CONTENT.query.heading })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: PATIENT_VIEW_CONTENT.query.label })).toHaveAttribute("placeholder", "Ask about Sarah");
    });

    it("submits the trimmed query", async () => {
        const onSubmit = vi.fn();
        render(<ClinicalQueryPanel placeholder="" onSubmit={onSubmit} />);
        await userEvent.type(screen.getByRole("textbox"), "  EF trend  ");
        await userEvent.click(screen.getByRole("button", { name: PATIENT_VIEW_CONTENT.query.submit }));
        expect(onSubmit).toHaveBeenCalledWith("EF trend");
    });
});
