import { Canvas } from '@react-three/fiber';
import styles from './index.module.css';
import DiceScene from './_components/DiceScene/DiceScene';
import { useGameLogic } from './hooks/useGameLogic';
import PlayCount from './_components/PlayCount/PlayCount';

const Home = () => {
  const {
    dicevalues,
    animatinState,
    gameResult,
    playCount,
    diceOfNumber,
    onClickDice,
    startAnimation,
  } = useGameLogic();

  return (
    <>
      <div className={styles.container}>
        <PlayCount playCount={playCount} />
        <div>出目:{gameResult}</div>
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          {Array.from({ length: diceOfNumber }).map((_, index) => (
            <DiceScene
              key={index}
              dicePositionNumber={index + 1}
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
