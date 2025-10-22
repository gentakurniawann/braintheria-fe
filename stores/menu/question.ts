import { create } from 'zustand';
import { IQuestionStore } from '@/types';

const useQuestion = create<IQuestionStore>((set) => ({
  // state
  modalAnswer: false,

  // actions
  setModalAnswer: (open) => {
    set({ modalAnswer: open });
  },
}));

export default useQuestion;
