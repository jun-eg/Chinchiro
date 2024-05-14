import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import styles from './index.module.css';
import DiceScene from './_components/DiceScene/DiceScene';

export type AnimationState = 'rest' | 'rolling' | 'drop';

const Home = () => {
  const [dicevalues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');
  const [playCount, setPlayCount] = useState<number>(0);
  const [gameResult, setGameresult] = useState<number>();
  let newDiceValues: [number, number, number] = [0, 0, 0];

  const count = () => {
    const newPlayCount = (playCount + 1) % 4;
    setPlayCount(newPlayCount);
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const confirmResult = (oneDiceVqalu: number, twoDiceValu: number, threeDiceValue: number) => {
    if (oneDiceVqalu === twoDiceValu) {
      setPlayCount(3);
      return threeDiceValue;
    }
    if (oneDiceVqalu === threeDiceValue) {
      setPlayCount(3);
      return twoDiceValu;
    }
    if (twoDiceValu === threeDiceValue) {
      setPlayCount(3);
      return oneDiceVqalu;
    }
    return 0;
  };

  const onClickDice = (): { newDiceValues: number[] } => {
    setGameresult(0);
    newDiceValues = [
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
    ];

    count();
    setDiceValues(newDiceValues);
    return { newDiceValues };
  };

  const startAnimation = async (): Promise<void> => {
    setAnimationState('rolling');
    await sleep(1000);
    setAnimationState('drop');
    await sleep(500);
    setAnimationState('rest');
    setGameresult(confirmResult(newDiceValues[0], newDiceValues[1], newDiceValues[2]));
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
