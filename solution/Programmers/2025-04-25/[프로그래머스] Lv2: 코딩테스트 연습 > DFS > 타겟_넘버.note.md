# 알고리즘 문제 해결

link: https://school.programmers.co.kr/learn/courses/30/lessons/43165

## 문제 이해

- 요약
  - 주어진 숫자 배열의 각 숫자를 더하거나 빼서 타겟 넘버를 만들 수 있는 경우의 수를 구하는 문제
  - 모든 숫자는 한 번씩만 사용해야 함

## 접근 방법

- 초기 접근

  - DFS를 사용하여 모든 가능한 조합을 탐색
  - visited 배열을 사용하여 방문 체크를 시도했으나 불필요했음
  - 재귀 호출의 종료 조건이 잘못되어 무한 재귀 발생

- 대안적 접근
  - visited 배열 제거
  - 단순화된 재귀 함수 구현
  - 명확한 종료 조건 설정

## 코드 구현

### 구현 과정 요약

1. 첫 번째 시도:

   ```typescript
   export function solution(numbers: number[], target: number) {
     // 문제점 1: 전역 변수로 결과를 관리하는 것은 불필요한 복잡성
     let result = 0;
     // 문제점 2: visited 배열은 이 문제에서 불필요함
     const visited = new Array(numbers.length).fill(false);

     // 문제점 3: count 매개변수는 실제로 사용되지 않음
     const dfs = (currentIdx: number, currentSum: number, count: number) => {
       // 문제점 4: 방문 체크 로직이 불필요하며, 일부 경로를 누락시킴
       if (!visited[currentIdx]) {
         visited[currentIdx] = true;
         const currentNumber = numbers[currentIdx];
         // 문제점 5: 재귀 호출의 결과를 더하는 방식이 잘못됨
         // 문제점 6: result 변수에 재귀 호출의 결과를 더하는 것은 무한 재귀 발생 가능
         result =
           dfs(currentIdx + 1, currentSum + currentNumber, count) +
           dfs(currentIdx + 1, currentSum - currentNumber, count);
       }

       // 문제점 7: 종료 조건이 너무 늦게 체크되어 배열 범위를 벗어날 수 있음
       if (currentIdx > numbers.length) {
         return count;
       }

       // 문제점 8: 상태 복원이 종료 조건 이후에 실행되어 불필요한 상태 변경 발생
       visited[currentIdx] = false;

       // 문제점 9: count를 반환하지만 실제로는 result를 사용하여 일관성 없음
       return count;
     };

     // 문제점 10: 초기 호출 시 result를 전달하는 것은 불필요함
     return dfs(0, 0, result);
   }
   ```

- 처음 시도했던 풀이의 문제점

  1. 불필요한 복잡성

     - visited 배열을 사용하여 방문 체크를 했지만, 이 문제에서는 각 숫자를 한 번씩만 사용하면 되므로 불필요했음
     - 결과값을 재귀 호출의 반환값으로 누적하려 했으나, 이는 불필요한 복잡성을 초래
     - `result` 변수를 전역으로 관리하면서 재귀 호출의 결과를 더하는 방식이 복잡함
     - `count` 매개변수를 전달하지만 실제로 사용하지 않아 불필요한 매개변수 전달

  2. 재귀 함수 설계의 오류

     - 종료 조건이 `currentIdx > numbers.length`로 설정되어 있어 배열 범위를 벗어나는 문제 발생
     - 재귀 호출의 결과를 더하는 방식이 잘못되어 무한 재귀 발생
     - `result` 변수에 재귀 호출의 결과를 더하는 방식이 잘못됨
     - `count` 매개변수가 실제로 사용되지 않음
     - 재귀 함수의 반환값이 일관되지 않음 (count를 반환하지만 실제로는 result를 사용)

  3. 상태 관리의 비효율성

     - visited 배열의 상태를 변경하고 복원하는 과정이 불필요한 오버헤드 발생
     - 전역 변수 count를 사용하는 것이 더 효율적이었음
     - `visited[currentIdx] = false`가 종료 조건 이후에 실행되어 불필요한 상태 변경 발생
     - 상태 변경과 복원의 타이밍이 잘못되어 일부 경로가 제대로 탐색되지 않음

  4. 로직 오류

     - `if (!visited[currentIdx])` 조건으로 인해 일부 경로가 탐색되지 않음
     - `currentIdx > numbers.length` 조건이 너무 늦게 체크되어 배열 범위를 벗어나는 문제 발생
     - 재귀 호출의 결과를 더하는 방식이 잘못되어 무한 재귀 발생
     - 방문 체크 로직이 재귀 호출 전에 실행되어 일부 경로가 누락됨
     - 상태 복원이 종료 조건 이후에 실행되어 불필요한 상태 변경 발생

