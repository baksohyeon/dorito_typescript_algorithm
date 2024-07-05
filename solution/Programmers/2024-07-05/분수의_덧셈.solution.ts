export default function solution(
  numer1: number,
  denom1: number,
  numer2: number,
  denom2: number
): [number, number] {
  const numerator = numer1 * denom2 + numer2 * denom1;
  const denominator = denom1 * denom2;
  const range = Math.min(numerator, denominator);
  // 최대 공약수 어캐 구하더라
  let greatestCommonDenom = 1;
  for (let i = 1; i <= range; i++) {
    if (numerator % i === 0 && denominator % i === 0) {
      greatestCommonDenom = i;
    }
  }

  console.log({ greatestCommonDenom });
  return [numerator / greatestCommonDenom, denominator / greatestCommonDenom];
}

// 1 2 5 10
// 1 2 4 8
// 10 8
// 5 4
// 최대 공약수 나눠야함
