import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  // Find prev/next questions
  const currentIndex = allQuestions.findIndex((q) => q.id === id);
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

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
        <h1 className={styles.title}>{question.title}</h1>
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
        <CodeBlock code={question.code} title={`${question.title} — Atmel Studio`} />
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
          <Link to={`/question/${prevQuestion.id}`} className={styles.pageLink}>
            <ChevronLeft size={18} />
            <div>
              <span className={styles.pageLinkLabel}>Previous</span>
              <span className={styles.pageLinkTitle}>{prevQuestion.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextQuestion ? (
          <Link to={`/question/${nextQuestion.id}`} className={`${styles.pageLink} ${styles.pageLinkRight}`}>
            <div>
              <span className={styles.pageLinkLabel}>Next</span>
              <span className={styles.pageLinkTitle}>{nextQuestion.title}</span>
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
