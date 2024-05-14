import { solution } from "../app";

describe("solution", () => {
  test("example 1", () => {
    const k = 3;
    const g = [1, 5, 7];
    const expected = 2;
    const result = solution(k, g);
    expect(result).toBe(expected);
  });
});
