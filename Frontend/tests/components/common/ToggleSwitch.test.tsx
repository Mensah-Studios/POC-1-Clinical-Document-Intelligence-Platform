import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleSwitch from "../../../src/components/common/ToggleSwitch";

describe("ToggleSwitch", () => {
    it("renders a labelled switch with its description", () => {
        render(<ToggleSwitch id="bypass" checked label="Bypass" description="Allow research use" onChange={() => {}} />);
        const toggle = screen.getByRole("switch", { name: "Bypass" });
        expect(toggle).toHaveAttribute("aria-checked", "true");
        expect(toggle).toHaveAccessibleDescription("Allow research use");
    });

    it("requests the opposite state when clicked", async () => {
        const onChange = vi.fn();
        render(<ToggleSwitch id="bypass" checked={false} label="Bypass" onChange={onChange} />);
        await userEvent.click(screen.getByRole("switch"));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("toggles when its label is clicked", async () => {
        const onChange = vi.fn();
        render(<ToggleSwitch id="bypass" checked label="Bypass" onChange={onChange} />);
        await userEvent.click(screen.getByText("Bypass"));
        expect(onChange).toHaveBeenCalledWith(false);
    });
});
