export const solution = (babbling: string[]) => {
  const availableWords = ["aya", "ye", "woo", "ma"];
  const set = new Set(availableWords);

  const regex = new RegExp(`(${availableWords.join("|")})`, "g");

  const wordList = babbling.map((word) => {
    return word.split(regex).filter((elem) => elem !== "");
  });

  return wordList.reduce((acc, cur) => {
    const isRightComposedWord = cur.every((elem) => set.has(elem));

    if (!isRightComposedWord) {
      return acc;
    }

    const continuousWordCount = cur.reduce((count, currentWord, index) => {
      if (cur[index + 1] === currentWord) {
        return count + 1;
      }

      return count;
    }, 0);

    if (continuousWordCount === 0) {
      return acc + 1;
    }
    return acc;
  }, 0);
};
