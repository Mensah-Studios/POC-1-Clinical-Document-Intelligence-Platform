import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SessionCard from "../../../src/components/navigation/SessionCard";
import { CURRENT_USER, ORGANIZATION } from "../../../src/constants/navigation";

describe("SessionCard", () => {
    it("shows the organization and signed-in clinician", () => {
        render(<SessionCard />);
        const card = screen.getByRole("region", { name: "Active session" });
        expect(card).toHaveTextContent(ORGANIZATION.name);
        expect(card).toHaveTextContent(ORGANIZATION.nodeId);
        expect(card).toHaveTextContent(CURRENT_USER.name);
        expect(card).toHaveTextContent(CURRENT_USER.session);
        expect(screen.getByRole("img", { name: CURRENT_USER.name })).toBeInTheDocument();
    });
});
