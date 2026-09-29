import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HighlightedText from "../../../src/components/common/HighlightedText";

describe("HighlightedText", () => {
    it("emphasises every highlighted fragment", () => {
        const { container } = render(<p><HighlightedText text="EF 42% [1] and [2]." highlights={["42% [1]", "[2]"]} /></p>);
        const strong = container.querySelectorAll("strong");
        expect(Array.from(strong).map((el) => el.textContent)).toEqual(["42% [1]", "[2]"]);
        expect(container).toHaveTextContent("EF 42% [1] and [2].");
    });

    it("treats regex characters in highlights literally", () => {
        const { container } = render(<p><HighlightedText text="a.b and axb" highlights={["a.b"]} /></p>);
        expect(container.querySelectorAll("strong")).toHaveLength(1);
    });

    it("renders plain text when nothing is highlighted", () => {
        const { container } = render(<p><HighlightedText text="plain" highlights={[]} /></p>);
        expect(container.querySelector("strong")).toBeNull();
        expect(screen.getByText("plain")).toBeInTheDocument();
    });
});