2. 두 번째 시도:

   ```typescript
   function solution(numbers: number[], target: number) {
     // 문제점 1: visited 배열은 여전히 불필요함
     const visited = new Array(numbers.length).fill(false);
     // 문제점 2: count를 전역 변수로 선언했지만 재귀 함수에서 매개변수로도 전달
     let count = 0;

     // 문제점 3: 매개변수가 너무 많음 (visited, sum, count, depth)
     const dfs = (
       visited: boolean[],
       sum: number,
       count: number,
       depth: number
     ) => {
       // 종료 조건 확실하게끔 개선함
       if (depth === numbers.length && sum === target) {
         return count + 1;
       }

       // 문제점 4: 불필요한 종료 조건 (depth > numbers.length)
       if (depth > numbers.length) {
         return count;
       }

       // 문제점 5: 여전히 불필요한 방문 체크
       if (!visited[depth]) {
         visited[depth] = true;
         const num = numbers[depth];

         // 문제점 6: count 변수에 재귀 호출 결과를 더하는 방식이 복잡함
         count =
           dfs(visited, sum + num, count, depth + 1) +
           dfs(visited, sum - num, count, depth + 1);
         // 문제점 7: 상태 복원이 조건문 안에서만 실행됨
         visited[depth] = false;
       }
       return count;
     };

     // 문제점 8: 불필요한 매개변수 전달 (visited, count)
     return dfs(visited, 0, count, 0);
   }
   ```

---

### 최종 구현 코드:

```typescript
export function solution(numbers: number[], target: number) {
  let count = 0;

  const dfs = (currentIdx: number, currentSum: number) => {
    // 개선점 1: 명확한 종료 조건
    if (currentIdx === numbers.length) {
      if (currentSum === target) count++;
      return;
    }
    // 개선점 2: 단순화된 재귀 호출
    dfs(currentIdx + 1, currentSum + numbers[currentIdx]);
    dfs(currentIdx + 1, currentSum - numbers[currentIdx]);
  };

  dfs(0, 0);
  return count;
}
```

- 어려웠던 점
  - 재귀 함수의 종료 조건을 잘못 설정하여 무한 재귀 발생
  - 불필요한 방문 체크로 인한 코드 복잡성 증가
  - 결과값 누적 방식의 오류

## 코드 리뷰 및 개선

- 개선 가능 부분
  1. 재귀 함수의 매개변수 단순화
  2. 불필요한 visited 배열 제거
  3. 명확한 종료 조건 설정
  4. 전역 변수 count를 사용한 결과 누적

## 회고

- 개선 과정

  1. 첫 번째 시도 → 두 번째 시도

     - 종료 조건이 더 명확해짐
     - 매개변수 구조가 개선됨
     - 여전히 불필요한 visited 배열 사용

  2. 두 번째 시도 → 최종 구현
     - visited 배열 제거
     - 매개변수 최소화
     - 전역 변수 count 활용
     - 불필요한 종료 조건 제거
     - 코드 단순화

- 배운 점

  1. DFS 구현 시 불필요한 상태 관리 피하기 (특히 전역 변수 사용 피하기)
  2. 재귀 함수의 종료 조건 확실하게 잡고가자.
  3. 문제의 요구사항을 정확히 파악하고 필요한 로직만 구현
  4. 재귀 함수의 매개변수는 필요한 것만 전달해서 최적화하기
