import { create } from "zustand";
import { IQuestionStore } from "@/types/menu/question";

const useQuestion = create<IQuestionStore>((set) => ({
  // state
  modalAnswer: false,

  // actions
  setModalAnswer: (open) => {
    set({ modalAnswer: open });
  },
}));

export default useQuestion;
