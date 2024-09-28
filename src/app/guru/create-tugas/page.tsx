"use client"

import { useState } from 'react';
import QuestionForm from '@/components/QuestionForm';
import { Question } from '@/types/question';
import Quiz from '@/components/Quiz';
import QuestionList from '@/components/QuestionList';
import EditQuestionForm from '@/components/EditQuestionForm';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleEditQuestion = (id: number) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setEditingQuestion(question);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSaveQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
    setEditingQuestion(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pembuatan Soal</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList questions={questions} onEdit={handleEditQuestion} onDelete={handleDeleteQuestion} />
      {editingQuestion && (
        <EditQuestionForm question={editingQuestion} onSave={handleSaveQuestion} />
      )}
      {/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}
    </div>
  );
};

export default CreateQuiz;
