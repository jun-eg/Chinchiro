import { Canvas } from '@react-three/fiber';
import styles from './index.module.css';
import DiceScene from './_components/DiceScene/DiceScene';
import { useGameLogic } from './hooks/useGameLogic';

const Home = () => {
  const {
    dicevalues,
    animatinState,
    gameResult,
    playCount,
    dicePosition,
    onClickDice,
    startAnimation,
  } = useGameLogic();

  return (
    <>
      <div className={styles.container}>
        <div>振り数:{playCount}</div>
        <div>出目:{gameResult}</div>
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          {dicePosition.map((position) => (
            <DiceScene
              key={position}
              dicePositionNumber={position}
              diceValues={dicevalues}
              onClickDice={onClickDice}
              startAnimation={startAnimation}
              animationState={animatinState}
            />
          ))}
        </Canvas>
      </div>
    </>
  );
};

export default Home;
