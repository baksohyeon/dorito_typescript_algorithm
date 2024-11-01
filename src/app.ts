interface IBlind {
  Index: number; // -1 부터 시작
  Lv: number; // 1 부터 시작
  Small: number;
  Big: number;
  PB: number;
  Ante: number;
  Time: number;
}

interface TimeSegment {
  type: "play" | "break" | "prepare";
  duration: number; // 해당 세그먼트의 시간
  originalLevel: number; // 원래 레벨
  level?: number; // only for play segments
  startTime: Date; // 시작 시간
  endTime: Date; // 종료 시간
  accumulatedTime?: number; // 누적 시간
  temp?: any;
}
export default function solution(
  levels: IBlind[],
  startTime: Date
): TimeSegment[] {
  const PLAY_TIME_BEFORE_BREAK = 55 * 60; // 55분 후 휴식
  const BREAK_DURATION = 5 * 60; // 5분 휴식

  let result: TimeSegment[] = [];
  let currentTime = new Date(startTime);
  let accumulatedTime = 0;

  levels.forEach((duration, level) => {
    let remainingDuration = duration.Time / 60; // 이미 분 단위

    while (remainingDuration > 0) {
      // 다음 정각까지 남은 시간 계산
      const nextHourBreak = new Date(currentTime);
      nextHourBreak.setHours(currentTime.getHours() + 1, 0, 0, 0);
      const timeToNextHour =
        (nextHourBreak.getTime() - currentTime.getTime()) / 60000; // ms to min

      // 현재 시점부터 다음 55분 지점까지의 시간 계산
      const timeToNext55 =
        PLAY_TIME_BEFORE_BREAK - (currentTime.getMinutes() % 60);

      // 더 가까운 휴식 시간 선택
      const timeUntilBreak = Math.min(timeToNextHour, timeToNext55);

      if (remainingDuration >= timeUntilBreak) {
        // 55분까지 플레이
        const playDuration = timeUntilBreak;

        if (playDuration > 0) {
          const segmentEndTime = new Date(currentTime);
          segmentEndTime.setMinutes(currentTime.getMinutes() + playDuration);
          result.push({
            type: "play",
            originalLevel: level + 1,
            duration: playDuration,
            level: level + 1,
            startTime: new Date(currentTime),
            endTime: segmentEndTime,
          });
          currentTime = segmentEndTime;
        }

        // 55분부터 정각까지 휴식
        const breakEndTime = new Date(currentTime);
        breakEndTime.setMinutes(0);
        breakEndTime.setHours(currentTime.getHours() + 1);
        result.push({
          type: "break",
          duration: (breakEndTime.getTime() - currentTime.getTime()) / 60000, // ms to min
          originalLevel: level + 1,
          startTime: new Date(currentTime),
          endTime: breakEndTime,
        });

        currentTime = breakEndTime;
        remainingDuration -= playDuration;
        accumulatedTime += playDuration;
      } else {
        // 남은 시간이 휴식 전에 끝나는 경우
        if (remainingDuration > 0) {
          const segmentEndTime = new Date(currentTime);
          segmentEndTime.setMinutes(
            currentTime.getMinutes() + remainingDuration
          );
          result.push({
            type: "play",
            duration: remainingDuration,
            originalLevel: level + 1,
            level: level + 1,
            startTime: new Date(currentTime),
            endTime: segmentEndTime,
          });
          currentTime = segmentEndTime;
          accumulatedTime += remainingDuration;
        }
        remainingDuration = 0;
      }
    }
  });

  return result;
}
