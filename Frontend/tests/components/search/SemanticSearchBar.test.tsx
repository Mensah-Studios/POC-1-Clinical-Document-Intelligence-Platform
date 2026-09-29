import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SemanticSearchBar from "../../../src/components/search/SemanticSearchBar";
import { SEARCH_CONTENT } from "../../../src/constants/search";

describe("SemanticSearchBar", () => {
    it("renders the query input and semantic badge", () => {
        render(<SemanticSearchBar value="heart failure" onChange={() => {}} onSubmit={() => {}} />);
        expect(screen.getByRole("searchbox", { name: SEARCH_CONTENT.finder.label })).toHaveValue("heart failure");
        expect(screen.getByText(SEARCH_CONTENT.finder.badge)).toBeInTheDocument();
    });

    it("reports typing and submission", async () => {
        const onChange = vi.fn();
        const onSubmit = vi.fn();
        render(<SemanticSearchBar value="" onChange={onChange} onSubmit={onSubmit} />);
        await userEvent.type(screen.getByRole("searchbox"), "a{enter}");
        expect(onChange).toHaveBeenCalledWith("a");
        expect(onSubmit).toHaveBeenCalledOnce();
    });
});
