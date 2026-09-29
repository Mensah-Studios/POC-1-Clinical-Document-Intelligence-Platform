import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Mobile from "../../../src/platforms/mobile/Mobile";
import { MOBILE_DASHBOARD_CONTENT, MOBILE_MENU_CONTENT, MOBILE_PATIENT_CONTENT, MOBILE_SEARCH_CONTENT, MOBILE_UPLOAD_CONTENT } from "../../../src/constants/mobile";

function renderAt(path: string) {
    window.history.pushState({}, "", path);
    return render(<Mobile />);
}

afterEach(() => {
    window.history.pushState({}, "", "/");
});

describe("Mobile routes", () => {
    it.each([
        ["/home", MOBILE_DASHBOARD_CONTENT.title],
        ["/upload-documents", MOBILE_UPLOAD_CONTENT.title],
        ["/search", MOBILE_SEARCH_CONTENT.title],
        ["/patients/892-019", MOBILE_PATIENT_CONTENT.overview.title],
        ["/patients/892-019/summary", MOBILE_PATIENT_CONTENT.summary.title],
        ["/patients/892-019/documents", MOBILE_PATIENT_CONTENT.documents.title],
        ["/patients/892-019/update", MOBILE_PATIENT_CONTENT.update.title],
        ["/patients/892-019/delete", MOBILE_PATIENT_CONTENT.delete.title],
    ])("renders %s inside the mobile layout", (path, title) => {
        renderAt(path);
        expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: MOBILE_MENU_CONTENT.tabBarLabel })).toBeInTheDocument();
    });

    it("renders the login page without the tab bar", () => {
        renderAt("/");
        expect(screen.getByRole("main", { name: "mobile-login-form" })).toBeInTheDocument();
        expect(screen.queryByRole("navigation", { name: MOBILE_MENU_CONTENT.tabBarLabel })).not.toBeInTheDocument();
    });
});
