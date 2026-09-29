import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Desktop from "../../../src/platforms/desktop/Desktop";
import { DASHBOARD_CONTENT } from "../../../src/constants/dashboard";
import { UPLOAD_CONTENT } from "../../../src/constants/upload";
import { SEARCH_CONTENT } from "../../../src/constants/search";
import {
    PATIENT_DELETE_CONTENT,
    PATIENT_DOCUMENTS_CONTENT,
    PATIENT_SUMMARY_CONTENT,
    PATIENT_UPDATE_CONTENT,
    PATIENT_VIEW_CONTENT,
} from "../../../src/constants/patients";

function renderAt(path: string) {
    window.history.pushState({}, "", path);
    return render(<Desktop />);
}

afterEach(() => {
    window.history.pushState({}, "", "/");
});

describe("Desktop routes", () => {
    it.each([
        ["/home", DASHBOARD_CONTENT.title],
        ["/upload-documents", UPLOAD_CONTENT.title],
        ["/search", SEARCH_CONTENT.title],
        ["/patients/892-019", PATIENT_VIEW_CONTENT.title("Sarah Jenkins")],
        ["/patients/892-019/summary", PATIENT_SUMMARY_CONTENT.title],
        ["/patients/892-019/documents", PATIENT_DOCUMENTS_CONTENT.title],
        ["/patients/892-019/update", PATIENT_UPDATE_CONTENT.title],
        ["/patients/892-019/delete", PATIENT_DELETE_CONTENT.title],
    ])("renders %s inside the shared layout", (path, title) => {
        renderAt(path);
        expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    });

    it("renders the login page without the app navigation", () => {
        renderAt("/");
        expect(screen.getByRole("main", { name: "login-form" })).toBeInTheDocument();
        expect(screen.queryByRole("navigation", { name: "Primary" })).not.toBeInTheDocument();
    });
});
