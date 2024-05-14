import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import styles from './index.module.css';
import DiceScene from './_components/DiceScene/DiceScene';

export type AnimationState = 'rest' | 'rolling' | 'drop';

const Home = () => {
  const [dicevalues, setDiceValues] = useState<number[]>([1, 1, 1]);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');
  const [playCount, setPlayCount] = useState<number>(0);
  const [gameResult, setGameresult] = useState<number | string>(0);
  let newDiceValues: [number, number, number] = [0, 0, 0];

  const count = () => {
    const newPlayCount = (playCount % 3) + 1;
    setPlayCount(newPlayCount);
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const confirmResult = (oneDiceValue: number, twoDiceValue: number, threeDiceValue: number) => {
    console.log(oneDiceValue, twoDiceValue, threeDiceValue);

    if (oneDiceValue === twoDiceValue && twoDiceValue === threeDiceValue) {
      if (oneDiceValue === 1) {
        setPlayCount(3);
        return setGameresult('ピンゾロ');
      }
      setPlayCount(3);
      return setGameresult('アラシ');
    }

    if (oneDiceValue === twoDiceValue) {
      setPlayCount(3);
      return setGameresult(threeDiceValue);
    }
    if (oneDiceValue === threeDiceValue) {
      setPlayCount(3);
      return setGameresult(twoDiceValue);
    }
    if (twoDiceValue === threeDiceValue) {
      setPlayCount(3);
      return setGameresult(oneDiceValue);
    }
    if (playCount === 2) {
      setPlayCount(3);
      return setGameresult('目無し');
    }

    setGameresult(0);
  };

  const onClickDice = (): { newDiceValues: number[] } => {
    setGameresult(0);
    newDiceValues = [
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
      Math.floor(Math.random() * 6 + 1),
    ];

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
    confirmResult(newDiceValues[0], newDiceValues[1], newDiceValues[2]);
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
