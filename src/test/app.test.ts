import { solution } from "../app";

describe("solution", () => {

  it('should return 5 when numbers are [1, 1, 1, 1, 1] and target is 3', () => {
    expect(solution([1, 1, 1, 1, 1], 3)).toBe(5);
  });

  it('should return 2 when numbers are [4, 1, 2, 1] and target is 4', () => {
    expect(solution([4, 1, 2, 1], 4)).toBe(2);
  });


});
