import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import WorkspaceLink from "../../../../src/components/mobile/patient/WorkspaceLink";
import { renderWithRouter } from "../../../renderWithRouter";

describe("WorkspaceLink", () => {
    it("links to the workspace with tone styling", () => {
        renderWithRouter(<ul><WorkspaceLink title="Compliance Redaction" description="Irreversible" to="/patients/1/delete" tone="danger" /></ul>);
        const link = screen.getByRole("link", { name: /Compliance Redaction/ });
        expect(link).toHaveAttribute("href", "/patients/1/delete");
        expect(link).toHaveTextContent("Irreversible");
        expect(link).toHaveClass("border-danger-3");
        expect(screen.getByText("Compliance Redaction")).toHaveClass("text-danger-1");
    });
});
