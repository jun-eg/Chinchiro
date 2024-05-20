import { useState } from 'react';
import type { AnimationState } from '../types/gameType';

const useGameLogic = () => {
  const [dicevalues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');
  const [playCount, setPlayCount] = useState<number>(0);
  const [gameResult, setGameresult] = useState<string | null>(null);
  let sortedDiceValues: number[] = [];
  let newPlayCount = 0;
  const diceOfNumber = 3;

  const pointPaterns: { [key: string]: number[][] } = {
    '1': [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
      [1, 5, 5],
      [1, 6, 6],
    ],

    '2': [
      [1, 1, 2],
      [2, 3, 3],
      [2, 4, 4],
      [2, 5, 5],
      [2, 6, 6],
    ],
    '3': [
      [1, 1, 3],
      [2, 2, 3],
      [3, 4, 4],
      [3, 5, 5],
      [3, 6, 6],
    ],
    '4': [
      [1, 1, 4],
      [2, 2, 4],
      [3, 3, 4],
      [4, 5, 5],
      [4, 6, 6],
    ],
    '5': [
      [1, 1, 5],
      [2, 2, 5],
      [3, 3, 5],
      [4, 4, 5],
      [5, 6, 6],
    ],
    '6': [
      [1, 1, 6],
      [2, 2, 6],
      [3, 3, 6],
      [4, 4, 6],
      [5, 5, 6],
    ],

    ピンゾロ: [[1, 1, 1]],
    アラシ: [
      [2, 2, 2],
      [3, 3, 3],
      [4, 4, 4],
      [5, 5, 5],
      [6, 6, 6],
    ],
    シゴロ: [[4, 5, 6]],
    ヒフミ: [[1, 2, 3]],
  };

  const count = () => {
    newPlayCount = (playCount % 3) + 1;
    setPlayCount(newPlayCount);
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const Replay = (newCount: number, newGameResult: null) => {
    setPlayCount(newCount);
    setGameresult(newGameResult);
  };

  const confirmResult = () => {
    const checkDiceValues = (onePointPaternList: number[], key: string) => {
      if (
        sortedDiceValues.every((oneDiceValue, index) => oneDiceValue === onePointPaternList[index])
      ) {
        setGameresult(key);
        setPlayCount(3);
        return;
      }

      if (newPlayCount === 3) {
        setGameresult('目なし');
      }
    };

    for (const key of Object.keys(pointPaterns)) {
      for (const onePointPaternList of pointPaterns[key]) {
        checkDiceValues(onePointPaternList, key);
      }
    }
  };

  const onClickDice = (): { newDiceValues: number[] } => {
    setGameresult(null);
    const newDiceValues = [
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
    ];

    sortedDiceValues = newDiceValues.slice().sort();

    setDiceValues(newDiceValues);
    return { newDiceValues };
  };

  const startAnimation = async (): Promise<void> => {
    setAnimationState('rolling');
    await sleep(1000);
    setAnimationState('drop');
    await sleep(500);
    setAnimationState('rest');
    count();
    confirmResult();
  };

  return {
    dicevalues,
    animatinState,
    gameResult,
    playCount,
    diceOfNumber,
    onClickDice,
    startAnimation,
    Replay,
    setGameresult,
  };
};
export default useGameLogic;
