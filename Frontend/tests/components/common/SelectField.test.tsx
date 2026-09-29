import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectField from "../../../src/components/common/SelectField";

describe("SelectField", () => {
    it("renders a labelled select with all options", () => {
        render(<SelectField id="risk" label="Risk" value="High" options={["High", "Low"]} onChange={() => {}} />);
        const select = screen.getByRole("combobox", { name: "Risk" });
        expect(select).toHaveValue("High");
        expect(screen.getAllByRole("option")).toHaveLength(2);
    });

    it("reports the chosen option", async () => {
        const onChange = vi.fn();
        render(<SelectField id="risk" label="Risk" value="High" options={["High", "Low"]} onChange={onChange} />);
        await userEvent.selectOptions(screen.getByRole("combobox"), "Low");
        expect(onChange).toHaveBeenCalledWith("Low");
    });

    it("can visually hide its label while staying accessible", () => {
        render(<SelectField id="fmt" label="Format" value="PDF" options={["PDF"]} onChange={() => {}} hideLabel />);
        expect(screen.getByText("Format")).toHaveClass("sr-only");
        expect(screen.getByRole("combobox", { name: "Format" })).toBeInTheDocument();
    });
});
