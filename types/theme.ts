// Theme type
interface IModalSuccess {
  open: boolean;
  title: string;
  message: string;
  actionMessage?: string;
  actionVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  animation?: 'login' | 'success';
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
type Data<T = unknown> = T | null;
export type Meta = {
  pagination: Pagination;
};
interface Pagination {
  total: number;
  count: number;
  page_size: number;
  current_page: number;
  total_pages: number;
  links?: { next: string | null; previous: string | null };
}

export interface Response<T = unknown> {
  data: Data<T>;
  meta: Meta;
}

export type TResponseMessage = {
  message: string;
};

export type TSearchParams = {
  search?: string;
  page?: number;
  page_size?: number;
};
