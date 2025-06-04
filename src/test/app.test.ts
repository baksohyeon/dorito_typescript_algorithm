import { solution } from "../app";

describe("should return the number of ways to reach the target sum with the given numbers and target sum", () => {
  it(`should return 5 for [1, 1, 1, 1, 1] and 3`, () => {
    expect(solution([1, 1, 1, 1, 1], 3)).toBe(5);
  });

  it(`should return 2 for [4, 1, 2, 1] and 4`, () => {
    expect(solution([4, 1, 2, 1], 4)).toBe(2);
  });

  it(`should return 0 for [1, 2, 3] and 7`, () => {
    expect(solution([1, 2, 3], 7)).toBe(0);
  });

  it(`should return 1 for [1, 1, 1, 1, 1] and 5`, () => {
    expect(solution([1, 1, 1, 1, 1], 5)).toBe(1);
  });
});
