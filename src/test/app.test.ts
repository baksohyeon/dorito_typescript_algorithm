import solution from "../app";

describe("solution", () => {
  it("test 1", () => {
    const genres = ["classic", "pop", "classic", "classic", "pop"]
    const plays = [500, 600, 150, 800, 2500]
    const expected = [4, 1, 3, 0];

    const result = solution(genres, plays);
    expect(result).toEqual(expected);
  });

});
