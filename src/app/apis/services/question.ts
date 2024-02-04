import { CategoryName, QuestionCategory, SubcategoryName } from '@/types/question';
import { instance } from '../axios';

type QuestionType = {
  page: number;
  category: string;
  subcategory: string;
};

export type QuestionResponse = {
  questionId: string;
  category: CategoryName;
  subcategory: SubcategoryName;
  questionContent: string;
};

export const getQuestionList = async ({
  page = 0,
  category = '',
  subcategory = '',
}: QuestionType) => {
  try {
    const res = await instance().get(`api/question/all`, {
      params: {
        page,
        category,
        subcategory,
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
  subcategory: SubcategoryName,
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

export const postSaveQuestion = async (
  subcategoryName: SubcategoryName,
  questionContent: string,
) => {
  const res = await instance().post('/api/cart/question/save', {
    subcategoryName,
    questionContent,
  });
  return res.data.data.result;
};

export const postUserQuestion = async (questionId: number, subcategoryName: SubcategoryName) => {
  const res = await instance().post('/api/cart/question/save/main', {
    questionId,
    subcategoryName,
  });

  return res.data.data.result;
};
