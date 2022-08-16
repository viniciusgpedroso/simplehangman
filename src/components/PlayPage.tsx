import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DecodingResult, IEntry, IProgress, WON_SCORE } from '../types/types';
import Decoder from './Decoder';
import Hangman from './Hangman';
import ProgressBar from './ProgressBar';

const PlayPage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<IEntry | null>(null);
  const [gameState, setGameState] = useState(GameState.STARTING);
  const [score, setScore] = useState<IScore>({ score: 0, maxScore: 0 });
  const [progress, setProgress] = useState<IProgress>({ current: 0, total: 0 });

  const onDecode = (result: DecodingResult) => {
    // TODO: Display Error Toast to User
    console.log(result.decoded);
    if (result.decoded != null && result.decoded.length > 0) {
      const total = result.decoded.length;
      setScore({ score: 0, maxScore: total * WON_SCORE });
      setProgress({ current: 1, total: total });
      setEntries(result.decoded.slice(0, -1));
      setCurrentEntry(result.decoded.slice(-1)[0]);
      setGameState(GameState.PLAYING);
    } else {
      console.log(result.error);
    }
  };

  const onEntryFinished = (score: number) => {
    setScore((prev) => {
      return { ...prev, score: prev.score + score };
    });
    setGameState(GameState.NEXT_GAME);
  };

  const onNext = () => {
    if (entries.length > 0) {
      setCurrentEntry(entries.slice(-1)[0]);
      setEntries(entries.slice(0, -1));
      setGameState(GameState.PLAYING);
      setProgress({ ...progress, current: progress.current + 1 });
    } else {
      setGameState(GameState.OVER);
    }
  };

  return (
    <div className="page">
      <div className="main-area">
        {gameState === GameState.STARTING && <Decoder onDecode={onDecode} />}
        {(gameState === GameState.PLAYING ||
          gameState === GameState.NEXT_GAME) &&
          currentEntry && (
            <Hangman
              key={currentEntry.w}
              onEntryFinished={onEntryFinished}
              currentEntry={currentEntry}
            />
          )}
        {gameState === GameState.NEXT_GAME && (
          <div className="button md-button highlight-button" onClick={onNext}>
            {progress.total === progress.current ? 'Score' : 'Next'}
          </div>
        )}
        {gameState === GameState.OVER && (
          <div>
            <div className="entry-header">
              Score: {score.score} / {score.maxScore}
            </div>
            <div className="button big-button" onClick={() => navigate('home')}>
              Play again
            </div>
          </div>
        )}
        {(gameState === GameState.PLAYING ||
          gameState === GameState.NEXT_GAME) &&
          progress.total > 1 && <ProgressBar progress={progress} />}
      </div>
    </div>
  );
};

enum GameState {
  STARTING = 0,
  PLAYING = 1,
  NEXT_GAME = 2,
  OVER = 3,
}

interface IScore {
  score: number;
  maxScore: number;
}

export default PlayPage;
