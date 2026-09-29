import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Avatar from "../../../src/components/common/Avatar";

describe("Avatar", () => {
    it("shows initials and is labelled with the full name", () => {
        render(<Avatar name="Sarah Jenkins" />);
        expect(screen.getByRole("img", { name: "Sarah Jenkins" })).toHaveTextContent("SJ");
    });

    it("ignores honorifics and credentials", () => {
        render(<Avatar name="Dr. Linus Patel, MD" size="sm" />);
        expect(screen.getByRole("img")).toHaveTextContent(/^LP$/);
    });

    it("applies size and highlight styles", () => {
        render(<Avatar name="Raymond Wong" size="lg" highlighted />);
        expect(screen.getByRole("img")).toHaveClass("size-16", "text-teal-1");
    });
});
