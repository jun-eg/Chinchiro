import React from 'react';
import styles from './GameResult.module.css';
import { useGameLogic } from '../../hooks/useGameLogic';

type GameResultProps = {
  gameResult: string | null;
};
const GameResult: React.FC<GameResultProps> = ({ gameResult }) => {
  const { updatePlayCount } = useGameLogic();
  return (
    <div className={styles.container}>
      {gameResult !== null &&
        gameResult.split(',').map((result, index) => (
          <div className={styles.gameResult} key={index} onClick={() => updatePlayCount(0)}>
            {result}
          </div>
        ))}
    </div>
  );
};
export default GameResult;
