import React from 'react';
import styles from './PlayCount.module.css';

type PlayCountProps = {
  playCount: number;
};

const PlayCount: React.FC<PlayCountProps> = ({ playCount }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: playCount }).map((_, index) => (
        <div className={styles.playCountRight} key={index} />
      ))}
    </div>
  );
};

export default PlayCount;
