import axios from '@/lib/axios';  

import { IAnswer, IQuestion, IQuestionPayload, Response } from '@/types';

export async function getQuestionsList(params?: {
  keyword?: string;
  status?: string;
  page?: number;
  page_size?: number;
}): Promise<Response<IQuestion[]>> {
  try {
    const response = await axios.get('/questions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
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

export async function getAnswerList(questionId: number): Promise<Response<IAnswer[]>> {
  try {
    const response = await axios.get(`/questions/answers/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answers:', error);
    throw error;
  }
}
