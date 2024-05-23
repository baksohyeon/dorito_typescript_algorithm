import { solution } from "../app";

describe("solution", () => {
  test("example 1", () => {
    const bridge_length = 2;
    const weight = 10;
    const truck_weights = [7, 4, 5, 6];
    const expected = 8;
    const result = solution(bridge_length, weight, truck_weights);
    expect(result).toBe(expected);
  });

  test("example 2", () => {
    const bridge_length = 100;
    const weight = 100;
    const truck_weights = [10];
    const expected = 101;
    const result = solution(bridge_length, weight, truck_weights);
    expect(result).toBe(expected);
  });

  test("example 3", () => {
    const bridge_length = 100;
    const weight = 100;
    const truck_weights = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const expected = 110;
    const result = solution(bridge_length, weight, truck_weights);
    expect(result).toBe(expected);
  });
});
