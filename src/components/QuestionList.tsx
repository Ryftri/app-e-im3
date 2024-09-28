"use client"

import { Question } from '@/types/question';
import { Button, Card } from 'flowbite-react';

const QuestionList = ({ questions, onEdit, onDelete }: { questions: Question[], onEdit: (id: number) => void, onDelete: (id: number) => void }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      {questions.map((question) => (
        <Card key={question.id} className="mb-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Pertanyaan:</h3>
            <pre className="whitespace-pre-wrap">{question.title}</pre>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Konten:</h3>
            <pre className="whitespace-pre-wrap">{question.content}</pre>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => onEdit(question.id)} className="mr-2">Ubah</Button>
            <Button color="failure" onClick={() => onDelete(question.id)}>Hapus</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuestionList;
