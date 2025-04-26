const solution = (maps) => {
    const queue = [{ x: 0, y: 0, count: 1 }];
    const visited = Array.from(Array(maps.length), () => Array(maps[0].length).fill(false));
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    while (queue.length) {


        const shifted = queue.shift();

        if (typeof shifted === 'undefined') {
            return 0
        }

        const { x, y, count } = shifted


        if (x === maps.length - 1 && y === maps[0].length - 1) {
            return count;
        }
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (nx < 0 || ny < 0 || nx >= maps.length || ny >= maps[0].length) {
                continue;
            }
            if (maps[nx][ny] === 0 || visited[nx][ny]) {
                continue;
            }
            queue.push({ x: nx, y: ny, count: count + 1 });
            visited[nx][ny] = true;
        }
    }
    return -1;
};