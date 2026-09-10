import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <Search className={styles.icon} size={20} />
      <input
        type="text"
        className={styles.input}
        placeholder="Search questions by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
