import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "../../../src/components/dashboard/StatCard";

describe("StatCard", () => {
    it("renders label, value and caption", () => {
        render(<StatCard label="Patients" value="4,281" caption="+24 today" captionTone="green" icon={<svg data-testid="icon" />} iconTone="teal" />);
        const card = screen.getByRole("article", { name: "Patients" });
        expect(card).toHaveTextContent("4,281");
        expect(screen.getByText("+24 today")).toHaveClass("text-green-1");
        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("shows a progress bar when progress is provided", () => {
        render(<StatCard label="Quota" value="57%" caption="57% used" captionTone="warning" icon={<svg />} iconTone="warning" progress={57} />);
        expect(screen.getByRole("progressbar", { name: "Quota usage" })).toHaveAttribute("aria-valuenow", "57");
    });
});
