import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import styles from './QuestionCard.module.css';

const categoryColors = {
  'Digital I/O': '#4361ee',
  'Displays': '#7209b7',
  'Input Devices': '#f72585',
  'ADC': '#06d6a0',
  'Communication': '#ff6b35',
  'Timers': '#3a86ff',
  'Motors': '#fb5607',
  'Interrupts': '#8338ec',
};

const QuestionCard = ({ question, isReviewed, onToggleReview }) => {
  const tagColor = categoryColors[question.category] || '#4361ee';

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={styles.categoryTag}
          style={{ backgroundColor: `${tagColor}20`, color: tagColor, borderColor: `${tagColor}40` }}
        >
          {question.category}
        </span>
        <button
          className={`${styles.reviewBtn} ${isReviewed ? styles.reviewed : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleReview(question.id);
          }}
          aria-label={isReviewed ? 'Mark as not reviewed' : 'Mark as reviewed'}
          title={isReviewed ? 'Reviewed ✓' : 'Mark as reviewed'}
        >
          <CheckCircle size={20} />
        </button>
      </div>

      <Link to={`/question/${question.id}`} className={styles.cardLink}>
        <h3 className={styles.title}>{question.title}</h3>
        <p className={styles.statement}>
          {question.problemStatement?.substring(0, 120)}
          {question.problemStatement?.length > 120 ? '...' : ''}
        </p>
        <div className={styles.cardFooter}>
          <span className={styles.viewLink}>
            View Details <ChevronRight size={16} />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default QuestionCard;
