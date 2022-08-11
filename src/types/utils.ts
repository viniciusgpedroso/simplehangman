import { alphabet, HangmanLetterValue } from "./types";

export const createHangmanMapFromWords = (
  words: string
): Map<string, HangmanLetterValue> => {
  const letterMap = new Map<string, HangmanLetterValue>();
  alphabet
    .split("")
    .forEach((letter) =>
      letterMap.set(letter, { clicked: false, indexes: [] })
    );

  words.split("").forEach((character, position) => {
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
