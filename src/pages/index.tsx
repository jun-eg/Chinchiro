import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import styles from './index.module.css';
import DiceScene from './_components/DiceScene/DiceScene';

export type AnimationState = 'rest' | 'rolling' | 'drop';

const Home = () => {
  const [dicevalues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');
  const [playCount, setPlayCount] = useState<number>(0);
  const [gameResult, setGameresult] = useState<string>();
  let sortedDiceValues: number[] = [];

  const poinrPaterns: { [key: string]: number[][] } = {
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
    const newPlayCount = (playCount % 3) + 1;
    setPlayCount(newPlayCount);
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const confirmResult = () => {
    const checkDiceValues = (onePointPatern: number[], key: string) => {
      if (
        sortedDiceValues[0] === onePointPatern[0] &&
        sortedDiceValues[1] === onePointPatern[1] &&
        sortedDiceValues[2] === onePointPatern[2]
      ) {
        setGameresult(key);
        setPlayCount(3);
        return;
      }
    };

    for (const key of Object.keys(poinrPaterns)) {
      for (const picked of poinrPaterns[key]) {
        checkDiceValues(picked, key);
      }
    }
  };

  const onClickDice = (): { newDiceValues: number[] } => {
    setPlayCount(0);
    setGameresult('0');
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

  return (
    <>
      <div className={styles.container}>
        <div>振り数:{playCount}</div>
        <div>出目:{gameResult}</div>
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          <DiceScene
            dicePositionNumber={1}
            diceValues={dicevalues}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <DiceScene
            dicePositionNumber={2}
            diceValues={dicevalues}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <DiceScene
            dicePositionNumber={3}
            diceValues={dicevalues}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
