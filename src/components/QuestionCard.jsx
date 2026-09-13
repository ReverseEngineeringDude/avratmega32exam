import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight, Cpu, BadgeCheck } from 'lucide-react';
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

const QuestionCard = ({ question, isReviewed, onToggleReview, displayTitle, isFairMode }) => {
  const tagColor = categoryColors[question.category] || '#4361ee';
  
  const rawTitle = displayTitle || question.title;
  let expNumber = '';
  let mainTitle = rawTitle;

  const match = rawTitle.match(/^(Exp\s*\d+):?\s*(.*)$/i);
  if (match) {
    expNumber = match[1];
    mainTitle = match[2];
  }

  return (
    <div className={styles.card}>
      <Link to={`/question/${question.id}${isFairMode ? '?mode=fair' : ''}`} className={styles.imageLink}>
        {question.circuitImageUrl ? (
          <div className={styles.imagePreviewWrapper}>
            <img 
              src={question.circuitImageUrl} 
              alt={`${question.title} Circuit`} 
              className={styles.imagePreview} 
              loading="lazy"
            />
          </div>
        ) : (
          <div className={styles.imagePlaceholder}>
             <Cpu size={48} className={styles.placeholderIcon} />
          </div>
        )}
      </Link>

      <div className={styles.cardHeader}>
        <div className={styles.tagsContainer}>
          <span
            className={styles.categoryTag}
            style={{ backgroundColor: `${tagColor}20`, color: tagColor, borderColor: `${tagColor}40` }}
          >
            {question.category}
          </span>
          {expNumber && (
            <span className={styles.expTag}>
              <BadgeCheck size={14} strokeWidth={2.5} />
              {expNumber}
            </span>
          )}
        </div>
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

      <Link to={`/question/${question.id}${isFairMode ? '?mode=fair' : ''}`} className={styles.cardLink}>
        <h3 className={styles.title}>{mainTitle}</h3>
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
