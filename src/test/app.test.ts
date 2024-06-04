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

// function solution(record) {
//   const users = new Map();

//   record.forEach((log) => {
//     const [_command, uid, name] = log.split(" ");
//     if (name) {
//       users.set(uid, name);
//     }
//   });

//   const result = record.map((log) => {
//     const [command, uid] = log.split(" ");

//     switch (command) {
//       case "Enter":
//         return `${users.get(uid)}님이 들어왔습니다.`;
//       case "Leave":
//         return `${users.get(uid)}님이 나갔습니다.`;
//       default:
//         return "";
//     }
//   });

//   return result.filter((str) => str.length > 0);
// }
