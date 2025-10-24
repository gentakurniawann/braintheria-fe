import { create } from 'zustand';

import { IThemeStore } from '@/types';

const useTheme = create<IThemeStore>((set) => ({
  // state
  isLoading: false,
  modalSuccess: {
    open: false,
    title: '',
    message: '',
    actionMessage: 'Ok, Back',
    actionVariant: 'outline',
    animation: 'success',
  },
  modalQuestion: false,

  // actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  setModalSuccess: ({ open, title, message, action, actionMessage, actionVariant, animation }) =>
    set({
      modalSuccess: {
        open,
        title,
        message,
        action,
        actionMessage,
        actionVariant,
        animation,
      },
    }),
  setModalQuestion: (open) => {
    set({ modalQuestion: open });
  },
}));

export default useTheme;
