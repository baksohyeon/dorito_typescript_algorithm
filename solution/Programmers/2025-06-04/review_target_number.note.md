# 알고리즘 문제 해결

link: https://school.programmers.co.kr/learn/courses/30/lessons/43165

## 문제 이해

- 핵심 요구사항
  - n개의 음이 아닌 정수들이 주어질 때, 각 수 앞에 +나 -를 붙여서 계산한 결과가 target number와 같아지는 방법의 수를 구하기
  - 모든 수를 사용해야 함
- 제약조건
  - 사용할 수 있는 숫자의 개수는 2개 이상 20개 이하
  - 각 숫자는 1 이상 1000 이하
  - 타겟 넘버는 1 이상 1000 이하

## 접근 방법

- 핵심 아이디어
  - DFS(깊이 우선 탐색)를 사용하여 모든 경우의 수를 탐색
  - 각 숫자에 대해 +와 - 두 가지 선택지가 있으므로 2^n가지 경우의 수 존재
  - 재귀적으로 각 인덱스에서 현재 숫자를 더하거나 빼는 두 가지 선택을 모두 시도
  - 마지막 인덱스에 도달했을 때 현재 합이 target과 같으면 count 증가
- 시간/공간 복잡도
  - 시간 복잡도: O(2^n) - 각 숫자마다 2가지 선택지가 있음
  - 공간 복잡도: O(n) - 재귀 호출 스택의 깊이

## 코드

```typescript
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
```

## 회고

- 배운 점
  - DFS를 활용한 완전 탐색 문제의 전형적인 패턴을 학습
  - 재귀 함수에서 basecase(종료 조건)와 recursive case를 명확히 구분하는 것의 중요성
  - 모든 경우의 수를 탐색해야 하는 문제에서 DFS가 효과적임을 확인
- 다음에 비슷한 문제를 만났을 때
  - 완전 탐색이 필요한 문제인지 먼저 판단 (제약 조건 확인)
  - 각 단계에서 선택할 수 있는 옵션들을 명확히 정의
  - 메모이제이션을 활용한 최적화 방법도 고려해볼 것 (DP 활용 가능)
  - 더 효율적인 수학적 접근법이 있는지도 검토
