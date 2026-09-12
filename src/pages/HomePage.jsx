import React, { useState, useMemo } from 'react';
import useQuestions from '../hooks/useQuestions';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { getCategories } from '../services/questionsService';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { questions, loading, error } = useQuestions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterMode, setFilterMode] = useState('Observation');
  const [reviewedQuestions, setReviewedQuestions] = useLocalStorage('reviewed-questions', []);

  
  const fairIndexMap = useMemo(() => {
    const map = {};
    const fairQs = questions.filter(q => q.isFair);
    fairQs.forEach((q, index) => {
      map[q.id] = index + 1;
    });
    return map;
  }, [questions]);

  const categories = useMemo(() => getCategories(), []);

  const filteredQuestions = useMemo(() => {
    let filtered = questions;

    if (filterMode === 'Fair') {
      filtered = filtered.filter((q) => q.isFair);
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(term) ||
          q.problemStatement?.toLowerCase().includes(term) ||
          q.category?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [questions, selectedCategory, searchTerm, filterMode]);

  const toggleReview = (questionId) => {
    setReviewedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      }
      return [...prev, questionId];
    });
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>AVR ATmega32 Exam Prep</h1>
        <p className={styles.subtitle}>
          Master all practical questions for your embedded systems exam.
          Study code, circuits, and viva Q&A — all in one place.
        </p>
      </section>

      <div className={styles.filterToggle}>
        <button 
          className={`${styles.toggleBtn} ${filterMode === 'Observation' ? styles.activeToggle : ''}`}
          onClick={() => setFilterMode('Observation')}
        >
          Observation (All)
        </button>
        <button 
          className={`${styles.toggleBtn} ${filterMode === 'Fair' ? styles.activeToggle : ''}`}
          onClick={() => setFilterMode('Fair')}
        >
          Fair (Selected)
        </button>
      </div>

      {questions.length > 0 && (
        <ProgressBar reviewed={reviewedQuestions.length} total={questions.length} />
      )}

      <div className={styles.controls}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {filteredQuestions.length === 0 ? (
        <div className={styles.empty}>
          {questions.length === 0 ? (
            <p>No questions added yet. Questions will appear here as they are added.</p>
          ) : (
            <>
              <p>No questions found matching your criteria.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredQuestions.map((question) => {
            let customTitle = question.title;
            if (filterMode === 'Fair') {
              const fairNum = fairIndexMap[question.id];
              if (fairNum) {
                customTitle = question.title.replace(/Exp \d+:/, `Exp ${fairNum}:`);
              }
            }

            return (
              <QuestionCard
                key={question.id}
                question={question}
                isReviewed={reviewedQuestions.includes(question.id)}
                onToggleReview={toggleReview}
                displayTitle={customTitle}
                isFairMode={filterMode === 'Fair'}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
