export interface IQuestionStore {
  modalAnswer: boolean;
  setModalAnswer: (open: boolean) => void;
}

export interface IQuestion {
  id: number;
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
