import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: number;
  title: string;
  content: string;
  options: string[];
  correctOptionIndex: number;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
    },
    updateQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter(q => q.id !== action.payload);
    },
  },
});

export const { addQuestion, updateQuestion, deleteQuestion } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;