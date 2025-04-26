import { solution } from "../app";

describe("solution", () => {

  it(`should return 11 when the 'map' argument is provided as specified`, () => {
    const map = [
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1]
    ];
    expect(solution(map)).toBe(11);
  });

  it(`should return -1 when the 'map' argument is provided as specified`, () => {
    const map = [
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1]
    ];
    expect(solution(map)).toBe(-1);
  });

});
