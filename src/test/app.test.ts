import { solution } from "../app";

describe("solution", () => {

  it(`should return 17 when the 'rectangle', 'characterX', 'characterY', 'itemX', and 'itemY' arguments are provided as specified`, () => {
    const rectangle = [[1, 1, 7, 4], [3, 2, 5, 5], [4, 3, 6, 9], [2, 6, 8, 8]];
    const characterX = 1;
    const characterY = 3;
    const itemX = 7;
    const itemY = 8;
    expect(solution(rectangle, characterX, characterY, itemX, itemY)).toBe(17);
  });

  it(`should return 11 when the 'rectangle', 'characterX', 'characterY', 'itemX', and 'itemY' arguments are provided as specified`, () => {
    const rectangle = [[1, 1, 8, 4], [2, 2, 4, 9], [3, 6, 9, 8], [6, 3, 7, 7]];
    const characterX = 9;
    const characterY = 7;
    const itemX = 6;
    const itemY = 1;
    expect(solution(rectangle, characterX, characterY, itemX, itemY)).toBe(11);
  });

  it(`should return 9 when the 'rectangle', 'characterX', 'characterY', 'itemX', and 'itemY' arguments are provided as specified`, () => {
    const rectangle = [[1, 1, 5, 7]];
    const characterX = 1;
    const characterY = 1;
    const itemX = 4;
    const itemY = 7;
    expect(solution(rectangle, characterX, characterY, itemX, itemY)).toBe(9);
  });

  it(`should return 15 when the 'rectangle', 'characterX', 'characterY', 'itemX', and 'itemY' arguments are provided as specified`, () => {
    const rectangle = [[2, 1, 7, 5], [6, 4, 10, 10]];
    const characterX = 3;
    const characterY = 1;
    const itemX = 7;
    const itemY = 10;
    expect(solution(rectangle, characterX, characterY, itemX, itemY)).toBe(15);
  });

  it(`should return 10 when the 'rectangle', 'characterX', 'characterY', 'itemX', and 'itemY' arguments are provided as specified`, () => {
    const rectangle = [[2, 2, 5, 5], [1, 3, 6, 4], [3, 1, 4, 6]];
    const characterX = 1;
    const characterY = 4;
    const itemX = 6;
    const itemY = 3;
    expect(solution(rectangle, characterX, characterY, itemX, itemY)).toBe(10);
  });

});
