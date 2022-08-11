import { HangmanLetterValue, IEntry } from "../types/types";
import { alphabet } from "../types/types";

interface HangmanWordProps {
  word: string;
  map: Map<string, HangmanLetterValue>;
  showAll: boolean;
}

const HangmanWord = (props: HangmanWordProps) => {
  return (
    <div className="hangman-word">
      {props.word.split("").map((letter, index) => {
        if (alphabet.includes(letter)) {
          const clicked = props.map.get(letter)?.clicked;
          const classname = clicked ? "hangman-letter" : "hangman-letter wrong";
          return (
            <div key={index} className={classname}>
              {(clicked || props.showAll) && letter}
            </div>
          );
        } else {
          return (
            <div key={index} className="hangman-letter hangman-letter-show">
              {letter}
            </div>
          );
        }
      })}
    </div>
  );
};

export default HangmanWord;
