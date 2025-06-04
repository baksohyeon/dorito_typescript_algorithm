export const solution = (numbers: number[], target: number) => {
    // target 이면 count 증가
    // 모든 경우의 수 순회 -> dfs 
    let count = 0;

    const length = numbers.length;
    const dfs = (currentIdx: number, total: number) => {
        if (currentIdx === length) {
            if (total === target) {
                count++
            }
            return count;
        } else {
            const number = numbers[currentIdx];
            dfs(currentIdx + 1, total - number)
            dfs(currentIdx + 1, total + number)
        }
    }
    dfs(0, 0)
    return count
}