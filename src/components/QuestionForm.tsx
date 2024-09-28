"use client"

import { useState } from 'react';
import { Question, QuestionType, Option } from '../types/question';
import { Button, TextInput, Label, Select, Textarea } from 'flowbite-react';

const QuestionForm = ({ onAddQuestion }: { onAddQuestion: (question: Question) => void }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<QuestionType>('text');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);

  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleOptionChange = (index: number, field: keyof Option, value: string | boolean) => {
    const newOptions = [...options];
    newOptions[index][field] = value as never;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctOptionIndex === index) {
      setCorrectOptionIndex(null);
    } else if (correctOptionIndex !== null && correctOptionIndex > index) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const newOptions = options.map((option, index) => ({
      ...option,
      isCorrect: index === correctOptionIndex,
    }));

    const newQuestion: Question = {
      id: Date.now(),
      title,
      type,
      content,
      options: type === 'multiple-choice' ? newOptions : undefined,
      answer: type === 'text' ? answer.toLowerCase() : undefined,
      points,
    };
    onAddQuestion(newQuestion);
    // Reset form
    setTitle('');
    setType('text');
    setContent('');
    setOptions([]);
    setCorrectOptionIndex(null);
    setAnswer('');
    setPoints(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tambah Pertanyaan</h2>
      <div className="mb-4">
        <Label htmlFor="pertanyaan" value="Pertanyaan" />
        <Textarea id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required={true} />
      </div>
      <div className="mb-4">
        <Label htmlFor="type" value="Tipe" />
        <Select id="type" value={type} onChange={(e) => setType(e.target.value as QuestionType)}>
          <option value="text">Text</option>
          <option value="multiple-choice">Multiple Choice</option>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="content" value="Konten" />
        <Textarea id="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      {type === 'multiple-choice' && (
        <div className="mb-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <TextInput
                type="text"
                placeholder="Option Text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                className="mr-2"
                required={true}
              />
              <Button color="failure" onClick={() => handleRemoveOption(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={handleAddOption}>Tambah Opsi</Button>
          <div className="mt-4">
            <Label htmlFor="correctOption" value="Jawaban Benar" />
            <Select
              id="correctOption"
              value={correctOptionIndex !== null ? correctOptionIndex : ''}
              onChange={(e) => setCorrectOptionIndex(Number(e.target.value))}
            >
              <option value="" disabled>Pilih Jawaban Benar</option>
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {option.text}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}
      {type === 'text' && (
        <div className="mb-4">
          <Label htmlFor="answer" value="Jawaban" />
          <TextInput id="answer" type="text" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value.toLowerCase())} required={true} />
        </div>
      )}
      <div className="mb-4">
        <Label htmlFor="points" value="Nilai/Poin" />
        <TextInput id="points" type="number" placeholder="Points" value={points} onChange={(e) => setPoints(Number(e.target.value))} required={true} />
      </div>
      <Button onClick={handleSubmit}>Tambah Pertanyaan</Button>
    </div>
  );
};

export default QuestionForm;
