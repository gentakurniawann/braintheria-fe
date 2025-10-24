import { create } from 'zustand';
import { IQuestion } from '@/types';

interface IQuestionStore {
  modalAnswer: boolean;
  questions: IQuestion[];
  setModalAnswer: (open: boolean) => void;
  setQuestions: (questions: IQuestion[]) => void;
}

const useQuestion = create<IQuestionStore>((set) => ({
  // state
  modalAnswer: false,
  questions: [],

  // actions
  setModalAnswer: (open) => set({ modalAnswer: open }),
  setQuestions: (questions) => set({ questions }),
}));

export default useQuestion;
