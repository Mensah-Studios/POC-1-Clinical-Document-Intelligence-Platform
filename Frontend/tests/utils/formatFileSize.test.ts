import { describe, expect, it } from "vitest";
import { formatFileSize } from "../../src/utils/formatFileSize";

describe("formatFileSize", () => {
    it.each([
        [0, "1 KB"],
        [2048, "2 KB"],
        [1024 * 1024 - 1, "1024 KB"],
        [1024 * 1024, "1.0 MB"],
        [38.1 * 1024 * 1024, "38.1 MB"],
    ])("formats %d bytes as %s", (bytes, expected) => {
        expect(formatFileSize(bytes)).toBe(expected);
    });
});
