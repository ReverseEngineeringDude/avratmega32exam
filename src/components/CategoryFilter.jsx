import React from 'react';
import styles from './CategoryFilter.module.css';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.pill} ${selectedCategory === 'All' ? styles.active : ''}`}
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.pill} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
