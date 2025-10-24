import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getQuestionsList,
  getMyQuestions,
  getDetailQuestions,
  getAnswerList,
  createQuestion,
  createAnswer,
  validateQuestions,
  getLeaderboard,
  updateQuestion,
  deleteQuestion,
} from '@/services/menu/question';
import { IQuestionPayload, QuestionListResponse } from '@/types';
import { LeaderboardUser } from '@/types/menu/leaderboard';

export function useGetQuestionsList(params?: {
  search?: string;
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

export function useGetLeaderboard() {
  return useQuery<LeaderboardUser[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
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


export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: (_data, id) => {
      // invalidate the question list
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      // invalidate the specific question that was deleted
      queryClient.invalidateQueries({ queryKey: ['question-detail', id] });
    },
  });
}

export function useUpdateQuestion(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IQuestionPayload) => updateQuestion(data, id),
    onSuccess: () => {
      // Refresh question list & detail after update
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question-detail', id] });
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

// Make questionId type consistent (use string throughout)
export function useCreateAnswer(questionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { questionId: number; bodyMd: string }) => createAnswer(data),
    onSuccess: () => {
      // Invalidate with string type to match your queries
      queryClient.invalidateQueries({
        queryKey: ['answer-list', questionId],
      });
      // Also invalidate question detail to update answer count, etc.
      queryClient.invalidateQueries({
        queryKey: ['question-detail', questionId],
      });
    },
  });
}

export function useValidateQuestions(questionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answerId: string) => validateQuestions(questionId, answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['question-detail', questionId],
      });
      queryClient.invalidateQueries({
        queryKey: ['answer-list', questionId],
      });
    },
  });
}
