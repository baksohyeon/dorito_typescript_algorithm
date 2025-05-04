export function solution(rectangle: number[][], characterX: number, characterY: number, itemX: number, itemY: number) {
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
    const visited = Array.from({ length: mapSize }, () => Array(mapSize).fill(false));
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
                nx >= 0 && nx < mapSize &&
                ny >= 0 && ny < mapSize &&
                map[ny][nx] === 1 &&
                !visited[ny][nx]
            ) {
                visited[ny][nx] = true;
                queue.push([nx, ny, distance + 1]);
            }
        }
    }

    return -1; // 경로가 없는 경우 
    // 문제 조건에서는 발생 X
}