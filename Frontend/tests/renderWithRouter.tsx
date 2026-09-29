import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

function LocationDisplay() {
    const { pathname, search } = useLocation();
    return <div data-testid="location">{`${pathname}${search}`}</div>;
}

/**
 * Renders `ui` at `route`, matched against `path` so route params resolve.
 * Navigating anywhere else renders a location probe (`getByTestId("location")`).
 */
export function renderWithRouter(ui: ReactElement, { route = "/", path = "/" }: { route?: string; path?: string } = {}) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path={path} element={<>{ui}<LocationDisplay /></>} />
                <Route path="*" element={<LocationDisplay />} />
            </Routes>
        </MemoryRouter>,
    );
}
