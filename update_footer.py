import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

footer_jsx = """
import React from 'react';
import { Instagram } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} AVR ATmega32 Exam Prep. All rights reserved.</p>
        <p className={styles.credit}>
          Created by <a href="https://instagram.com/Red_Byte.sec" target="_blank" rel="noopener noreferrer"><Instagram size={14} className={styles.icon} /> Red_Byte.sec</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
"""

footer_css = """
.footer {
  background-color: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.credit {
  font-weight: 500;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.credit a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.credit a:hover {
  color: var(--secondary);
  transform: translateY(-1px);
}

.icon {
  margin-bottom: 1px;
}
"""

replace_file('src/components/Footer.jsx', footer_jsx)
replace_file('src/components/Footer.module.css', footer_css)
