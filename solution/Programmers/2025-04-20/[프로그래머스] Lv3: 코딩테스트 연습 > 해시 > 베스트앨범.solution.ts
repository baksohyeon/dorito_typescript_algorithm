export default function solution(genres: string[], plays: number[]) {
  // 장르별 총 재생 횟수를 계산
  const genrePlayTotal = new Map<string, number>();

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];
    genrePlayTotal.set(genre, (genrePlayTotal.get(genre) || 0) + play);
  }

  // 장르별 총 재생 횟수 기준으로 내림차순 정렬
  const genreRank = [...genrePlayTotal.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  // 각 노래의 정보 (장르, 재생 횟수, 고유 번호)를 저장
  const songs: Array<[string, number, number]> = [];
  for (let i = 0; i < genres.length; i++) {
    songs.push([genres[i], plays[i], i]);
  }

  // 결과 배열
  const answer: number[] = [];

  // 장르별로 가장 많이 재생된 노래를 최대 2개씩 선택
  for (const genre of genreRank) {
    const genreSongs = songs
      .filter(song => song[0] === genre)
      .sort((a, b) => {
        // 재생 횟수가 같으면 고유 번호가 낮은 노래를 먼저 수록
        if (a[1] === b[1]) {
          return a[2] - b[2];
        }
        // 재생 횟수가 많은 노래를 먼저 수록
        return b[1] - a[1];
      });

    // 해당 장르의 노래를 최대 2개까지 결과에 추가
    for (let i = 0; i < Math.min(2, genreSongs.length); i++) {
      answer.push(genreSongs[i][2]);
    }
  }

  return answer;
}