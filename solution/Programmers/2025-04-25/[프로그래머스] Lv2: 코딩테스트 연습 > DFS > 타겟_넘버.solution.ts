export function solution(numbers: number[], target: number) {
    let count = 0;

    const dfs = (currentIdx: number, currentSum: number) => {
        if (currentIdx === numbers.length) {
            if (currentSum === target) {
                count++;
            }
            return;
        }

        dfs(currentIdx + 1, currentSum + numbers[currentIdx]);
        dfs(currentIdx + 1, currentSum - numbers[currentIdx]);
    }

    dfs(0, 0);
    return count;
}
