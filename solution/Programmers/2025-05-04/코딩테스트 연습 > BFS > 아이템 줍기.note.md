# 알고리즘 문제 해결

link: https://school.programmers.co.kr/learn/courses/30/lessons/87694
PR: https://github.com/baksohyeon/dorito_algorithm/pull/10

## 문제 이해

- 핵심 요구사항
  - 여러 개의 직사각형이 겹쳐진 형태에서 외곽 테두리를 따라 이동해야 함
  - 캐릭터의 시작 위치에서 아이템이 있는 위치까지 최단 거리를 구해야 함
  - 테두리를 따라서만 이동 가능 (직사각형 내부로는 이동 불가)
- 제약조건
  - 직사각형은 좌표평면 위의 직사각형으로, 좌표는 1 ≤ x, y ≤ 50 범위
  - 직사각형이 서로 겹쳐질 수 있으나 항상 연결된 하나의 영역으로 주어짐
  - 캐릭터와 아이템은 항상 테두리 위에 존재

## 접근 방법

- 핵심 아이디어
  - 지도를 생성하여 직사각형의 내부와 테두리를 구분
  - 직사각형 내부는 -1로, 테두리는 1로 표시
  - 다른 직사각형 내부에 속하는 테두리 부분은 제외해야 함
  - BFS를 사용하여 시작점에서 아이템까지의 최단 경로 탐색
- 시간/공간 복잡도
  - 시간 복잡도: O(N\*M) (N,M은 지도의 최대 크기)
  - 공간 복잡도: O(N\*M) (지도와 방문 배열 저장)

## 코드

```typescript
export function solution(
  rectangle: number[][],
  characterX: number,
  characterY: number,
  itemX: number,
  itemY: number
) {
  // 지도 범위 설정 (최대 좌표 50)
  const mapSize = 51;
  const map = Array.from({ length: mapSize }, () => Array(mapSize).fill(0));

  // 직사각형 내부와 테두리를 표시
  for (const [x1, y1, x2, y2] of rectangle) {
    // 직사각형 내부를 -1로 채움
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        map[y][x] = -1;
      }
    }
  }

  // 직사각형 테두리를 1로 표시 (경로로 사용)
  for (const [x1, y1, x2, y2] of rectangle) {
    // 테두리만 1로 설정
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        // 테두리인 경우: 가장자리이거나 다른 직사각형 내부에 포함되지 않은 경우
        if (x === x1 || x === x2 || y === y1 || y === y2) {
          // 다른 직사각형 내부에 있는지 확인
          let isInsideOtherRectangle = false;
          for (const [rx1, ry1, rx2, ry2] of rectangle) {
            if (x > rx1 && x < rx2 && y > ry1 && y < ry2) {
              isInsideOtherRectangle = true;
              break;
            }
          }

          if (!isInsideOtherRectangle) {
            map[y][x] = 1;
          }
        }
      }
    }
  }

  // BFS로 최단 경로 탐색
  const queue = [[characterX, characterY, 0]]; // [x, y, 거리]
  const visited = Array.from({ length: mapSize }, () =>
    Array(mapSize).fill(false)
  );
  visited[characterY][characterX] = true;

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift() ?? [];

    // 목표 지점에 도달한 경우
    if (x === itemX && y === itemY) {
      return distance;
    }

    // 4방향 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 유효한 범위이고, 테두리(값이 1)이고, 아직 방문하지 않은 경우
      if (
        nx >= 0 &&
        nx < mapSize &&
        ny >= 0 &&
        ny < mapSize &&
        map[ny][nx] === 1 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1; // 경로가 없는 경우 (문제 조건에서는 발생 X)
}
```

## 회고

- 배운 점
  - 겹쳐진 직사각형 처리 시 내부와 테두리를 구분하는 방법
  - BFS를 활용한 최단 경로 탐색 기법
  - 2차원 배열에서 방향 벡터(dx, dy)를 활용한 4방향 탐색 패턴
- 다음에 비슷한 문제를 만났을 때
  - 좌표계를 2배로 확장하여 겹친 부분 처리하는 방법 고려 (다른 풀이에서 활용)
  - 다양한 조건이 있는 경우 그리드에 값을 먼저 표시한 후 BFS 탐색하는 방식이 효과적
  - 테두리를 따라 이동하는 문제에서 내부/외부/테두리 구분이 중요함
