import { isValidTimeFormat } from "@/lib/utils";

describe("isValidTimeFormat", () => {
  it('returns true for valid time "08:00"', () => {
    const result = isValidTimeFormat("08:00");
    expect(result).toBe(true);
  });

  it('returns false for invalid time "25:00"', () => {
    const result = isValidTimeFormat("25:00");
    expect(result).toBe(false);
  });

  it('returns false for invalid time "08:60"', () => {
    const result = isValidTimeFormat("08:60");
    expect(result).toBe(false);
  });

  it('returns false for invalid time "8:00"', () => {
    const result = isValidTimeFormat("8:00");
    expect(result).toBe(false);
  });

  it('returns false for invalid time "0800"', () => {
    const result = isValidTimeFormat("0800");
    expect(result).toBe(false);
  });

  it('returns false for invalid time "08-00"', () => {
    const result = isValidTimeFormat("08-00");
    expect(result).toBe(false);
  });

  it("returns true for undefined input", () => {
    const result = isValidTimeFormat(undefined);
    expect(result).toBe(true);
  });

  it('returns false for invalid format "24:00"', () => {
    const result = isValidTimeFormat("24:00");
    expect(result).toBe(false);
  });

  it('returns true for valid time "23:59"', () => {
    const result = isValidTimeFormat("23:59");
    expect(result).toBe(true);
  });
});
