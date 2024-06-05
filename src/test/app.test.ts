import { solution } from "../app";

describe("solution", () => {
  it("test 1", () => {
    const record = [
      "Enter uid1234 Muzi",
      "Enter uid4567 Prodo",
      "Leave uid1234",
      "Enter uid1234 Prodo",
      "Change uid4567 Ryan",
    ];
    const result = solution(record);
    const expected = [
      "Prodo님이 들어왔습니다.",
      "Ryan님이 들어왔습니다.",
      "Prodo님이 나갔습니다.",
      "Prodo님이 들어왔습니다.",
    ];
    expect(result).toEqual(expected);
  });
});
