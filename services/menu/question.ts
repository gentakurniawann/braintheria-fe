import axios from '@/lib/axios';
import {
  IAnswer,
  IQuestion,
  IQuestionPayload,
  QuestionDetailResponse,
  QuestionListResponse,
  Response,
} from '@/types';

export async function getQuestionsList(params?: {
  keyword?: string;
  status?: string;
  page?: number;
  page_size?: number;
}): Promise<QuestionListResponse> {
  try {
    const response = await axios.get<QuestionListResponse>('/questions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function getDetailQuestions(id: string): Promise<IQuestion> {
  try {
    const response = await axios.get<IQuestion>(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question detail (ID: ${id}):`, error);
    throw error;
  }
}

export async function getMyQuestions(): Promise<Response<IQuestion[]>> {
  try {
    const response = await axios.get('/questions/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching my questions:', error);
    throw error;
  }
}

export async function createQuestion(data: IQuestionPayload): Promise<Response<IQuestion>> {
  try {
    const response = await axios.post('/questions', data);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

export async function getAnswerList(questionId: string): Promise<Response<IAnswer[]>> {
  try {
    const response = await axios.get(`/questions/answers/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error;
  }
}
