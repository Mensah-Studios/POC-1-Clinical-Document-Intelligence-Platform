import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileLogin from "../../../src/pages/mobile/Login";
import { CERTIFICATIONS, LOGIN_CONTENT } from "../../../src/constants/constants";
import { MOBILE_LOGIN_CONTENT } from "../../../src/constants/mobile";
import { PASSWORD_TOGGLE_LABELS } from "../../../src/constants/constants";

describe("Mobile Login page", () => {
    it("renders the hero, certifications and brand card", () => {
        render(<MobileLogin />);
        expect(screen.getByRole("main", { name: "mobile-login-form" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1, name: MOBILE_LOGIN_CONTENT.hero.heading })).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(CERTIFICATIONS.length);
        expect(screen.getByText(MOBILE_LOGIN_CONTENT.brandCard.description)).toBeInTheDocument();
    });

    it("offers both single sign-on providers", () => {
        render(<MobileLogin />);
        expect(screen.getByRole("button", { name: MOBILE_LOGIN_CONTENT.authProviders.epic })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: MOBILE_LOGIN_CONTENT.authProviders.sso })).toBeInTheDocument();
    });

    it("captures email and password and toggles password visibility", async () => {
        render(<MobileLogin />);
        const email = screen.getByLabelText(LOGIN_CONTENT.form.emailLabel);
        const password = screen.getByLabelText(LOGIN_CONTENT.form.passwordLabel);
        await userEvent.type(email, "l.patel@mountsinai.org");
        await userEvent.type(password, "secret");
        expect(email).toHaveValue("l.patel@mountsinai.org");
        expect(password).toHaveAttribute("type", "password");

        await userEvent.click(screen.getByRole("button", { name: PASSWORD_TOGGLE_LABELS.show }));
        expect(password).toHaveAttribute("type", "text");
        await userEvent.click(screen.getByRole("button", { name: PASSWORD_TOGGLE_LABELS.hide }));
        expect(password).toHaveAttribute("type", "password");
    });

    it("prevents the default form submission", () => {
        render(<MobileLogin />);
        const event = new Event("submit", { bubbles: true, cancelable: true });
        fireEvent(screen.getByRole("form", { name: "Email sign-in" }), event);
        expect(event.defaultPrevented).toBe(true);
    });

    it("shows the submit action and compliance notice", () => {
        render(<MobileLogin />);
        expect(screen.getByRole("button", { name: MOBILE_LOGIN_CONTENT.submit })).toHaveAttribute("type", "submit");
        expect(screen.getByRole("note")).toHaveTextContent(MOBILE_LOGIN_CONTENT.complianceNotice);
    });
});
