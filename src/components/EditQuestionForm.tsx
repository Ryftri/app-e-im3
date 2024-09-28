"use client"

import { useState, useEffect } from 'react';
import { Question, QuestionType, Option } from '../types/question';
import { Button, TextInput, Label, Select, Textarea } from 'flowbite-react';

const EditQuestionForm = ({ question, onSave }: { question: Question, onSave: (updatedQuestion: Question) => void }) => {
  const [title, setTitle] = useState(question.title);
  const [type, setType] = useState<QuestionType>(question.type);
  const [content, setContent] = useState(question.content);
  const [options, setOptions] = useState<Option[]>(question.options || []);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(options.findIndex(option => option.isCorrect));
  const [answer, setAnswer] = useState(question.answer || '');
  const [points, setPoints] = useState(question.points);

  useEffect(() => {
    setTitle(question.title);
    setType(question.type);
    setContent(question.content);
    setOptions(question.options || []);
    setCorrectOptionIndex(options.findIndex(option => option.isCorrect));
    setAnswer(question.answer || '');
    setPoints(question.points);
  }, [question]);

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

  const handleSave = () => {
    const newOptions = options.map((option, index) => ({
      ...option,
      isCorrect: index === correctOptionIndex,
    }));

    const updatedQuestion: Question = {
      ...question,
      title,
      type,
      content,
      options: type === 'multiple-choice' ? newOptions : undefined,
      answer: type === 'text' ? answer.toLowerCase() : undefined,
      points,
    };
    onSave(updatedQuestion);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Pertanyaan</h2>
      <div className="mb-4">
        <Label htmlFor="title" value="Soal" />
        <Textarea id="title" placeholder="Soal" value={title} onChange={(e) => setTitle(e.target.value)} required={true} />
      </div>
      <div className="mb-4">
        <Label htmlFor="type" value="Tipe Soal" />
        <Select id="type" value={type} onChange={(e) => setType(e.target.value as QuestionType)}>
          <option value="text">Text</option>
          <option value="multiple-choice">Multiple Choice</option>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="content" value="Konten" />
        <Textarea id="content" placeholder="Konten" value={content} onChange={(e) => setContent(e.target.value)} />
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
            <Label htmlFor="correctOption" value="Correct Option" />
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
      <Button onClick={handleSave}>Save Question</Button>
    </div>
  );
};

export default EditQuestionForm;
