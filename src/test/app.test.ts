import { solution } from "../app";

describe("should return the number of ways to reach the target sum with the given numbers and target sum", () => {
  it.only(`should return 3`, () => {
    const n = 22;
    const w = 6;
    const num = 8;
    const result = solution(n, w, num);
    const expected = 3;
    expect(result).toEqual(expected);
  });

  it(`should return 4`, () => {
    const n = 13;
    const w = 3;
    const num = 6;
    const result = solution(n, w, num);
    const expected = 4;
    expect(result).toEqual(expected);
  });
});
