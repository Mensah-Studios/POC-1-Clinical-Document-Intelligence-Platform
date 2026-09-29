import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../../../src/components/common/Card";

describe("Card", () => {
    it("renders a labelled region with title, description, adornment and action", () => {
        render(
            <Card title="Allergies" description="Known reactions" titleAdornment={<span>badge</span>} action={<button>Edit</button>}>
                <p>content</p>
            </Card>,
        );
        expect(screen.getByRole("region", { name: "Allergies" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Allergies" })).toBeInTheDocument();
        expect(screen.getByText("Known reactions")).toBeInTheDocument();
        expect(screen.getByText("badge")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
        expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("renders only children when no title is provided", () => {
        const { container } = render(<Card className="extra"><p>body</p></Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        expect(container.firstChild).toHaveClass("extra");
        expect(container.firstChild).not.toHaveAttribute("aria-labelledby");
    });
});
