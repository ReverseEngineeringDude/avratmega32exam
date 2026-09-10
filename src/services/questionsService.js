import questions from '../data/questions';

export const getAllQuestions = () => {
  return [...questions].sort((a, b) => a.order - b.order);
};

export const getQuestionById = (id) => {
  return questions.find((q) => q.id === id) || null;
};

export const getQuestionsByCategory = (category) => {
  return questions
    .filter((q) => q.category === category)
    .sort((a, b) => a.order - b.order);
};

export const getCategories = () => {
  return [...new Set(questions.map((q) => q.category))];
};
