import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkButton from "../../../src/components/common/LinkButton";
import { renderWithRouter } from "../../renderWithRouter";

describe("LinkButton", () => {
    it("renders a link styled with the chosen variant", () => {
        renderWithRouter(<LinkButton to="/upload-documents" variant="outline" className="px-2">Upload</LinkButton>);
        const link = screen.getByRole("link", { name: "Upload" });
        expect(link).toHaveAttribute("href", "/upload-documents");
        expect(link).toHaveClass("border-teal-1", "px-2");
    });

    it("renders an optional icon", () => {
        renderWithRouter(<LinkButton to="/x" icon={<svg data-testid="icon" />}>Go</LinkButton>);
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("navigates to its destination", async () => {
        renderWithRouter(<LinkButton to="/search">Search</LinkButton>);
        await userEvent.click(screen.getByRole("link", { name: "Search" }));
        expect(screen.getByTestId("location")).toHaveTextContent("/search");
    });
});
