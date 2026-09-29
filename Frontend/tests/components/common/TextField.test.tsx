import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextField from "../../../src/components/common/TextField";

describe("TextField", () => {
    it("renders a labelled input and forwards changes", async () => {
        const onChange = vi.fn();
        render(<TextField id="email" label="Email" value="" onChange={onChange} />);
        await userEvent.type(screen.getByLabelText("Email"), "a");
        expect(onChange).toHaveBeenCalled();
    });

    it("styles read-only inputs as muted", () => {
        render(<TextField id="mrn" label="MRN" readOnly value="892-019" />);
        const input = screen.getByLabelText("MRN");
        expect(input).toHaveAttribute("readonly");
        expect(input).toHaveClass("bg-surface-2", "text-slate-3");
    });

    it("applies the danger tone border", () => {
        render(<TextField id="confirm" label="Confirm" tone="danger" defaultValue="" />);
        expect(screen.getByLabelText("Confirm")).toHaveClass("border-danger-1");
    });
});
