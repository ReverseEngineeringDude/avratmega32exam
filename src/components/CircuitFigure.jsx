import React, { useState } from 'react';
import { ZoomIn, ImageOff } from 'lucide-react';
import Lightbox from './Lightbox';
import styles from './CircuitFigure.module.css';

const CircuitFigure = ({ imageUrl, alt }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div className={styles.placeholder}>
        <ImageOff size={48} />
        <p>Circuit diagram not available</p>
        <span>Upload a Proteus screenshot to Firebase Storage</span>
      </div>
    );
  }

  return (
    <>
      <figure className={styles.figure}>
        <div
          className={styles.imageWrapper}
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Click to enlarge circuit diagram"
          onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
        >
          <img
            src={imageUrl}
            alt={alt || 'Proteus circuit diagram'}
            className={styles.image}
            loading="lazy"
            onError={() => setHasError(true)}
          />
          <div className={styles.overlay}>
            <ZoomIn size={24} />
            <span>Click to enlarge</span>
          </div>
        </div>
        <figcaption className={styles.caption}>
          Proteus Simulation Circuit Diagram
        </figcaption>
      </figure>

      {isLightboxOpen && (
        <Lightbox
          imageUrl={imageUrl}
          alt={alt || 'Proteus circuit diagram'}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default CircuitFigure;
