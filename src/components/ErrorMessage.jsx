import React from 'react';
import { RefreshCw } from 'lucide-react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message || 'An unexpected error occurred.'}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
