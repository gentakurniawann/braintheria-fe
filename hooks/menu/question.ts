import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getQuestionsList,
  getMyQuestions,
  getAnswerList,
  createQuestion,
} from '@/services/menu/question';
import { IQuestionPayload } from '@/types';

export function useGetQuestionsList(params?: {
  keyword?: string;
  page?: number;
  status?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['questions', params],
    queryFn: () => getQuestionsList(params),
  });
}

export function useGetMyQuestions() {
  return useQuery({
    queryKey: ['my-questions'],
    queryFn: () => getMyQuestions(),
  });
}

export function useCreateQuestion() {
  return useMutation({
    mutationFn: (data: IQuestionPayload) => createQuestion(data),
  });
}

export function useGetAnswerList(questionId: number) {
  return useQuery({
    queryKey: ['answer-list', questionId],
    queryFn: () => getAnswerList(questionId),
  });
}
