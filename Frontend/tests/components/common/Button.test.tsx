import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../../src/components/common/Button";

describe("Button", () => {
    it("renders its label and defaults to type=button", () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole("button", { name: "Save" });
        expect(button).toHaveAttribute("type", "button");
        expect(button).toHaveClass("bg-teal-1");
    });

    it("applies the requested variant and extra classes", () => {
        render(<Button variant="danger" className="w-full">Purge</Button>);
        expect(screen.getByRole("button", { name: "Purge" })).toHaveClass("bg-danger-1", "w-full");
    });

    it("renders an icon alongside the label", () => {
        render(<Button icon={<svg data-testid="icon" />}>Upload</Button>);
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("calls onClick when pressed", async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Go</Button>);
        await userEvent.click(screen.getByRole("button", { name: "Go" }));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it("does not call onClick when disabled", async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick} disabled>Go</Button>);
        await userEvent.click(screen.getByRole("button", { name: "Go" }));
        expect(onClick).not.toHaveBeenCalled();
    });
});
