import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import WorkspaceCard from "../../../src/components/patient/WorkspaceCard";
import type { WorkspaceCardProps } from "../../../src/Types/WorkspaceCardProps";
import { renderWithRouter } from "../../renderWithRouter";

const props: WorkspaceCardProps = {
    title: "Record Purge",
    subtitle: "Permanent Deletion",
    description: "Remove everything",
    badge: "Delete",
    tone: "danger",
    footnote: "Irreversible action",
    actionLabel: "Review Purge",
    to: "/patients/892-019/delete",
};

describe("WorkspaceCard", () => {
    it("renders its content and links to the workspace", () => {
        renderWithRouter(<WorkspaceCard {...props} />);
        const card = screen.getByRole("article", { name: "Record Purge" });
        expect(card).toHaveClass("border-danger-1");
        expect(card).toHaveTextContent("Permanent Deletion");
        expect(card).toHaveTextContent("Remove everything");
        expect(card).toHaveTextContent("Irreversible action");
        expect(screen.getByText("Delete")).toBeInTheDocument();
        const link = screen.getByRole("link", { name: "Review Purge" });
        expect(link).toHaveAttribute("href", props.to);
        expect(link).toHaveClass("text-danger-1");
    });

    it("uses teal emphasis for the teal tone", () => {
        renderWithRouter(<WorkspaceCard {...props} tone="teal" />);
        expect(screen.getByRole("article")).toHaveClass("border-teal-1", "bg-surface-3");
    });

    it("uses the default container and an outline action for neutral cards", () => {
        renderWithRouter(<WorkspaceCard {...props} tone="neutral" />);
        expect(screen.getByRole("article")).toHaveClass("border-border-color");
        expect(screen.getByRole("link")).toHaveClass("border-teal-1");
    });
});
