import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as Icons from "../../../src/components/icons/Icons";

describe("Icons", () => {
    it.each(Object.entries(Icons))("%s renders a decorative svg with the given class", (_, Icon) => {
        const { container } = render(<Icon className="size-4" />);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("aria-hidden", "true");
        expect(svg).toHaveClass("size-4");
    });
});
