import { alphabet, HangmanLetterValue } from './types';

export const createHangmanMapFromWords = (
  words: string
): Map<string, HangmanLetterValue> => {
  const letterMap = new Map<string, HangmanLetterValue>();
  alphabet
    .split('')
    .forEach((letter) =>
      letterMap.set(letter, { clicked: false, indexes: [] })
    );

  words.split('').forEach((character, position) => {
    if (alphabet.includes(character)) {
      const oldIndexes = letterMap.get(character)?.indexes;
      if (oldIndexes) {
        letterMap.set(character, {
          clicked: false,
          indexes: [...oldIndexes, position],
        });
      }
    }
  });

  return letterMap;
};

export const fisherYates = <T>(arr: T[]) => {
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  let i = arr.length;
  while (--i > 0) {
    const index = Math.floor(Math.random() * (i + 1));
    [arr[index], arr[i]] = [arr[i], arr[index]];
  }
};
