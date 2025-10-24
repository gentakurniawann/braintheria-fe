import { ApiResponse } from '../global/api';

export type QuestionListResponse = ApiResponse<IQuestion[]>;
export type QuestionDetailResponse = ApiResponse<IQuestion>;

export interface IQuestionStore {
  modalAnswer: boolean;
  setModalAnswer: (open: boolean) => void;
}

type Author = {
  id: string;
  name: string;
  email: string;
  primaryWallet: string;
};

export interface IQuestion {
  id: number;
  author: Author;
  authorId: number;
  title: string;
  bodyMd: string;
  ipfsCid: string;
  contentHash: string;
  status: 'Open' | 'Verified' | 'Cancelled';
  chainQId: number;
  txHash: string;
  bountyAmountWei: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionPayload {
  title?: string;
  bodyMd: string;
  bounty: string;
  token: string;
}

export interface IAnswer {
  questionId: number;
  total: number;
  answers: {
    id: number;
    questionId: number;
    authorId: number;
    bodyMd: string;
    ipfsCid: string;
    contentHash: string;
    isBest: boolean;
    chainAId: number;
    createdAt: string;
    author: Iauthor;
  }[];
}

export interface Iauthor {
  id: number;
  email: string;
  primaryWallet: string;
}
