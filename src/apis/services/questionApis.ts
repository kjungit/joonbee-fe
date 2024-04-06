import { CategoryName, QuestionCategory, SubcategoryName } from '@/types';
import { instance } from '../axios';

export interface Params {
  page: number;
  category: string;
  subCategory: string;
}
export interface QuestionItem {
  questionId: string;
  category: CategoryName;
  subcategory: SubcategoryName;
  questionContent: string;
}
export interface QuestionResponse {
  result: QuestionItem[];
  total: number;
}

export const getQuestion = async ({ page, category, subCategory }: Params) => {
  try {
    const res = await instance().get(`api/question/all`, {
      params: {
        page,
        category,
        subCategory,
      },
    });
    return res.data.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * 랜덤 질문들 가져오기 api
 */
export const getRandomQuestionList = async (params: {
  category: string;
  subcategory: string;
  questionCount: number;
}) => {
  const res = await instance().get('/api/question/gpt', {
    params,
  });

  return res.data.data.result;
};

/**
 * 사용자가 추가한 질문들 가져오기 api
 */
export const getUserQuestions = async ({ page, category, subCategory }: Params) => {
  const res = await instance().get('api/cart/questions', {
    params: {
      page,
      category,
      subcategory: subCategory,
    },
  });
  return res.data.data;
};

/**
 * 사용자 질문 등록 api
 */

export interface SavaQuestionProps {
  subcategoryName: SubcategoryName;
  questionContent: string;
}

export const postSaveQuestion = async ({ subcategoryName, questionContent }: SavaQuestionProps) => {
  try {
    const res = await instance().post('/api/cart/question/save', {
      subcategoryName,
      questionContent,
    });
    return res.data.data.result;
  } catch (error: any) {
    throw error.response.status;
  }
};

export const postUserQuestion = async (questionId: number, subcategoryName: SubcategoryName) => {
  try {
    const res = await instance().post('/api/cart/question/save/main', {
      questionId,
      subcategoryName,
    });

    return res.data.data.result;
  } catch (error: any) {
    throw error;
  }
};
