import { describe, expect, it } from "vitest";
import { isNavItemActive } from "../../src/utils/navigation";
import { LayoutGridIcon } from "../../src/components/icons/Icons";

const item = { label: "Patients", icon: LayoutGridIcon, to: "/search", matches: ["/patients"] };

describe("isNavItemActive", () => {
    it.each([
        ["/search", true],
        ["/search/advanced", true],
        ["/patients/892-019", true],
        ["/patients", true],
        ["/searching", false],
        ["/home", false],
    ])("%s -> %s", (pathname, expected) => {
        expect(isNavItemActive(item, pathname)).toBe(expected);
    });

    it("is never active for items without a destination", () => {
        expect(isNavItemActive({ label: "Account", icon: LayoutGridIcon }, "/")).toBe(false);
    });

    it("works without extra matches", () => {
        expect(isNavItemActive({ label: "Home", icon: LayoutGridIcon, to: "/home" }, "/home")).toBe(true);
    });
});
