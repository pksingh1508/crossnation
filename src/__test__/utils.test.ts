import { cn } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-2 py-1", "bg-red-500", "text-white");
      expect(result).toBe("px-2 py-1 bg-red-500 text-white");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("should handle undefined and null values", () => {
      const result = cn("base-class", undefined, null, "valid-class");
      expect(result).toBe("base-class valid-class");
    });
  });
});
