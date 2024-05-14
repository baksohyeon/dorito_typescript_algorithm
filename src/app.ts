export const solution = (k: number, g: number[]) => {
  // k 개의 추와 추의 무게 배열 g
  const totalWeghts = g.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const visited = new Array(k).fill(false);

  const weights = g.sort((a, b) => a - b);

  const queue: number[] = [0, 0];
  const set = new Set();

  while (queue.length > 0) {
    console.log(set);
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) {
        const currentSum = queue.shift() as number;

        if (!visited[j] && currentSum + weights[j] <= totalWeghts) {
          visited[j] = true;
          queue.push(currentSum + weights[j]);
          set.add(currentSum + weights[j]);
          set.add(currentSum - weights[j]);
        }

        visited[i] = false;
      }
    }
  }
  return set;
};
