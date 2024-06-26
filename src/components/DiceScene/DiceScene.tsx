import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { useState } from 'react';
import { TextureLoader, type Mesh } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import type { AnimationState } from '../../types/gameType';

type DiceProps = {
  dicePositionNumber: number;
  diceValues: number[];
  animationState: AnimationState;

  onClickDice: () => { newDiceValues: number[] };
  startAnimation: () => void;
};

const diceValuePosition = [
  { x: 0, y: -0.5 * Math.PI, z: 1 }, //1
  { x: -0.8 * Math.PI, y: 0, z: 0 }, //2
  { x: -1, y: 0, z: 0 }, //3
  { x: -1, y: Math.PI, z: 0 }, //4
  { x: 0.2 * Math.PI, y: 0, z: 0 }, //5
  { x: 0, y: 0.5 * Math.PI, z: -1 }, //6
];

const DiceScene: React.FC<DiceProps> = ({
  diceValues,
  onClickDice,
  startAnimation,
  animationState,
  dicePositionNumber,

  ...restProps
}) => {
  const group = useLoader(FBXLoader, './models/dice.fbx');
  const texture = useLoader(TextureLoader, './models/dice.png');
  const mesh = group.children[0] as Mesh;
  const geometry = mesh.geometry;
  const [hovered, setHover] = useState<boolean>(false);
  let newDiceValues: number[] = diceValues;

  return (
    <motion.mesh
      {...restProps}
      scale={hovered ? 1 : 1 / 1.2}
      geometry={geometry}
      position={[(dicePositionNumber - 2) * 3, 0, 0]}
      onClick={(): void => {
        if (animationState === 'rest') {
          const clickedResult = onClickDice();
          setHover(false);
          startAnimation();
          newDiceValues = clickedResult.newDiceValues;
        }
      }}
      rotation={[
        diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].x,
        diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].y,
        diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].z,
      ]}
      animate={animationState}
      onPointerOver={() => {
        if (animationState === 'rest') {
          setHover(true);
        }
      }}
      onPointerOut={() => setHover(false)}
      variants={{
        rest: {
          y: 0,
          rotateX: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].x,
          rotateY: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].y,
          rotateZ: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].z,
        },
        rolling: {
          y: 2.5,
          rotateX: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].x + 2 * Math.PI,
          rotateY: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].y + 2 * Math.PI,
          rotateZ: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].z + 2 * Math.PI,
          transition: {
            y: {
              ease: 'circOut',
            },
            rotateX: {
              duration: 0.2,
              ease: 'linear',
              repeat: Infinity,
            },
            rotateY: {
              duration: 0.1,
              ease: 'linear',
              repeat: Infinity,
            },
            rotateZ: {
              duration: 0.3,
              ease: 'linear',
              repeat: Infinity,
            },
          },
        },
        drop: {
          y: -1,
          rotateX: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].x,
          rotateY: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].y,
          rotateZ: diceValuePosition[newDiceValues[dicePositionNumber - 1] - 1].z,
          transition: {
            rotation: {
              duration: 0.1,
            },
            y: {
              duration: 0.5,
              ease: 'circIn',
            },
          },
        },
      }}
    >
      {/* colorは6進数指定でないとバグる */}
      <meshPhysicalMaterial map={texture} color={hovered ? '#c6c6c6' : '#a8a8a8'} />
    </motion.mesh>
  );
};

export default DiceScene;
