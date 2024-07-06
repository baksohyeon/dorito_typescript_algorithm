import solution from "../app";

describe("solution", () => {
  it("test 1", () => {
    const result = solution(1, 2, 3, 4);
    const expected = [5, 4];
    expect(result).toEqual(expected);
  });

  it("test 2", () => {
    const result = solution(2, 1, 2, 1);
    const expected = [4, 1];
    expect(result).toEqual(expected);
  });

  it("test 3", () => {
    const result = solution(4, 4, 4, 4);
    const expected = [2, 1];
    expect(result).toEqual(expected);
  });
  it("test 4", () => {
    const result = solution(1, 6, 2, 6);
    const expected = [1, 2];
    expect(result).toEqual(expected);
  });
});
