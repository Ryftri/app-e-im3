"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '../types/question';
import calculateScore from '@/lib/utils/calculateScore';
import { Button, TextInput, Label, Radio, Card } from 'flowbite-react';

const Quiz = ({ questions }: { questions: Question[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = calculateScore(questions, answers);
    router.push(`result-and-evaluation?score=${totalScore}&answers=${encodeURIComponent(JSON.stringify(answers))}`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Soal</h2>
      <Card className="mb-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Soal {currentQuestionIndex + 1}:</h3>
          <pre className="whitespace-pre-wrap">{currentQuestion.title}</pre>
        </div>
        {currentQuestion.type === 'multiple-choice' ? (
          currentQuestion.options?.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <Radio
                id={`question-${currentQuestion.id}-option-${optionIndex}`}
                name={`question-${currentQuestion.id}`}
                value={option.text}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                checked={answers[currentQuestion.id] === option.text}
                required={true}
              />
              <Label htmlFor={`question-${currentQuestion.id}-option-${optionIndex}`} className="ml-2">
                {option.text}
              </Label>
            </div>
          ))
        ) : (
          <TextInput
            type="text"
            placeholder="Your answer"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value.toLowerCase())}
            required={true}
          />
        )}
      </Card>
      <div className="flex justify-between">
        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Kembali
        </Button>
        <Button onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? 'Lanjut' : 'Kirim'}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
