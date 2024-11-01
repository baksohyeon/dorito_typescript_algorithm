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
  type: "play" | "break";
  duration: number; // 해당 세그먼트의 시간
  originalLevel: number; // 원래 레벨
  level?: number; // only for play segments
  startTime: Date; // 시작 시간
  endTime: Date; // 종료 시간
}

export default function solution(
  levels: IBlind[],
  startTime: Date
): TimeSegment[] {
  const PLAY_TIME_BEFORE_BREAK = 3600; // 60분 후 휴식
  const BREAK_DURATION = 5; // 5분 휴식

  let result: TimeSegment[] = [];
  let currentTime = new Date(startTime);
  let accumulatedTime = 0;

  // 시작 시간의 분을 고려하여 첫 휴식까지의 시간 계산
  const minutesIntoHour = startTime.getMinutes();
  const minutesToNextHour = 60 - minutesIntoHour;

  levels.forEach((duration, level) => {
    let remainingDuration = duration.Time / 60;

    while (remainingDuration > 0) {
      // 첫 번째 레벨에서 정각까지 남은 시간 계산
      const timeToNextHour = level === 0 ? minutesToNextHour : 55;

      // 현재 시점부터 다음 55분 지점까지의 시간 계산
      const timeToNext55 =
        PLAY_TIME_BEFORE_BREAK -
        (accumulatedTime % (PLAY_TIME_BEFORE_BREAK + BREAK_DURATION));

      // 더 가까운 휴식 시간 선택
      const timeUntilBreak = Math.min(timeToNextHour, timeToNext55);

      if (
        remainingDuration + (currentTime.getMinutes() % 60) >=
        timeUntilBreak
      ) {
        // 휴식이 필요한 경우
        const playDuration = Math.min(remainingDuration, timeUntilBreak);

        if (playDuration > 0) {
          const segmentEndTime = new Date(currentTime);
          segmentEndTime.setMinutes(currentTime.getMinutes() + playDuration);
          result.push({
            type: "play",
            duration: playDuration,
            originalLevel: duration.Lv,
            level: level + 1,
            startTime: new Date(currentTime),
            endTime: segmentEndTime,
          });
          currentTime = segmentEndTime;
        }
        // 휴식 세그먼트 추가
        const breakEndTime = new Date(currentTime);
        breakEndTime.setMinutes(currentTime.getMinutes() + BREAK_DURATION);
        result.push({
          type: "break",
          duration: BREAK_DURATION,
          originalLevel: duration.Lv,
          startTime: new Date(currentTime),
          endTime: breakEndTime,
        });

        currentTime = breakEndTime;
        remainingDuration -= playDuration;
        accumulatedTime += playDuration + BREAK_DURATION;

        result.push({
          type: "play",
          duration: remainingDuration,
          originalLevel: duration.Lv,
          level: level + 1,
          startTime: new Date(currentTime),
          endTime: breakEndTime,
        });

        // 남은 시간만큼 레벨 증가
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
            originalLevel: duration.Lv,
            level: level,
            startTime: new Date(currentTime),
            endTime: segmentEndTime,
          });
          currentTime = segmentEndTime;
          accumulatedTime += remainingDuration;
        }
      }
      remainingDuration = 0;
    }
  });

  return result;
}
