import React from 'react';
import { Camera } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} AVR ATmega32 Exam Prep. All rights reserved.</p>
        <p className={styles.credit}>
          Created by <a href="https://instagram.com/Red_Byte.sec" target="_blank" rel="noopener noreferrer"><Camera size={14} className={styles.icon} /> Red_Byte.sec</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
