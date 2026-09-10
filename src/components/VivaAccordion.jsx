import React, { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import styles from './VivaAccordion.module.css';

const VivaAccordion = ({ vivaQuestions, questionId }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [memorized, setMemorized] = useState(() => {
    try {
      const stored = localStorage.getItem(`viva-memorized-${questionId}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMemorized = (index) => {
    const updated = { ...memorized, [index]: !memorized[index] };
    setMemorized(updated);
    try {
      localStorage.setItem(`viva-memorized-${questionId}`, JSON.stringify(updated));
    } catch {
      // localStorage full or unavailable
    }
  };

  if (!vivaQuestions || vivaQuestions.length === 0) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Viva / Oral Exam Questions</h3>
      <div className={styles.list}>
        {vivaQuestions.map((item, index) => (
          <div key={index} className={`${styles.item} ${openIndex === index ? styles.open : ''}`}>
            <button
              className={styles.question}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`viva-answer-${index}`}
            >
              <span className={styles.qNumber}>Q{index + 1}</span>
              <span className={styles.qText}>{item.q}</span>
              <ChevronDown size={18} className={styles.chevron} />
            </button>
            {openIndex === index && (
              <div className={styles.answer} id={`viva-answer-${index}`} role="region">
                <p>{item.a}</p>
                <label className={styles.memorizeLabel}>
                  <input
                    type="checkbox"
                    checked={!!memorized[index]}
                    onChange={() => toggleMemorized(index)}
                    className={styles.checkbox}
                  />
                  <CheckCircle size={16} className={memorized[index] ? styles.memorizedIcon : styles.notMemorizedIcon} />
                  <span>{memorized[index] ? 'Memorized' : 'Mark as memorized'}</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VivaAccordion;
