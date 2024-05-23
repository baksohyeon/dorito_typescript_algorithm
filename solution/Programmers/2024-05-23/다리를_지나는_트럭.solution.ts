export const solution = (
  bridge_length: number,
  weight: number,
  truck_weights: number[]
) => {
  const waitQueue = [...truck_weights];
  const movingQueue: number[] = new Array(bridge_length).fill(0);
  const passedQueue: number[] = [];

  let time = 0;
  let totalWeight = 0;
  while (true) {
    time++;
    const nextTruck = waitQueue[0] ?? 0;
    const aheadOfTruck = movingQueue.shift() ?? 0;

    // 차량이 통과한 경우
    if (aheadOfTruck > 0) {
      totalWeight -= aheadOfTruck;
      passedQueue.push(aheadOfTruck);
    }

    // 다리에 차량이 올라갈 수 있는 경우
    if (nextTruck > 0 && totalWeight + nextTruck <= weight) {
      totalWeight += nextTruck;
      movingQueue.push(nextTruck);
      waitQueue.shift();
    } else {
      movingQueue.push(0);
    }

    if (passedQueue.length === truck_weights.length) {
      break;
    }
  }

  return time;
};
