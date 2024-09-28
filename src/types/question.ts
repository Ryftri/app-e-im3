export type QuestionType = 'multiple-choice' | 'text';

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  content: string;
  options?: Option[];
  answer?: string;
  points: number;
}
