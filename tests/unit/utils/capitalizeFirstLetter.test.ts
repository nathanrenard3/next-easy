import { capitalizeFirstLetter } from "@/lib/utils";

describe("capitalizeFirstLetter", () => {
  it('capitalizes the first letter of "world"', () => {
    const result = capitalizeFirstLetter("world");
    expect(result).toBe("World");
  });

  it("returns an empty string when given an empty string", () => {
    const result = capitalizeFirstLetter("");
    expect(result).toBe("");
  });

  it('capitalizes the first letter of a single-character string "a"', () => {
    const result = capitalizeFirstLetter("a");
    expect(result).toBe("A");
  });

  it("does not change the string if the first letter is already capitalized", () => {
    const result = capitalizeFirstLetter("Hello");
    expect(result).toBe("Hello");
  });
});
