import { formatPrice } from "@/lib/utils";

describe("formatPrice", () => {
  it('formats 1000 cents as "10,00 €"', () => {
    const result = formatPrice(1000);
    expect(result).toBe("10,00 €");
  });

  it('formats 9999 cents as "99,99 €"', () => {
    const result = formatPrice(9999);
    expect(result).toBe("99,99 €");
  });

  it('formats 50 cents as "0,50 €"', () => {
    const result = formatPrice(50);
    expect(result).toBe("0,50 €");
  });

  it('formats 0 cents as "0,00 €"', () => {
    const result = formatPrice(0);
    expect(result).toBe("0,00 €");
  });
});
