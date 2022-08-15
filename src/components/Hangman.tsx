import { useEffect, useState } from 'react';
import {
  alphabet,
  HangmanLetterValue,
  IEntry,
  WON_SCORE,
} from '../types/types';
import { createHangmanMapFromWords } from '../types/utils';
import HangmanWord from './HangmanWord';
import heartIcon from '../assets/images/heart-solid.svg';

interface HangmanProps {
  onEntryFinished: (score: number) => void;
  currentEntry: IEntry;
}

const Hangman = (props: HangmanProps) => {
  const [lives, setLives] = useState(STARTING_LIVES);
  const [status, setStatus] = useState(HangmanStatus.ONGOING);
  const [hangman, setHangman] = useState(
    createHangmanMapFromWords(props.currentEntry.w)
  );
  const [showHint, setShowHint] = useState(false);

  const onLetterClicked = (letter: string) => {
    const ind = hangman.get(letter)?.indexes;
    if (ind != undefined) {
      const map = new Map(hangman);
      map.set(letter, { clicked: true, indexes: ind });
      setHangman(map);
    }
    if (ind?.length === 0 && status === HangmanStatus.ONGOING) {
      setLives((prev) => prev - 1);
    }
  };

  const getStatus = () => {
    if (status == HangmanStatus.WIN) {
      return 'YOU WON!';
    } else if (status === HangmanStatus.LOST) {
      return 'YOU LOSE!';
    } else {
      // ♥
      const life = Math.max(0, lives);
      return [...Array(life)].map((e, i) => (
        <img
          src={heartIcon}
          alt="life"
          height="15px"
          key={i}
          className="heart"
        />
      ));
    }
  };

  const letterClassName = (letter: string): string => {
    const clicked = 'letter-clicked';
    const bkg = ' alphabet-letter';
    return hangman.get(letter)?.clicked ? clicked.concat(bkg) : bkg;
  };

  const hintClassName = (hint: string): string => {
    const available = hint.length > 0 && !showHint;
    return available ? 'hint' : 'hint-unavailable';
  };

  useEffect(() => {
    const status = checkStatus(hangman, lives);
    setStatus(status);
    if (status != HangmanStatus.ONGOING) {
      const score = showHint ? WON_SCORE / 2 : WON_SCORE;
      props.onEntryFinished(status === HangmanStatus.WIN ? score : 0);
    }
  }, [hangman, lives]);

  return (
    <div className="hangman">
      <div className="banner">
        <div className="category">{props.currentEntry.c}</div>
        <div>{getStatus()}</div>
      </div>
      <div className="hangman-show">
        {props.currentEntry.w.split(/\s+/gm).map((word, index) => (
          <HangmanWord
            key={index}
            word={word}
            map={hangman}
            showAll={status === HangmanStatus.LOST ? true : false}
          />
        ))}
      </div>
      <div
        className={hintClassName(props.currentEntry.h)}
        onClick={() => setShowHint(true)}
      >
        &#128161;Hint
      </div>
      {showHint && <div className="hint-tip">Hint: {props.currentEntry.h}</div>}
      <div className="alphabet-show">
        {alphabet.split('').map((letter) => (
          <div
            key={letter}
            className={letterClassName(letter)}
            onClick={() => onLetterClicked(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

enum HangmanStatus {
  WIN,
  ONGOING,
  LOST,
}

const STARTING_LIVES = 7;

const checkStatus = (
  hangman: Map<string, HangmanLetterValue>,
  lives: number
): HangmanStatus => {
  if (lives <= 0) return HangmanStatus.LOST;
  let allLettersClicked = true;
  hangman.forEach((value) => {
    if (value.indexes.length > 0 && !value.clicked) allLettersClicked = false;
  });
  if (allLettersClicked) return HangmanStatus.WIN;

  return HangmanStatus.ONGOING;
};

export default Hangman;
