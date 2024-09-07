import { formatPhoneNumber } from "@/lib/utils";

describe("formatPhoneNumber", () => {
  it('formats "+33 1 23 45 67 89" to "01 23 45 67 89"', () => {
    const result = formatPhoneNumber("+33 1 23 45 67 89");
    expect(result).toBe("01 23 45 67 89");
  });

  it('formats "0123456789" to "01 23 45 67 89"', () => {
    const result = formatPhoneNumber("0123456789");
    expect(result).toBe("01 23 45 67 89");
  });

  it('formats "+33612345678" to "06 12 34 56 78"', () => {
    const result = formatPhoneNumber("+33612345678");
    expect(result).toBe("06 12 34 56 78");
  });

  it("returns the same string if the number is invalid", () => {
    const result = formatPhoneNumber("invalid number");
    expect(result).toBe("invalid number");
  });

  it('formats "06-12-34-56-78" to "06 12 34 56 78"', () => {
    const result = formatPhoneNumber("06-12-34-56-78");
    expect(result).toBe("06 12 34 56 78");
  });

  it('formats "06.12.34.56.78" to "06 12 34 56 78"', () => {
    const result = formatPhoneNumber("06.12.34.56.78");
    expect(result).toBe("06 12 34 56 78");
  });

  it('formats "+33 (0)6 12 34 56 78" to "06 12 34 56 78"', () => {
    const result = formatPhoneNumber("+33 (0)6 12 34 56 78");
    expect(result).toBe("06 12 34 56 78");
  });
});
