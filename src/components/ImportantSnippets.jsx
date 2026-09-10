import React from 'react';
import { Code } from 'lucide-react';
import styles from './ImportantSnippets.module.css';

const ImportantSnippets = ({ snippets }) => {
  if (!snippets || snippets.length === 0) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Important Code Snippets</h3>
      <div className={styles.grid}>
        {snippets.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              <Code size={16} />
            </div>
            <code className={styles.snippet}>{item.snippet}</code>
            <p className={styles.note}>{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImportantSnippets;
