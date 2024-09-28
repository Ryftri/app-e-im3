import { Question } from '@/types/question';

const calculateScore = (questions: Question[], answers: { [key: number]: string }): number => {
  let score = 0;
  questions.forEach((question) => {
    if (question.type === 'multiple-choice') {
      const correctOption = question.options?.find((option) => option.isCorrect);
      if (correctOption && answers[question.id] === correctOption.text) {
        score += question.points;
      }
    } else if (question.type === 'text' && answers[question.id] === question.answer) {
      score += question.points;
    }
  });
  return score;
};

export default calculateScore;
