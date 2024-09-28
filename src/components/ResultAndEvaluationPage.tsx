"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '../types/question';
import { Button, Card } from 'flowbite-react';

const ResultAndEvaluationPage = ({ questions, answersQuery, scoreQuery }: { questions: Question[]; answersQuery: string; scoreQuery: number }) => {
  const score = Number(scoreQuery);
  const answers = answersQuery;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToQuiz = () => {
    router.push('/');
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nilai/Poin: {score}</h2>
      <Card className="mb-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Soal {currentQuestionIndex + 1}:</h3>
          <pre className="whitespace-pre-wrap">{currentQuestion.title}</pre>
        </div>
        <div className="mb-2">
          <h4 className="font-semibold">Jawaban Anda:</h4>
          <p className={answers[currentQuestion.id] === (currentQuestion.type === 'multiple-choice' ? currentQuestion.options?.find(option => option.isCorrect)?.text : currentQuestion.answer) ? 'text-green-600' : 'text-red-600'}>
            {answers[currentQuestion.id]}
          </p>
        </div>
        <div className="mb-2">
          <h4 className="font-semibold">Jawaban Benar:</h4>
          <p>{currentQuestion.type === 'multiple-choice' ? currentQuestion.options?.find(option => option.isCorrect)?.text : currentQuestion.answer}</p>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Kembali
        </Button>
        <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Lanjut
        </Button>
      </div>
      <Button onClick={handleBackToQuiz} className="mt-4">Kembali ke Soal</Button>
    </div>
  );
};

export default ResultAndEvaluationPage;
