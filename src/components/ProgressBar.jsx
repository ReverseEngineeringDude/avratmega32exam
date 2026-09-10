import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ reviewed = 0, total = 0 }) => {
  const percentage = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Your Progress</span>
        <span className={styles.stats}>{reviewed} of {total} reviewed ({percentage}%)</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

