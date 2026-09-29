import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CitationList from "../../../src/components/common/CitationList";

describe("CitationList", () => {
    it("renders each citation with its marker, source and detail", () => {
        render(<CitationList label="Sources" citations={[
            { marker: 1, source: "notes.pdf", detail: "Page 3" },
            { marker: 2, source: "labs.pdf", detail: "Col 2" },
        ]} />);
        const items = within(screen.getByRole("list", { name: "Sources" })).getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("[1]notes.pdf · Page 3");
        expect(items[1]).toHaveTextContent("[2]labs.pdf · Col 2");
    });
});
