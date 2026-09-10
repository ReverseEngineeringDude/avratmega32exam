import React from 'react';
import styles from './CodeExplanationList.module.css';

const CodeExplanationList = ({ explanations }) => {
  if (!explanations || explanations.length === 0) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Code Explanation</h3>
      <ol className={styles.list}>
        {explanations.map((item, index) => (
          <li key={index} className={styles.item}>
            <code className={styles.code}>{item.line}</code>
            <p className={styles.explanation}>{item.explanation}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CodeExplanationList;
