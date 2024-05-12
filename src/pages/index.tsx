import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { Dice } from './@components/DiceScene/DiceScene';
import styles from './index.module.css';

export type AnimationState = 'rest' | 'rolling' | 'drop';

const DideApp = () => {
  const [dicevalues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const startAnimation = async (): Promise<void> => {
    setAnimationState('rolling');
    await sleep(1000);
    setAnimationState('drop');
    await sleep(500);
    setAnimationState('rest');
  };

  const onClickDice = (): { newDiceValues: number[] } => {
    const newDiceValues: number[] = [
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
    ];
    setDiceValues(newDiceValues);

    return { newDiceValues };
  };

  return (
    <>
      <div className={styles.container}>
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          <Dice
            dicePositionNumber={1}
            position={[-3, 0, 0]}
            diceValues={dicevalues}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <Dice
            dicePositionNumber={2}
            position={[0, 0, 0]}
            diceValues={dicevalues}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <Dice
            dicePositionNumber={3}
            position={[3, 0, 0]}
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

export default DideApp;
