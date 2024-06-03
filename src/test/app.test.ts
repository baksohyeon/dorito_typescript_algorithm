import { solution } from "../app";

describe("solution", () => {
  it("test 1", () => {
    const babbling = ["aya", "yee", "u", "maa"];
    const result = solution(babbling);
    const expected = 1;
    expect(result).toBe(expected);
  });
  it("test 2", () => {
    const babbling = ["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"];
    const result = solution(babbling);
    const expected = 2;
    expect(result).toBe(expected);
  });
  it("test 2", () => {
    const babbling = ["mama", "ayaye"];
    const result = solution(babbling);
    const expected = 1;
    expect(result).toBe(expected);
  });
});
