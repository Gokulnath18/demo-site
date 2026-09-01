import { parseStatValue } from "./parseStatValue";

describe("parseStatValue", () => {
  it("parses a decimal value with a letter suffix", () => {
    expect(parseStatValue("2.4M")).toEqual({
      prefix: "",
      target: 2.4,
      decimals: 1,
      suffix: "M",
    });
  });

  it("parses an integer value with a compound suffix", () => {
    expect(parseStatValue("150K+")).toEqual({
      prefix: "",
      target: 150,
      decimals: 0,
      suffix: "K+",
    });
  });

  it("parses a decimal value with a unit-word suffix", () => {
    expect(parseStatValue("4.2 hrs")).toEqual({
      prefix: "",
      target: 4.2,
      decimals: 1,
      suffix: " hrs",
    });
  });

  it("keeps a leading + sign as a static prefix, not part of the count", () => {
    expect(parseStatValue("+18%")).toEqual({
      prefix: "+",
      target: 18,
      decimals: 0,
      suffix: "%",
    });
  });

  it("keeps a leading - sign as a static prefix, not part of the count", () => {
    expect(parseStatValue("-5%")).toEqual({
      prefix: "-",
      target: 5,
      decimals: 0,
      suffix: "%",
    });
  });

  it("trims surrounding whitespace before parsing", () => {
    expect(parseStatValue("  2.4M  ")).toEqual({
      prefix: "",
      target: 2.4,
      decimals: 1,
      suffix: "M",
    });
  });

  it("returns null for a string with no leading numeric portion", () => {
    expect(parseStatValue("N/A")).toBeNull();
    expect(parseStatValue("")).toBeNull();
  });
});
