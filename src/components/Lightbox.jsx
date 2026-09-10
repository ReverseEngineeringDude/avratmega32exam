import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Lightbox.module.css';

const Lightbox = ({ imageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Enlarged circuit diagram">
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close lightbox">
        <X size={28} />
      </button>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

export default Lightbox;
