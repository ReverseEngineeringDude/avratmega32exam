import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className={styles.controls}>
                <button onClick={() => zoomIn()} title="Zoom In" aria-label="Zoom in">
                  <ZoomIn size={20} />
                </button>
                <button onClick={() => zoomOut()} title="Zoom Out" aria-label="Zoom out">
                  <ZoomOut size={20} />
                </button>
                <button onClick={() => resetTransform()} title="Reset Zoom" aria-label="Reset zoom">
                  <Maximize size={20} />
                </button>
              </div>
              <TransformComponent wrapperClass={styles.transformWrapper} contentClass={styles.transformContent}>
                <img src={imageUrl} alt={alt} className={styles.image} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Lightbox;
