import { useMemo } from 'react';
import { getQuestionById } from '../services/questionsService';

const useQuestion = (id) => {
  const question = useMemo(() => getQuestionById(id), [id]);
  return { question, loading: false, error: question ? null : 'Question not found' };
};

export default useQuestion;
