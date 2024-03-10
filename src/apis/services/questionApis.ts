import { CategoryName, QuestionCategory, SubcategoryName } from '@/types';
import { instance } from '../axios';

export interface GetQuestionProps {
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

export const getQuestion = async ({ page, category, subCategory }: GetQuestionProps) => {
  try {
    const res = await instance().get(`api/question/all`, {
      params: {
        page,
        category,
        subcategory: subCategory,
      },
    });
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

/**
 * 랜덤 질문들 가져오기 api
 */
export const getRandomQuestions = async (
  category: CategoryName,
  subcategory: string,
  questionCount: number,
) => {
  // const subcategories = [...subcategory];

  const res = await instance().get('/api/question/gpt', {
    params: {
      category,
      subcategory,
      questionCount,
    },
  });

  return res.data.data.result;
};

/**
 * 사용자가 추가한 질문들 가져오기 api
 */
export const getUserQuestions = async (url: string) => {
  const res = await instance().get(url);
  // console.log('res', res.data.data.result);
  return res.data.data.result;
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
