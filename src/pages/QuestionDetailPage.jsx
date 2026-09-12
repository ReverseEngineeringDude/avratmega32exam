import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import useQuestion from '../hooks/useQuestion';
import useQuestions from '../hooks/useQuestions';
import useLocalStorage from '../hooks/useLocalStorage';
import CircuitFigure from '../components/CircuitFigure';
import PinConnectionTable from '../components/PinConnectionTable';
import CodeBlock from '../components/CodeBlock';
import CodeExplanationList from '../components/CodeExplanationList';
import ImportantSnippets from '../components/ImportantSnippets';
import VivaAccordion from '../components/VivaAccordion';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import styles from './QuestionDetailPage.module.css';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question, loading, error } = useQuestion(id);
  const { questions: allQuestions } = useQuestions();
  const [reviewedQuestions, setReviewedQuestions] = useLocalStorage('reviewed-questions', []);

  const isReviewed = reviewedQuestions.includes(id);

  const toggleReview = () => {
    setReviewedQuestions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((qid) => qid !== id);
      }
      return [...prev, id];
    });
  };

  const location = useLocation();
  const isFairMode = new URLSearchParams(location.search).get('mode') === 'fair';
  const displayList = isFairMode ? allQuestions.filter(q => q.isFair) : allQuestions;
  
  const currentIndex = displayList.findIndex(q => q.id === id);
  const prevQuestion = currentIndex > 0 ? displayList[currentIndex - 1] : null;
  const nextQuestion = currentIndex < displayList.length - 1 ? displayList[currentIndex + 1] : null;

  let displayTitle = question?.title;
  if (isFairMode && question) {
    displayTitle = question.title.replace(/Exp \d+:/, `Exp ${currentIndex + 1}:`);
  }

  const getLink = (qId) => isFairMode ? `/question/${qId}?mode=fair` : `/question/${qId}`;
  
  const formatTitle = (q, idx) => {
    if (!q) return '';
    if (isFairMode) return q.title.replace(/Exp \d+:/, `Exp ${idx + 1}:`);
    return q.title;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!question) return <ErrorMessage message="Question not found" />;

  return (
    <div className={styles.container}>
      {/* Back link */}
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={18} />
        <span>Back to all questions</span>
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.categoryBadge}>{question.category}</span>
        <h1 className={styles.title}>{displayTitle}</h1>
        <p className={styles.problemStatement}>{question.problemStatement}</p>
        <button
          className={`${styles.reviewToggle} ${isReviewed ? styles.reviewedBtn : ''}`}
          onClick={toggleReview}
        >
          <CheckCircle size={18} />
          {isReviewed ? 'Reviewed ✓' : 'Mark as Reviewed'}
        </button>
      </header>

      {/* Section: Circuit Diagram */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <BookOpen size={20} />
          Circuit Diagram (Proteus)
        </h2>
        <CircuitFigure
          imageUrl={question.circuitImageUrl}
          alt={`Proteus circuit diagram for ${question.title}`}
        />
      </section>

      {/* Section: Pin Connections */}
      <section className={styles.section}>
        <PinConnectionTable pinConnections={question.pinConnections} />
      </section>

      {/* Section: Full Code */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <BookOpen size={20} />
          Complete AVR C Code
        </h2>
        {Array.isArray(question.code) ? (
          <div className={styles.codeGroup}>
            {question.code.map((item, index) => (
              <CodeBlock key={index} code={item.code} title={item.title} />
            ))}
          </div>
        ) : (
          <CodeBlock code={question.code} title={`${question.title} — Atmel Studio`} />
        )}
      </section>

      {/* Section: Code Explanation */}
      <section className={styles.section}>
        <CodeExplanationList explanations={question.codeExplanation} />
      </section>

      {/* Section: Important Snippets */}
      <section className={styles.section}>
        <ImportantSnippets snippets={question.importantCode} />
      </section>

      {/* Section: Viva Questions */}
      <section className={styles.section}>
        <VivaAccordion vivaQuestions={question.vivaQuestions} questionId={id} />
      </section>

      {/* Prev / Next Navigation */}
      <nav className={styles.pagination} aria-label="Question navigation">
        {prevQuestion ? (
          <Link to={getLink(prevQuestion.id)} className={styles.pageLink}>
            <ChevronLeft size={18} />
            <div>
              <span className={styles.pageLinkLabel}>Previous</span>
              <span className={styles.pageLinkTitle}>{formatTitle(prevQuestion, currentIndex - 1)}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextQuestion ? (
          <Link to={getLink(nextQuestion.id)} className={`${styles.pageLink} ${styles.pageLinkRight}`}>
            <div>
              <span className={styles.pageLinkLabel}>Next</span>
              <span className={styles.pageLinkTitle}>{formatTitle(nextQuestion, currentIndex + 1)}</span>
            </div>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Mobile fixed back button */}
      <div className={styles.mobileBack}>
        <Link to="/" className={styles.mobileBackBtn}>
          <ArrowLeft size={18} />
          All Questions
        </Link>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
