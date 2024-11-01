import solution from "../app";

const blindLevels = [
  {
    Lv: 1,
    Small: 50,
    Big: 100,
    PB: 0,
    Ante: 1,
    Time: 360, // 6 min
    Index: -1,
  },
  {
    Lv: 2,
    Small: 100,
    Big: 200,
    PB: 0,
    Ante: 1,
    Time: 360, // sec
    Index: 0,
  },
  {
    Lv: 3,
    Small: 2500,
    Big: 5000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 2,
  },
  {
    Lv: 4,
    Small: 4000,
    Big: 8000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 3,
  },
  {
    Lv: 5,
    Small: 6000,
    Big: 12000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 4,
  },
  {
    Lv: 6,
    Small: 10000,
    Big: 20000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 5,
  },
  {
    Lv: 7,
    Small: 13000,
    Big: 25000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 6,
  },
  {
    Lv: 8,
    Small: 18000,
    Big: 35000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 7,
  },
  {
    Lv: 9,
    Small: 25000,
    Big: 50000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 8,
  },
  {
    Lv: 10,
    Small: 40000,
    Big: 80000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 9,
  },
  {
    Lv: 11,
    Small: 60000,
    Big: 120000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 10,
  },

  {
    Lv: 12,
    Small: 100000,
    Big: 200000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 12,
  },
  {
    Lv: 13,
    Small: 130000,
    Big: 250000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 13,
  },
  {
    Lv: 14,
    Small: 180000,
    Big: 350000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 14,
  },
  {
    Lv: 15,
    Small: 250000,
    Big: 500000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 15,
  },
  {
    Lv: 16,
    Small: 400000,
    Big: 800000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 16,
  },
  {
    Lv: 17,
    Small: 600000,
    Big: 1200000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 17,
  },
  {
    Lv: 18,
    Small: 1000000,
    Big: 2000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 18,
  },
  {
    Lv: 19,
    Small: 1300000,
    Big: 2500000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 19,
  },
  {
    Lv: 20,
    Small: 1800000,
    Big: 3500000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 20,
  },

  {
    Lv: 21,
    Small: 2500000,
    Big: 5000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 22,
  },
  {
    Lv: 22,
    Small: 4000000,
    Big: 8000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 23,
  },
  {
    Lv: 23,
    Small: 6000000,
    Big: 12000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 24,
  },
  {
    Lv: 24,
    Small: 10000000,
    Big: 20000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 25,
  },
  {
    Lv: 25,
    Small: 13000000,
    Big: 25000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 26,
  },
  {
    Lv: 26,
    Small: 18000000,
    Big: 35000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 27,
  },
  {
    Lv: 27,
    Small: 25000000,
    Big: 50000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 28,
  },
  {
    Lv: 28,
    Small: 40000000,
    Big: 80000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 29,
  },
  {
    Lv: 29,
    Small: 60000000,
    Big: 120000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 30,
  },

  {
    Lv: 30,
    Small: 100000000,
    Big: 200000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 32,
  },
  {
    Lv: 31,
    Small: 130000000,
    Big: 250000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 33,
  },
  {
    Lv: 32,
    Small: 180000000,
    Big: 350000000,
    PB: 0,
    Ante: 1,
    Time: 360,
    Index: 34,
  },
];

describe("solution", () => {
  const now = new Date("2024-11-01T13:26:00Z").getTime();
  it("test 1", () => {
    const result = solution(blindLevels, new Date("2024-11-01T13:26:00Z"));
    console.table(result);
  });
});

function findNextTime(startTime: number) {
  const date = new Date(startTime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // 55분 찾기
  if (minutes < 55) {
    // 현재 시간의 55분을 반환
    date.setMinutes(55);
  } else {
    // 현재 시간의 다음 시간의 55분을 반환
    hours += 1;
    if (hours === 24) {
      hours = 0; // 자정 넘어가면 0으로 리셋
    }
    date.setHours(hours);
    date.setMinutes(55);
  }
  return date;
}
