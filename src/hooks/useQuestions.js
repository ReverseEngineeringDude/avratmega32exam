import { useMemo } from 'react';
import { getAllQuestions } from '../services/questionsService';

const useQuestions = () => {
  const questions = useMemo(() => getAllQuestions(), []);
  return { questions, loading: false, error: null };
};

export default useQuestions;
