// Theme type
interface IModalSuccess {
  open: boolean;
  title: string;
  message: string;
  actionMessage?: string;
  actionVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  animation?: "login" | "success";
  action?: () => void;
}

export interface IThemeStore {
  isLoading: boolean;
  modalSuccess: IModalSuccess;
  modalQuestion: boolean;
  setLoading: (loading: boolean) => void;
  setModalSuccess: (params: IModalSuccess) => void;
  setModalQuestion: (open: boolean) => void;
}

// Response type
export type TResponseMessage = {
  message: string;
};
