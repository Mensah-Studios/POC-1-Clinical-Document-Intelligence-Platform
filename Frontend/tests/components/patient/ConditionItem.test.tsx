import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ConditionItem from "../../../src/components/patient/ConditionItem";

describe("ConditionItem", () => {
    it("emphasises high severity conditions", () => {
        render(<ul><ConditionItem condition={{ name: "CHF", diagnosed: "Oct 2021", severity: "high" }} /></ul>);
        const item = screen.getByRole("listitem");
        expect(item).toHaveClass("text-teal-1");
        expect(item).toHaveTextContent("Diagnosed: Oct 2021");
        expect(item.querySelector(".bg-danger-1")).not.toBeNull();
    });

    it("renders moderate conditions with a warning marker", () => {
        render(<ul><ConditionItem condition={{ name: "T2DM", diagnosed: "Jun 2019", severity: "moderate" }} /></ul>);
        const item = screen.getByRole("listitem");
        expect(item).toHaveClass("text-slate-1");
        expect(item.querySelector(".bg-warning-1")).not.toBeNull();
    });
});
