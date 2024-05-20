import React from 'react';
import styles from './GameResult.module.css';

type GameResultProps = {
  gameResult: string | null;
  Replay: (newGameCount: number, newgameResult: null) => void;
};
const GameResult: React.FC<GameResultProps> = ({ gameResult, Replay }) => {
  return (
    <>
      {gameResult !== null &&
        gameResult.split(',').map((result, index) => (
          <div className={styles.gameResult} key={index} onClick={() => Replay(0, null)}>
            {result}
          </div>
        ))}
    </>
  );
};
export default GameResult;
