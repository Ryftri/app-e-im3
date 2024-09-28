"use client"

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import { Question } from '@/types/question';

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      "id": 1,
      "title": "Apa ibu kota dari Jepang?",
      "type": "text",
      "content": "Apa ibu kota dari Jepang?",
      "answer": "tokyo",
      "points": 5
    },
    {
      "id": 2,
      "title": "Siapa penulis novel 'Harry Potter'?",
      "type": "text",
      "content": "Siapa penulis novel 'Harry Potter'?",
      "answer": "j.k. rowling",
      "points": 5
    },
    {
      "id": 3,
      "title": "Apa nama planet terbesar di tata surya kita?",
      "type": "text",
      "content": "Apa nama planet terbesar di tata surya kita?",
      "answer": "jupiter",
      "points": 5
    },
    {
      "id": 4,
      "title": "Siapa presiden pertama Indonesia?",
      "type": "text",
      "content": "Siapa presiden pertama Indonesia?",
      "answer": "soekarno",
      "points": 5
    },
    {
      "id": 5,
      "title": "Apa simbol kimia untuk air?",
      "type": "text",
      "content": "Apa simbol kimia untuk air?",
      "answer": "h2o",
      "points": 5
    },
    {
      "id": 6,
      "title": "Apa warna bendera Indonesia?",
      "type": "multiple-choice",
      "content": "Apa warna bendera Indonesia?",
      "options": [
        { "text": "Merah dan Putih", "isCorrect": true },
        { "text": "Biru dan Putih", "isCorrect": false },
        { "text": "Hijau dan Putih", "isCorrect": false },
        { "text": "Merah dan Biru", "isCorrect": false }
      ],
      "points": 10
    },
    {
      "id": 7,
      "title": "Siapa penemu telepon?",
      "type": "multiple-choice",
      "content": "Siapa penemu telepon?",
      "options": [
        { "text": "Thomas Edison", "isCorrect": false },
        { "text": "Alexander Graham Bell", "isCorrect": true },
        { "text": "Nikola Tesla", "isCorrect": false },
        { "text": "Albert Einstein", "isCorrect": false }
      ],
      "points": 10
    },
    {
      "id": 8,
      "title": "Apa ibu kota dari Australia?",
      "type": "multiple-choice",
      "content": "Apa ibu kota dari Australia?",
      "options": [
        { "text": "Sydney", "isCorrect": false },
        { "text": "Melbourne", "isCorrect": false },
        { "text": "Canberra", "isCorrect": true },
        { "text": "Brisbane", "isCorrect": false }
      ],
      "points": 10
    },
    {
      "id": 9,
      "title": "Apa nama unsur kimia dengan simbol 'O'?",
      "type": "multiple-choice",
      "content": "Apa nama unsur kimia dengan simbol 'O'?",
      "options": [
        { "text": "Osmium", "isCorrect": false },
        { "text": "Oxygen", "isCorrect": true },
        { "text": "Gold", "isCorrect": false },
        { "text": "Silver", "isCorrect": false }
      ],
      "points": 10
    },
    {
      "id": 10,
      "title": "Siapa yang menulis 'Romeo and Juliet'?",
      "type": "multiple-choice",
      "content": "Siapa yang menulis 'Romeo and Juliet'?",
      "options": [
        { "text": "Charles Dickens", "isCorrect": false },
        { "text": "William Shakespeare", "isCorrect": true },
        { "text": "Mark Twain", "isCorrect": false },
        { "text": "Jane Austen", "isCorrect": false }
      ],
      "points": 10
    }
  ]
  );

  return (
    <div>
      <h1>Soal</h1>
      <Quiz questions={questions} />
    </div>
  );
};

export default QuizPage;