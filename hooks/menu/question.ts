import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getQuestionsList,
  getMyQuestions,
  getAnswerList,
  createQuestion,
  getDetailQuestions,
} from '@/services/menu/question';
import { IQuestionPayload, QuestionListResponse } from '@/types';

export function useGetQuestionsList(params?: {
  keyword?: string;
  page?: number;
  status?: string;
  limit?: number;
}) {
  return useQuery<QuestionListResponse, Error>({
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

export function useGetDetailQuestion(id: string, options?: object) {
  return useQuery({
    queryKey: ['question-detail', id],
    queryFn: () => getDetailQuestions(id),
    ...options,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IQuestionPayload) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });
    },
  });
}

export function useGetAnswerList(questionId?: string, options?: object) {
  return useQuery({
    queryKey: ['answer-list', questionId],
    queryFn: () => getAnswerList(questionId!),
    ...options,
  });
}
