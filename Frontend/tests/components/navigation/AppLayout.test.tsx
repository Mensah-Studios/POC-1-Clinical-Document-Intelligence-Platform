import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../../../src/components/navigation/AppLayout";

describe("AppLayout", () => {
    it("renders the shared sidebar next to the routed page", () => {
        render(
            <MemoryRouter initialEntries={["/home"]}>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/home" element={<p>page content</p>} />
                    </Route>
                </Routes>
            </MemoryRouter>,
        );
        expect(screen.getByRole("complementary", { name: "Sidebar" })).toBeInTheDocument();
        expect(screen.getByRole("main")).toHaveTextContent("page content");
    });
});
